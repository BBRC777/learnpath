'use client'
// components/layout/AppShell.tsx  —  Learnpath shell with XP sidebar widget

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  getProfile,
  getLevelInfo,
  xpProgress,
  xpToNextLevel,
  type Profile,
} from '@/lib/db'

// ─────────────────────────────────────────────────────────────
// LEVEL BADGE  (small pill shown next to name / in nav)
// ─────────────────────────────────────────────────────────────

function LevelBadge({ level, title }: { level: number; title: string }) {
  const colors: Record<number, string> = {
    1: 'bg-neutral-800 text-neutral-400 border-neutral-700',
    2: 'bg-amber-950/60 text-amber-400 border-amber-800',
    3: 'bg-purple-950/60 text-purple-400 border-purple-800',
    4: 'bg-yellow-950/60 text-yellow-400 border-yellow-700',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5
        font-mono text-[10px] uppercase tracking-widest ${colors[level]}`}
    >
      {level === 4 ? '★' : `L${level}`} {title}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// XP WIDGET  (sidebar footer section)
// ─────────────────────────────────────────────────────────────

function XPWidget({ profile }: { profile: Profile }) {
  const info       = getLevelInfo(profile.xp)
  const progress   = xpProgress(profile.xp)
  const remaining  = xpToNextLevel(profile.xp)
  const isMaster   = info.level === 4

  return (
    <div
      className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3"
      style={{ fontFamily: 'var(--sans)' }}
    >
      {/* Level title + badge */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] text-neutral-400">Your Level</span>
        <LevelBadge level={info.level} title={info.title} />
      </div>

      {/* XP total */}
      <div className="mb-2 flex items-baseline gap-1">
        <span
          className="font-mono text-2xl font-semibold leading-none"
          style={{ color: '#d4853a' }}
        >
          {profile.xp.toLocaleString()}
        </span>
        <span className="font-mono text-[11px] text-neutral-500">XP</span>
      </div>

      {/* Progress bar */}
      <div className="mb-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-800">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${Math.round(progress * 100)}%`,
            background: isMaster
              ? 'linear-gradient(90deg, #d97706, #fbbf24)'
              : '#d4853a',
          }}
        />
      </div>

      {/* Sublabel */}
      <p className="font-mono text-[10px] text-neutral-500">
        {isMaster
          ? '✦ Maximum level reached'
          : `${remaining} XP to ${NEXT_LEVEL_TITLES[info.level]}`}
      </p>
    </div>
  )
}

const NEXT_LEVEL_TITLES: Record<number, string> = {
  1: 'Scholar',
  2: 'Expert',
  3: 'Master',
}

// ─────────────────────────────────────────────────────────────
// STREAK WIDGET  (already existed — kept unchanged)
// ─────────────────────────────────────────────────────────────

function StreakWidget({ streak }: { streak: number }) {
  return (
    <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3">
      <div className="streak-n font-mono text-2xl font-medium text-amber-400">
        {streak}
      </div>
      <div className="streak-l mt-0.5 text-[11px] text-neutral-400">
        {streak === 1 ? 'day streak 🔥' : 'day streak 🔥'}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// NAV CONFIG
// ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: '/dashboard',   label: 'Dashboard',  icon: '⊞' },
  { href: '/learn',       label: 'My Courses',  icon: '◈' },
  { href: '/activity',    label: 'Activity',    icon: '◉' },
  { href: '/settings',    label: 'Settings',    icon: '◎' },
]

// ─────────────────────────────────────────────────────────────
// APPSHELL
// ─────────────────────────────────────────────────────────────

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const pathname               = usePathname()
  const [profile, setProfile]  = useState<Profile | null>(null)
  const [mobOpen, setMobOpen]  = useState(false)

  /** Refresh profile (called on mount and after any XP award) */
  const refreshProfile = useCallback(async () => {
    const p = await getProfile()
    if (p) setProfile(p)
  }, [])

  useEffect(() => {
    refreshProfile()
  }, [refreshProfile])

  // Expose global refresh so lesson pages can call it after awarding XP:
  //   window.__learnpath_refreshProfile?.()
  useEffect(() => {
    // @ts-ignore
    window.__learnpath_refreshProfile = refreshProfile
    return () => {
      // @ts-ignore
      delete window.__learnpath_refreshProfile
    }
  }, [refreshProfile])

  return (
    <div className="flex min-h-screen" style={{ background: '#0a0b0f', color: '#e8e6df' }}>

      {/* ── MOBILE OVERLAY ── */}
      {mobOpen && (
        <div
          className="fixed inset-0 z-[99] bg-black/60"
          onClick={() => setMobOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed left-0 top-0 z-[100] flex h-screen w-[252px] flex-col
          overflow-y-auto border-r transition-transform duration-300
          ${mobOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ background: '#111318', borderColor: 'rgba(255,255,255,0.07)' }}
      >
        {/* Logo */}
        <div className="border-b px-[18px] pb-[15px] pt-5" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="font-serif text-xl tracking-tight" style={{ color: '#d4853a' }}>
            ◆ Learnpath
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Learn anything
          </div>
        </div>

        {/* Level badge (compact, top of nav) */}
        {profile && (
          <div className="px-4 pt-3">
            <LevelBadge level={getLevelInfo(profile.xp).level} title={getLevelInfo(profile.xp).title} />
          </div>
        )}

        {/* Nav */}
        <nav className="mt-2 flex-1 px-2">
          <p className="px-2 pb-1 pt-3 font-mono text-[9px] uppercase tracking-widest text-neutral-600">
            Navigation
          </p>
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const active = pathname?.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobOpen(false)}
                className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px]
                  transition-all duration-150
                  ${active
                    ? 'bg-amber-950/50 text-amber-400'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'}`}
              >
                <span className="w-4 text-center text-sm">{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Footer: XP + Streak */}
        <div className="mt-auto space-y-2.5 border-t p-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          {profile ? (
            <>
              <XPWidget profile={profile} />
              <StreakWidget streak={profile.streak ?? 0} />
            </>
          ) : (
            // Skeleton while loading
            <div className="animate-pulse space-y-2">
              <div className="h-20 rounded-xl bg-neutral-800" />
              <div className="h-14 rounded-xl bg-neutral-800" />
            </div>
          )}
        </div>
      </aside>

      {/* ── MOBILE MENU BUTTON ── */}
      <button
        className="fixed left-3 top-3 z-[200] flex h-9 w-9 items-center justify-center
          rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300 md:hidden"
        onClick={() => setMobOpen(v => !v)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* ── MAIN CONTENT ── */}
      <main className="ml-0 flex min-h-screen flex-1 flex-col md:ml-[252px]">
        {children}
      </main>
    </div>
  )
}