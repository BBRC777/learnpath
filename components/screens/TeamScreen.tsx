'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getTeam, createTeam, getTeamMembers, inviteMember, removeMember, getAssignments, createAssignment, getMemberProgress, loadCurricula } from '@/lib/db'
import { useRouter } from 'next/navigation'

type Tab = 'overview' | 'members' | 'assign'

export default function TeamScreen() {
  const [team, setTeam] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [curricula, setCurricula] = useState<any[]>([])
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
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await createClient().auth.getUser()
      if (!user) { router.push('/auth'); return }
      setUserId(user.id)
      const [t, currs] = await Promise.all([getTeam(user.id), loadCurricula(user.id)])
      setCurricula(currs)
      if (t) {
        setTeam(t)
        const [m, p, a] = await Promise.all([getTeamMembers(t.id), getMemberProgress(t.id), getAssignments(t.id)])
        setMembers(m)
        setProgress(p)
        setAssignments(a)
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

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
      <div style={{ width:28, height:28, border:'2px solid var(--border2)', borderTopColor:accent, borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
    </div>
  )

  // No team yet - create one
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

  // Team exists - show dashboard
  return (
    <div style={{ overflowY:'auto', height:'100%' }}>
      <div style={{ maxWidth:860, margin:'0 auto', padding:'24px 28px 60px' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
          <div>
            <div style={{ fontFamily:'var(--mono)', fontSize:10, color:accent, textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:4 }}>Business Dashboard</div>
            <div style={{ fontFamily:'var(--serif)', fontSize:22, color:'var(--text)' }}>{team.name}</div>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={() => setTab('overview')} style={tabStyle('overview')}>Overview</button>
            <button onClick={() => setTab('members')} style={tabStyle('members')}>Members {members.length > 0 && '(' + members.length + ')'}</button>
            <button onClick={() => setTab('assign')} style={tabStyle('assign')}>Assign</button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            {/* Stats row */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:24 }}>
              {[
                { label:'Members', value: members.length },
                { label:'Assignments', value: assignments.length },
                { label:'Avg Completion', value: assignments.length ? Math.round(assignments.reduce((acc: number, a: any) => {
                    const curr = a.curricula
                    if (!curr) return acc
                    const weeks = curr.curriculum?.weeks || []
                    const total = weeks.reduce((s: number, w: any) => s + (w.days?.length||0), 0)
                    const done = Object.values(curr.progress||{}).filter(Boolean).length
                    return acc + (total ? (done/total)*100 : 0)
                  }, 0) / assignments.length) + '%' : '—' },
              ].map((s, i) => (
                <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'16px 20px' }}>
                  <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>{s.label}</div>
                  <div style={{ fontFamily:'var(--mono)', fontSize:24, fontWeight:500, color:accent }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Progress table */}
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
              <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 1fr 80px 80px', gap:12 }}>
                {['Member','Path','Progress','Last Active'].map(h => (
                  <div key={h} style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{h}</div>
                ))}
              </div>
              {progress.length === 0 ? (
                <div style={{ padding:'32px 20px', textAlign:'center', fontSize:13, color:'var(--text3)' }}>No assignments yet. Go to Assign to get started.</div>
              ) : progress.map((p: any, i: number) => {
                const weeks = p.curricula?.curriculum?.weeks || []
                const total = weeks.reduce((a: number, w: any) => a + (w.days?.length||0), 0)
                const done = Object.values(p.curricula?.progress||{}).filter(Boolean).length
                const pct = total ? Math.round((done/total)*100) : 0
                return (
                  <div key={i} style={{ padding:'12px 20px', borderBottom:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 1fr 80px 80px', gap:12, alignItems:'center' }}>
                    <div style={{ fontSize:13, color:'var(--text)' }}>{p.profiles?.display_name || 'Member'}</div>
                    <div style={{ fontSize:12, color:'var(--text2)' }}>{p.curricula?.topic || '—'}</div>
                    <div>
                      <div style={{ height:4, background:'var(--bg4)', borderRadius:2, marginBottom:3 }}>
                        <div style={{ height:'100%', borderRadius:2, background:accent, width:pct+'%' }}/>
                      </div>
                      <div style={{ fontSize:9, fontFamily:'var(--mono)', color:'var(--text3)' }}>{pct}%</div>
                    </div>
                    <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)' }}>{p.profiles?.streak ?? 0}d streak</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* MEMBERS TAB */}
        {tab === 'members' && (
          <div>
            {/* Invite */}
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'20px', marginBottom:16 }}>
              <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:12 }}>Invite a member</div>
              <div style={{ display:'flex', gap:8 }}>
                <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder='colleague@company.com' style={{ ...input, flex:1 }} onKeyDown={e => { if(e.key==='Enter') handleInvite() }} />
                <button onClick={handleInvite} disabled={inviting||!inviteEmail.trim()} style={btnPrimary}>{inviting ? 'Inviting...' : 'Invite'}</button>
              </div>
            </div>
            {/* Member list */}
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {members.length === 0 ? (
                <div style={{ padding:'32px', textAlign:'center', fontSize:13, color:'var(--text3)', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12 }}>No members yet. Invite someone above.</div>
              ) : members.map((m: any) => (
                <div key={m.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10 }}>
                  <div>
                    <div style={{ fontSize:13, color:'var(--text)', marginBottom:2 }}>{m.email}</div>
                    <div style={{ fontSize:10, fontFamily:'var(--mono)', color: m.status==='invited' ? '#e8a55a' : '#3fb950' }}>{m.status}</div>
                  </div>
                  <button onClick={async () => { await removeMember(m.id); setMembers(prev => prev.filter(x => x.id !== m.id)) }} style={{ ...btnSecondary, fontSize:11, padding:'5px 10px' }}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ASSIGN TAB */}
        {tab === 'assign' && (
          <div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'20px', marginBottom:16 }}>
              <div style={{ fontSize:13, fontWeight:500, color:'var(--text)', marginBottom:16 }}>Assign a learning path</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div>
                  <label style={{ display:'block', fontSize:10, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:5 }}>Learning Path</label>
                  <select value={assignCurrId} onChange={e => setAssignCurrId(e.target.value)} style={{ ...input }}>
                    <option value=''>Select a path...</option>
                    {curricula.map((c: any) => <option key={c.id} value={c.id}>{c.curriculum?.title || c.topic}</option>)}
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
            </div>
            {/* Assignments list */}
            {assignments.length > 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>Active Assignments</div>
                {assignments.map((a: any) => (
                  <div key={a.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10 }}>
                    <div>
                      <div style={{ fontSize:12, color:'var(--text)', marginBottom:2 }}>{curricula.find((c:any) => c.id === a.curriculum_id)?.curriculum?.title || a.curriculum_id}</div>
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
  )
}
