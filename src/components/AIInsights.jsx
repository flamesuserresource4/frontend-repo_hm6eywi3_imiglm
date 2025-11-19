import { useState } from 'react'

export default function AIInsights() {
  const [prompt, setPrompt] = useState('Summarize risks and opportunities from current machine utilization and open orders. Provide 3 bullet recommendations.')
  const [insight, setInsight] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const runInsight = async () => {
    setLoading(true)
    setError('')
    setInsight('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/ai/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }
      const data = await res.json()
      setInsight(data.insight)
    } catch (e) {
      setError('Could not fetch AI insight. Ensure GROQ_API_KEY is set in the backend environment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">
      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">Ask AI</h3>
        <textarea
          className="mt-3 w-full h-32 bg-slate-900/60 border border-white/10 rounded p-3 text-sm text-white outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={runInsight}
          disabled={loading}
          className="mt-3 inline-flex items-center px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60"
        >
          {loading ? 'Thinking…' : 'Generate insight'}
        </button>
        {error && <p className="mt-2 text-rose-300 text-sm">{error}</p>}
      </div>
      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-semibold">AI Insight</h3>
        <div className="mt-3 text-slate-200 whitespace-pre-wrap text-sm min-h-[8rem]">
          {insight || 'Insight will appear here.'}
        </div>
      </div>
    </section>
  )
}
