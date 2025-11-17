"use client"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { MachineGrid } from "@/components/machine-grid"
import { FeaturedMachines } from "@/components/featured-machines"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <main className="flex flex-col items-center">

      {/* STREAM AO VIVO COM BORDA NEON */}
      <section className="w-full bg-black py-6 flex justify-center">
        <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden neon-border">

          <div className="absolute top-4 left-4 bg-red-600/90 px-3 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-1 animate-pulse z-20 shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            AO VIVO
          </div>

          <img
            src="https://eleni-interventricular-chere.ngrok-free.dev/stream.mjpg"
            alt="Live Grua"
            className="w-full h-[260px] sm:h-[360px] md:h-[430px] object-cover"
          />
        </div>
      </section>

      <HeroSection />
      <FeaturedMachines />
      <MachineGrid />
      <HowItWorks />
      <Testimonials />

      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl text-white">
                Pronto para começar a jogar?
              </h2>
              <p className="max-w-[900px] text-zinc-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Crie sua conta agora e ganhe créditos bônus para suas primeiras jogadas!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold"
              >
                Criar Conta
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .neon-border {
          box-shadow: 0 0 25px #a100ff, 0 0 45px #ff00ff;
          border: 3px solid rgba(255, 0, 255, 0.4);
          animation: neonPulse 2.5s infinite alternate;
        }
        @keyframes neonPulse {
          0% { box-shadow: 0 0 20px #a100ff, 0 0 35px #ff00ff; }
          100% { box-shadow: 0 0 35px #d200ff, 0 0 60px #ff66ff; }
        }
      `}</style>

    </main>
  )
}
