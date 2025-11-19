import Hero from './components/Hero'
import KPIs from './components/KPIs'
import AIInsights from './components/AIInsights'
import AdvancedAI from './components/AdvancedAI'
import AutomationPanel from './components/AutomationPanel'
import DataQuickAdd from './components/DataQuickAdd'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Hero />
      <KPIs />
      <AIInsights />
      <AdvancedAI />
      <AutomationPanel />
      <DataQuickAdd />
      <footer className="container mx-auto px-6 py-10 text-xs text-slate-400">
        <p>Tip: Set VITE_BACKEND_URL in frontend env and GROQ_API_KEY in backend env for AI features.</p>
      </footer>
    </div>
  )
}

export default App
