import { useEffect, useState } from 'react'

export default function AutomationPanel() {
  const [form, setForm] = useState({ name: 'Daily OEE Check', details: 'Scan machines and raise alert if OEE < 60%' })
  const [logs, setLogs] = useState([])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadLogs = async () => {
    try {
      const res = await fetch(`${baseUrl}/automation/logs`)
      const data = await res.json()
      setLogs(data)
    } catch (e) {
      setLogs([])
    }
  }

  useEffect(() => { loadLogs() }, [])

  const runAutomation = async () => {
    const payload = { name: form.name, status: 'success', details: form.details }
    await fetch(`${baseUrl}/automation/log`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
    await fetch(`${baseUrl}/alerts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Automation executed', level: 'info' })
    })
    await loadLogs()
  }

  return (
    <section className="container mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">
      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">Automations</h3>
        <input
          className="mt-3 w-full bg-slate-900/60 border border-white/10 rounded p-2 text-sm text-white outline-none"
          value={form.name}
          onChange={e => setForm(v => ({ ...v, name: e.target.value }))}
        />
        <textarea
          className="mt-2 w-full h-24 bg-slate-900/60 border border-white/10 rounded p-2 text-sm text-white outline-none"
          value={form.details}
          onChange={e => setForm(v => ({ ...v, details: e.target.value }))}
        />
        <button onClick={runAutomation} className="mt-3 px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white">Run now</button>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5 overflow-auto">
        <h3 className="text-white font-semibold">Recent Runs</h3>
        <div className="mt-3 space-y-2 max-h-56">
          {logs.length === 0 && <p className="text-slate-300/70 text-sm">No runs yet.</p>}
          {logs.map(l => (
            <div key={l._id} className="bg-slate-900/60 border border-white/10 rounded p-3 text-slate-200">
              <p className="text-sm font-medium">{l.name}</p>
              <p className="text-xs text-slate-400">{l.status}</p>
              {l.details && <p className="text-xs mt-1 text-slate-300/80">{l.details}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
