import { GoogleGenAI } from "@google/genai"
import { createClient } from "@supabase/supabase-js"
import { createClient as createUserClient } from "@/lib/supabase/server"
import crypto from "crypto"

export const maxDuration = 30

// ─────────────────────────────────────────────────────────────────────────────
// Lesson image generation — generate-once, serve-free.
//
// The [IMG:query] tags the lesson generator already emits are great prompts but
// today they hit Pexels/Unsplash and return generic stock that doesn't match the
// concept. This route instead asks an image model for an *instructional* image of
// exactly that concept, stores the bytes in a public Supabase Storage bucket keyed
// by a hash of the query, and returns a stable CDN URL.
//
// Cost control (mirrors the lesson cache philosophy in the cost model):
//   • The bucket IS the cache. A given [IMG:...] query is generated once, ever,
//     across ALL users — second hit is a 0-cost storage read. Popular topics that
//     are pre-warmed cost nothing at lesson-view time.
//   • We use Gemini's fast image model; flip IMAGE_MODEL to the Pro tier only if
//     you want diagram-grade text rendering and accept ~2x cost.
//   • Falls back to null on any error so the client can degrade to stock images.
// ─────────────────────────────────────────────────────────────────────────────

const IMAGE_MODEL = "gemini-2.5-flash-image" // fast, ~cheap; swap to a Pro image model for diagram-grade text
const BUCKET = "lesson-images"

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

function keyFor(query: string): string {
  const h = crypto.createHash("sha256").update(query.trim().toLowerCase()).digest("hex").slice(0, 32)
  return `${h}.png`
}

function publicUrl(path: string): string {
  return admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

// Wrap the raw [IMG:...] query into an instruction that yields a clean, textbook-style
// illustration rather than a stock photo or a busy AI render.
function imagePrompt(query: string): string {
  return [
    `A clean, modern educational illustration for a study lesson: ${query}.`,
    `Style: clear textbook diagram / explanatory illustration, labeled where helpful,`,
    `high contrast, minimal background, no watermark, no stock-photo people,`,
    `accurate to the subject matter. Landscape 16:9.`,
  ].join(" ")
}

export async function POST(request: Request) {
  try {
    // Require an authenticated user (same bar as /api/claude) so this can't be
    // hammered anonymously as a free image API.
    const userSupabase = createUserClient()
    const { data: { user } } = await userSupabase.auth.getUser()
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { query } = await request.json()
    if (!query || typeof query !== "string") {
      return Response.json({ error: "query required" }, { status: 400 })
    }

    const path = keyFor(query)

    // 1) Cache hit? Return the existing object's URL. (0-cost path.)
    const { data: existing } = await admin.storage.from(BUCKET).list("", { search: path })
    if (existing?.some(o => o.name === path)) {
      return Response.json({ url: publicUrl(path), cached: true })
    }

    // 2) Miss → generate.
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ url: null, error: "image gen not configured" })
    }
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const result = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: imagePrompt(query),
    })

    // Pull the first inline image part out of the response.
    const parts = result.candidates?.[0]?.content?.parts || []
    const imgPart = parts.find((p: any) => p.inlineData?.data)
    const b64 = (imgPart as any)?.inlineData?.data as string | undefined
    if (!b64) return Response.json({ url: null, error: "no image returned" })

    const bytes = Buffer.from(b64, "base64")

    // 3) Store in the public bucket (the cache for every future viewer).
    const { error: upErr } = await admin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: "image/png", upsert: true, cacheControl: "31536000" })
    if (upErr) {
      console.error("lesson-image upload failed:", upErr.message)
      return Response.json({ url: null, error: "store failed" })
    }

    return Response.json({ url: publicUrl(path), cached: false })
  } catch (e: any) {
    console.error("lesson-image error:", e?.message || e)
    return Response.json({ url: null, error: String(e?.message || e) })
  }
}