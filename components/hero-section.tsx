"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [freeMachines, setFreeMachines] = useState(16)
  const [busyMachines, setBusyMachines] = useState(52)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Função para buscar dados atualizados das máquinas
    const fetchMachineStatus = async () => {
      try {
        // Aqui você faria uma chamada API real para obter os dados
        // const response = await fetch('/api/machine-status')
        // const data = await response.json()
        // setFreeMachines(data.freeMachines)
        // setBusyMachines(data.busyMachines)

        // Simulação de atualização para demonstração
        const interval = setInterval(() => {
          setFreeMachines((prev) => Math.max(10, Math.min(20, prev + Math.floor(Math.random() * 3) - 1)))
          setBusyMachines((prev) => Math.max(40, Math.min(60, prev + Math.floor(Math.random() * 3) - 1)))
        }, 5000)

        return () => clearInterval(interval)
      } catch (error) {
        console.error("Erro ao buscar status das máquinas:", error)
      }
    }

    fetchMachineStatus()
  }, [])

  if (!mounted) return null

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-heading tracking-tighter sm:text-5xl xl:text-6xl/none glow-text bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Capture Pelúcias Online, Receba em Casa
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Descubra nossa exclusiva coleção de pelúcias e brinquedos. Jogue online, ganhe prêmios reais e receba
                diretamente em casa. Cadastre-se agora e ganhe créditos bônus!
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="game-button">
                <Link href="/machines">Jogar Agora</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
              >
                <Link href="/how-it-works">Como Funciona</Link>
              </Button>
            </motion.div>
            <motion.div
              className="flex items-center gap-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Entrega em todo Brasil</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Câmeras HD em tempo real</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Pagamento seguro</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[400px] aspect-[4/3] overflow-hidden rounded-xl neon-border">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster="/placeholder.svg?height=300&width=400"
              >
                <source src="/placeholder.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium flex items-center gap-1.5">
                  <span className="text-green-500 text-lg">●</span> {freeMachines} máquinas livres
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium flex items-center gap-1.5">
                  <span className="text-red-500 text-lg">●</span> {busyMachines} em jogo agora
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-pink-500/20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
