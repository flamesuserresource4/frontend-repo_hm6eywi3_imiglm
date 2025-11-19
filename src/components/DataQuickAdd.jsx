import { useState } from 'react'

const Field = ({ label, value, onChange, placeholder }) => (
  <div>
    <p className="text-xs text-slate-300/80">{label}</p>
    <input className="mt-1 w-full bg-slate-900/60 border border-white/10 rounded p-2 text-sm text-white outline-none" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} />
  </div>
)

export default function DataQuickAdd() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const [machine, setMachine] = useState({ name: '', code: '', status: 'idle' })
  const [order, setOrder] = useState({ order_no: '', product: '', quantity: 100 })
  const [ticket, setTicket] = useState({ title: '', machine_code: '', severity: 'low' })

  const submit = async (path, data) => {
    await fetch(`${baseUrl}/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  }

  return (
    <section className="container mx-auto px-6 mt-10 grid md:grid-cols-3 gap-6">
      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">Add Machine</h3>
        <div className="mt-3 space-y-3">
          <Field label="Name" value={machine.name} onChange={v=>setMachine(m=>({ ...m, name: v }))} placeholder="Laser Cutter" />
          <Field label="Code" value={machine.code} onChange={v=>setMachine(m=>({ ...m, code: v }))} placeholder="LC-01" />
          <Field label="Status" value={machine.status} onChange={v=>setMachine(m=>({ ...m, status: v }))} placeholder="running/idle/down" />
          <button onClick={() => submit('machines', machine)} className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">Add Order</h3>
        <div className="mt-3 space-y-3">
          <Field label="Order No" value={order.order_no} onChange={v=>setOrder(o=>({ ...o, order_no: v }))} placeholder="#1001" />
          <Field label="Product" value={order.product} onChange={v=>setOrder(o=>({ ...o, product: v }))} placeholder="Widget A" />
          <Field label="Quantity" value={order.quantity} onChange={v=>setOrder(o=>({ ...o, quantity: Number(v)||0 }))} placeholder="100" />
          <button onClick={() => submit('orders', order)} className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">Add Ticket</h3>
        <div className="mt-3 space-y-3">
          <Field label="Title" value={ticket.title} onChange={v=>setTicket(t=>({ ...t, title: v }))} placeholder="Belt alignment" />
          <Field label="Machine Code" value={ticket.machine_code} onChange={v=>setTicket(t=>({ ...t, machine_code: v }))} placeholder="LC-01" />
          <Field label="Severity" value={ticket.severity} onChange={v=>setTicket(t=>({ ...t, severity: v }))} placeholder="low/medium/high/critical" />
          <button onClick={() => submit('maintenance', ticket)} className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </section>
  )
}
