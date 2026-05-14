// types/database.ts
// Matches the actual Learnpath profiles schema in Supabase

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string                    // uuid, PK — matches auth.users.id
          email: string | null
          display_name: string | null
          avatar_url: string | null
          is_pro: boolean | null
          rc_customer_id: string | null // RevenueCat customer ID
          streak: number | null
          last_study: string | null     // date
          total_days: number | null
          cards_reviewed: number | null
          theme: string | null
          voice_settings: Json | null   // { daily_goal_minutes, goals[] }
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          display_name?: string | null
          avatar_url?: string | null
          is_pro?: boolean | null
          rc_customer_id?: string | null
          streak?: number | null
          last_study?: string | null
          total_days?: number | null
          cards_reviewed?: number | null
          theme?: string | null
          voice_settings?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      // Add curricula, activity tables here as you build them out
    }
  }
}

// Convenience type
export type Profile = Database['public']['Tables']['profiles']['Row']

// voice_settings shape stored in the jsonb column
export interface VoiceSettings {
  daily_goal_minutes: number
  goals: string[]
  speed?: number
  voice?: string
}
