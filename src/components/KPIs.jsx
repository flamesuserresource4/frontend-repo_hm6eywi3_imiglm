import { useEffect, useState } from 'react'

const Card = ({ title, value, hint, trend }) => (
  <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4 backdrop-blur">
    <p className="text-xs uppercase tracking-wider text-slate-300/70">{title}</p>
    <div className="mt-2 flex items-end gap-2">
      <p className="text-2xl md:text-3xl font-semibold text-white">{value}</p>
      {trend && <span className={`text-xs ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{trend > 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`}</span>}
    </div>
    {hint && <p className="mt-1 text-xs text-slate-300/70">{hint}</p>}
  </div>
)

export default function KPIs() {
  const [counts, setCounts] = useState({ machines: 0, orders: 0, tickets: 0, alerts: 0 })

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    Promise.all([
      fetch(`${baseUrl}/machines`).then(r => r.json()).catch(() => []),
      fetch(`${baseUrl}/orders`).then(r => r.json()).catch(() => []),
      fetch(`${baseUrl}/maintenance`).then(r => r.json()).catch(() => []),
      fetch(`${baseUrl}/alerts`).then(r => r.json()).catch(() => []),
    ]).then(([m, o, t, a]) => {
      setCounts({ machines: m.length || 0, orders: o.length || 0, tickets: t.length || 0, alerts: a.length || 0 })
    })
  }, [])

  return (
    <section className="container mx-auto px-6 -mt-10 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Machines" value={counts.machines} hint="Tracked on the floor" trend={3} />
        <Card title="Orders" value={counts.orders} hint="Open and in progress" trend={-1} />
        <Card title="Maintenance" value={counts.tickets} hint="Open tickets" trend={5} />
        <Card title="Alerts" value={counts.alerts} hint="Active issues" trend={0} />
      </div>
    </section>
  )
}
