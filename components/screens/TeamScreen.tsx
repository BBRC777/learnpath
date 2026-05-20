'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getTeam, createTeam, getTeamMembers, inviteMember, removeMember, getAssignments, createAssignment, getMemberProgress, loadCurricula, loadTeamCurricula, importToTeam, deleteTeamCurriculum, getAssessmentResults } from '@/lib/db'
import { useRouter } from 'next/navigation'
import TeamCurriculumBuilder from './TeamCurriculumBuilder'

type Tab = 'overview' | 'members' | 'library' | 'assign'

export default function TeamScreen() {
  const [team, setTeam] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [personalCurricula, setPersonalCurricula] = useState<any[]>([])
  const [teamCurricula, setTeamCurricula] = useState<any[]>([])
  const [userId, setUserId] = useState<string|null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('overview')
  const [teamName, setTeamName] = useState('')
  const [creating, setCreating] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [assignCurrId, setAssignCurrId] = useState('')
  const [assignMemberId, setAssignMemberId] = useState('')
  const [assignDue, setAssignDue] = useState('')
  const [assigning, setAssigning] = useState(false)
  const [assignments, setAssignments] = useState<any[]>([])
  const [assessmentResults, setAssessmentResults] = useState<any[]>([])
  const [importing, setImporting] = useState<string|null>(null)
  const [deleting, setDeleting] = useState<string|null>(null)
  const [previewId, setPreviewId] = useState<string|null>(null)
  const [showImport, setShowImport] = useState(false)
  const [showBuilder, setShowBuilder] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await createClient().auth.getUser()
      if (!user) { router.push('/auth'); return }
      setUserId(user.id)
      const [t, personal] = await Promise.all([getTeam(user.id), loadCurricula(user.id)])
      setPersonalCurricula(personal.filter((c: any) => !c.team_id))
      if (t) {
        setTeam(t)
        const [m, p, a, tc] = await Promise.all([getTeamMembers(t.id), getMemberProgress(t.id), getAssignments(t.id), loadTeamCurricula(t.id)])
        setMembers(m)
        setProgress(p)
        setAssignments(a)
        setTeamCurricula(tc)
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleCreateTeam = async () => {
    if (!teamName.trim() || !userId) return
    setCreating(true)
    try {
      const t = await createTeam(userId, teamName.trim())
      setTeam(t)
    } catch(e) { console.error(e) }
    finally { setCreating(false) }
  }

  const handleInvite = async () => {
    if (!inviteEmail.trim() || !team || !userId) return
    setInviting(true)
    try {
      const m = await inviteMember(team.id, inviteEmail.trim(), userId)
      setMembers(prev => [...prev, m])
      setInviteEmail('')
    } catch(e) { console.error(e) }
    finally { setInviting(false) }
  }

  const handleAssign = async () => {
    if (!assignCurrId || !assignMemberId || !team || !userId) return
    setAssigning(true)
    try {
      const a = await createAssignment(team.id, assignCurrId, assignMemberId, userId, assignDue || undefined)
      setAssignments(prev => [a, ...prev])
      setAssignCurrId('')
      setAssignMemberId('')
      setAssignDue('')
    } catch(e) { console.error(e) }
    finally { setAssigning(false) }
  }

  const handleImport = async (currId: string) => {
    if (!team) return
    setImporting(currId)
    try {
      const tc = await importToTeam(currId, team.id)
      setTeamCurricula(prev => [tc, ...prev])
      setShowImport(false)
    } catch(e) { console.error(e) }
    finally { setImporting(null) }
  }

  const handleDeleteTeamCurr = async (currId: string) => {
    if (!confirm('Remove this path from the team library?')) return
    setDeleting(currId)
    try {
      await deleteTeamCurriculum(currId)
      setTeamCurricula(prev => prev.filter(c => c.id !== currId))
    } catch(e) { console.error(e) }
    finally { setDeleting(null) }
  }

  const accent = '#4a7fd4'
  const accentBg = 'rgba(74,127,212,0.12)'
  const accentBorder = 'rgba(74,127,212,0.3)'

  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding:'7px 16px', borderRadius:7, border:'none', fontFamily:'var(--sans)', fontSize:12, fontWeight:500,
    cursor:'pointer', background: tab===t ? accent : 'var(--bg3)', color: tab===t ? '#fff' : 'var(--text2)'
  })

  const input: React.CSSProperties = { width:'100%', padding:'9px 12px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:8, color:'var(--text)', fontFamily:'var(--sans)', fontSize:13, outline:'none', boxSizing:'border-box' as const }
  const btnPrimary: React.CSSProperties = { padding:'9px 18px', borderRadius:7, border:'none', background:accent, color:'#fff', fontFamily:'var(--sans)', fontSize:13, fontWeight:500, cursor:'pointer' }
  const btnSecondary: React.CSSProperties = { padding:'9px 18px', borderRadius:7, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:13, cursor:'pointer' }
  const btnSmall: React.CSSProperties = { padding:'5px 10px', borderRadius:6, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', fontFamily:'var(--sans)', fontSize:11, cursor:'pointer' }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <div style={{ width:28, height:28, border:'2px solid var(--border2)', borderTopColor:accent, borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    </div>
  )

  if (!team) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <div style={{ maxWidth:440, width:'100%', padding:'0 24px' }}>
        <div style={{ fontFamily:'var(--mono)', fontSize:10, color:accent, textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:8 }}>Business Plan</div>
        <div style={{ fontFamily:'var(--serif)', fontSize:28, color:'var(--text)', marginBottom:8 }}>Create your team</div>
        <div style={{ fontSize:13, color:'var(--text2)', marginBottom:28, lineHeight:1.6 }}>Set up your team workspace to assign learning paths, track progress, and manage your members.</div>
        <div style={{ marginBottom:12 }}>
          <label style={{ display:'block', fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Team Name</label>
          <input value={teamName} onChange={e => setTeamName(e.target.value)} placeholder='e.g. Acme Corp Learning' style={input} />
        </div>
        <button onClick={handleCreateTeam} disabled={creating||!teamName.trim()} style={{ ...btnPrimary, width:'100%' }}>{creating ? 'Creating...' : 'Create Team'}</button>
      </div>
    </div>
  )

  return (
    <>
      {showBuilder && userId && team && (
        <TeamCurriculumBuilder
          userId={userId}
          teamId={team.id}
          onClose={() => setShowBuilder(false)}
          onSaved={(curr) => { setTeamCurricula(prev => [curr, ...prev]); setShowBuilder(false) }}
        />
      )}
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'24px 28px 60px' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap' as const, gap:12 }}>
          <div>
            <div style={{ fontFamily:'var(--mono)', fontSize:10, color:accent, textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:4 }}>Business Dashboard</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)' }}>{team.name}</div>
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' as const }}>
            <button onClick={() => setTab('overview')} style={tabStyle('overview')}>Overview</button>
            <button onClick={() => setTab('members')} style={tabStyle('members')}>Members {members.length > 0 && '(' + members.length + ')'}</button>
            <button onClick={() => setTab('library')} style={tabStyle('library')}>Library {teamCurricula.length > 0 && '(' + teamCurricula.length + ')'}</button>
            <button onClick={() => setTab('assign')} style={tabStyle('assign')}>Assign</button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
              {[
                { label:'Members', value: members.length },
                { label:'Team Paths', value: teamCurricula.length },
                { label:'Assignments', value: assignments.length },
                { label:'Assessments taken', value: assessmentResults.length },
              ].map((s, i) => (
                <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'16px 20px' }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>{s.label}</div>
                  <div style={{ fontFamily:'var(--mono)', fontSize:24, fontWeight:500, color:accent }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
              <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 1fr 100px 100px', gap:12 }}>
                {['Member','Path','Progress','Streak'].map(h => (
                  <div key={h} style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{h}</div>
                ))}
              </div>
              {progress.length === 0 ? (
                <div style={{ padding:'32px 20px', textAlign:'center' as const, fontSize:13, color:'var(--text3)' }}>No assignments yet. Add paths to your Library then Assign them to members.</div>
              ) : progress.map((p: any, i: number) => {
                const weeks = p.curricula?.curriculum?.weeks || []
                const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
                const done = Object.values(p.curricula?.progress||{}).filter(Boolean).length
                const pct = total ? Math.round((done/total)*100) : 0
                return (
                  <div key={i} style={{ padding:'12px 20px', borderBottom:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 1fr 100px 100px', gap:12, alignItems:'center' }}>
                    <div style={{ fontSize:13, color:'var(--text)' }}>{p.profiles?.display_name || 'Member'}</div>
                    <div style={{ fontSize:12, color:'var(--text2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{p.curricula?.topic || '—'}</div>
                    <div>
                      <div style={{ height:4, background:'var(--bg4)', borderRadius:2, marginBottom:3 }}>
                        <div style={{ height:'100%', borderRadius:2, background:accent, width:pct+'%' }}/>
                      </div>
                      <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)' }}>{pct}%</div>
                    </div>
                    <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)' }}>{p.profiles?.streak ?? 0}d</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* MEMBERS TAB */}
        {tab === 'members' && (
          <div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'20px', marginBottom:16 }}>
              <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:12 }}>Invite a member</div>
              <div style={{ display:'flex', gap:8 }}>
                <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder='colleague@company.com' style={{ ...input, flex:1 }} onKeyDown={e => { if(e.key==='Enter') handleInvite() }} />
                <button onClick={handleInvite} disabled={inviting||!inviteEmail.trim()} style={btnPrimary}>{inviting ? 'Inviting...' : 'Invite'}</button>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
              {members.length === 0 ? (
                <div style={{ padding:'32px', textAlign:'center' as const, fontSize:13, color:'var(--text3)', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12 }}>No members yet. Invite someone above.</div>
              ) : members.map((m: any) => (
                <div key={m.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10 }}>
                  <div>
                    <div style={{ fontSize:13, color:'var(--text)', marginBottom:2 }}>{m.email}</div>
                    <div style={{ fontSize:10, fontFamily:'var(--mono)', color: m.status==='invited' ? '#e8a55a' : '#3fb950' }}>{m.status}</div>
                  </div>
                  <button onClick={async () => { await removeMember(m.id); setMembers(prev => prev.filter((x:any) => x.id !== m.id)) }} style={btnSmall}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIBRARY TAB */}
        {tab === 'library' && (
          <div>
            {/* Actions */}
            <div style={{ display:'flex', gap:8, marginBottom:16 }}>
              <button onClick={() => setShowBuilder(true)} style={btnPrimary}>+ Build Team Path</button>
              <button onClick={() => setShowImport(o => !o)} style={{ ...btnSecondary, background: showImport ? accentBg : 'var(--bg3)', color: showImport ? accent : 'var(--text2)', border: showImport ? '1px solid '+accentBorder : '1px solid var(--border2)' }}>
                {showImport ? 'Hide Import' : 'Import from My Paths'}
              </button>
            </div>

            {/* Import panel */}
            {showImport && (
              <div style={{ background:'var(--bg2)', border:'1px solid '+accentBorder, borderRadius:12, padding:'16px', marginBottom:16 }}>
                <div style={{ fontSize:11, fontFamily:'var(--mono)', color:accent, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Your Personal Paths</div>
                {personalCurricula.length === 0 ? (
                  <div style={{ fontSize:13, color:'var(--text3)' }}>No personal paths to import.</div>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
                    {personalCurricula.map((c: any) => (
                      <div key={c.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'var(--bg3)', borderRadius:8, border:'1px solid var(--border)' }}>
                        <div>
                          <div style={{ fontSize:13, color:'var(--text)', marginBottom:1 }}>{c.curriculum?.title || c.topic}</div>
                          <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{c.topic} · {c.level} · {c.dur_label}</div>
                        </div>
                        <button onClick={() => handleImport(c.id)} disabled={importing === c.id} style={{ ...btnSmall, background:accentBg, color:accent, border:'1px solid '+accentBorder }}>
                          {importing === c.id ? 'Importing...' : 'Add to Team'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Team library */}
            {teamCurricula.length === 0 ? (
              <div style={{ padding:'40px', textAlign:'center' as const, fontSize:13, color:'var(--text3)', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12 }}>
                <div style={{ fontSize:32, marginBottom:12 }}>📚</div>
                <div style={{ marginBottom:6, color:'var(--text2)' }}>No paths in your team library yet.</div>
                <div>Build a new team path or import from your personal paths above.</div>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
                <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>Team Library</div>
                {teamCurricula.map((c: any) => {
                  const weeks = c.curriculum?.weeks || []
                  const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
                  return (
                    <div key={c.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, gap:12 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:2 }}>{c.curriculum?.title || c.topic}</div>
                        <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{c.topic} · {c.level} · {c.dur_label} · {total} sessions</div>
                      </div>
                      <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                        <button onClick={() => { setAssignCurrId(c.id); setTab('assign') }} style={{ ...btnSmall, background:accentBg, color:accent, border:'1px solid '+accentBorder }}>Assign</button>
                        <button onClick={() => handleDeleteTeamCurr(c.id)} disabled={deleting===c.id} style={btnSmall}>{deleting===c.id ? '...' : 'Remove'}</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ASSIGN TAB */}
        {tab === 'assign' && (
          <div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'20px', marginBottom:16 }}>
              <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:16 }}>Assign a learning path to a member</div>
              {teamCurricula.length === 0 ? (
                <div style={{ fontSize:13, color:'var(--text3)', padding:'16px', background:'var(--bg3)', borderRadius:8, textAlign:'center' as const }}>
                  Add paths to your <button onClick={() => setTab('library')} style={{ background:'none', border:'none', color:accent, cursor:'pointer', fontFamily:'var(--sans)', fontSize:13 }}>Team Library</button> first before assigning.
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column' as const, gap:10 }}>
                  <div>
                    <label style={{ display:'block', fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:5 }}>Team Path</label>
                    <select value={assignCurrId} onChange={e => setAssignCurrId(e.target.value)} style={{ ...input }}>
                      <option value=''>Select a team path...</option>
                      {teamCurricula.map((c: any) => <option key={c.id} value={c.id}>{c.curriculum?.title || c.topic}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:5 }}>Assign To</label>
                    <select value={assignMemberId} onChange={e => setAssignMemberId(e.target.value)} style={{ ...input }}>
                      <option value=''>Select a member...</option>
                      {members.filter((m: any) => m.user_id).map((m: any) => <option key={m.id} value={m.user_id}>{m.email}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:5 }}>Due Date (optional)</label>
                    <input type='date' value={assignDue} onChange={e => setAssignDue(e.target.value)} style={input} />
                  </div>
                  <button onClick={handleAssign} disabled={assigning||!assignCurrId||!assignMemberId} style={{ ...btnPrimary, alignSelf:'flex-start' as const }}>{assigning ? 'Assigning...' : 'Assign Path'}</button>
                </div>
              )}
            </div>
            {assignments.length > 0 && (
              <div style={{ display:'flex', flexDirection:'column' as const, gap:8 }}>
                <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>Active Assignments</div>
                {assignments.map((a: any) => (
                  <div key={a.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10 }}>
                    <div>
                      <div style={{ fontSize:12, color:'var(--text)', marginBottom:2 }}>{teamCurricula.find((c:any) => c.id === a.curriculum_id)?.curriculum?.title || a.curriculum_id}</div>
                      <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)' }}>{members.find((m:any) => m.user_id === a.assigned_to)?.email || a.assigned_to}{a.due_date ? ' · Due ' + new Date(a.due_date).toLocaleDateString() : ''}</div>
                    </div>
                    <div style={{ fontSize:10, fontFamily:'var(--mono)', color:accent, padding:'3px 8px', borderRadius:4, background:accentBg, border:'1px solid '+accentBorder }}>Assigned</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
