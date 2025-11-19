import { useState } from 'react'

export default function AdvancedAI() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [rca, setRca] = useState('')
  const [rcaLoading, setRcaLoading] = useState(false)
  const [simHours, setSimHours] = useState(8)
  const [simResult, setSimResult] = useState(null)
  const [pred, setPred] = useState([])

  const runRCA = async () => {
    setRca(''); setRcaLoading(true)
    try {
      const res = await fetch(`${baseUrl}/ai/root_cause`, { method: 'POST' })
      const data = await res.json()
      setRca(data.root_cause || 'No analysis yet.')
    } catch (e) {
      setRca('AI root-cause requires GROQ_API_KEY on backend.')
    } finally { setRcaLoading(false) }
  }

  const runSim = async () => {
    setSimResult(null)
    try {
      const res = await fetch(`${baseUrl}/simulate/shift`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hours: Number(simHours) || 8 }) })
      const data = await res.json()
      setSimResult(data)
    } catch (e) { setSimResult({ error: 'Simulation failed (backend not reachable?)' }) }
  }

  const loadPred = async () => {
    try {
      const res = await fetch(`${baseUrl}/predict/maintenance`)
      const data = await res.json()
      setPred(Array.isArray(data) ? data : [])
    } catch (e) { setPred([]) }
  }

  return (
    <section className="container mx-auto px-6 mt-10 grid lg:grid-cols-3 gap-6">
      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">AI Root Cause</h3>
        <p className="text-xs text-slate-300/80 mt-1">Analyzes alerts, tickets and machine stats</p>
        <button onClick={runRCA} className="mt-3 px-3 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded">Run Analysis</button>
        <div className="mt-3 text-sm text-slate-200 whitespace-pre-wrap min-h-[6rem]">
          {rcaLoading ? 'Thinking…' : (rca || 'No output yet.')}
        </div>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">Shift Simulator</h3>
        <p className="text-xs text-slate-300/80 mt-1">Projects completions over a time horizon</p>
        <div className="mt-3 flex items-center gap-2">
          <input type="number" className="w-24 bg-slate-900/60 border border-white/10 rounded p-2 text-sm text-white outline-none" value={simHours} onChange={e=>setSimHours(e.target.value)} />
          <span className="text-slate-400 text-sm">hours</span>
          <button onClick={runSim} className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded">Simulate</button>
        </div>
        <div className="mt-3 text-sm text-slate-200 whitespace-pre-wrap min-h-[6rem]">
          {simResult ? JSON.stringify(simResult, null, 2) : 'No simulation run yet.'}
        </div>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">Predictive Maintenance</h3>
        <p className="text-xs text-slate-300/80 mt-1">Risk score per machine with suggested date</p>
        <button onClick={loadPred} className="mt-3 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Load Predictions</button>
        <div className="mt-3 space-y-2 max-h-56 overflow-auto">
          {pred.length === 0 && <p className="text-slate-300/70 text-sm">No predictions yet.</p>}
          {pred.map((r, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-white/10 rounded p-3 text-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{r.machine_code}</p>
                <span className={`text-xs ${r.risk_score >= 60 ? 'text-rose-400' : 'text-emerald-400'}`}>{r.risk_score}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{r.reason}</p>
              {r.recommended_date && <p className="text-xs text-slate-400">Suggested: {new Date(r.recommended_date).toLocaleString()}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
