import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/70 pointer-events-none" />
      <div className="relative z-10 h-full container mx-auto px-6 flex items-end pb-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md">
            AI Manufacturing Command Center
          </h1>
          <p className="mt-3 text-blue-100/90 max-w-2xl text-sm md:text-base">
            A colorful, real-time dashboard to track machines, orders, maintenance and growth — with AI insights and automations powered by Groq.
          </p>
        </div>
      </div>
    </section>
  )
}
