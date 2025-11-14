"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Gamepad2, Video, MousePointerClick, Package, Trophy } from "lucide-react"

const steps = [
  {
    icon: <Gamepad2 className="h-10 w-10 text-primary" />,
    title: "Escolha uma Máquina",
    description: "Navegue por nossa seleção de máquinas com diferentes temas e níveis de dificuldade.",
  },
  {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: "Assista ao Stream em HD",
    description: "Veja a máquina em tempo real através de nossas câmeras de alta definição.",
  },
  {
    icon: <MousePointerClick className="h-10 w-10 text-primary" />,
    title: "Controle Remotamente",
    description: "Use os controles na tela para mover a garra e tentar capturar o prêmio desejado.",
  },
  {
    icon: <Package className="h-10 w-10 text-primary" />,
    title: "Receba em Casa",
    description: "Se você ganhar, enviaremos o prêmio diretamente para o endereço que escolher.",
  },
  {
    icon: <Trophy className="h-10 w-10 text-primary" />,
    title: "Ganhe Pontos e Prêmios",
    description: "Acumule pontos a cada jogada e troque por jogadas grátis ou descontos em envios.",
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Como Funciona
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Entenda como você pode jogar e ganhar pelúcias reais sem sair de casa
            </p>
          </div>
        </div>

        <div ref={ref} className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-card border border-purple-500/50 shadow-lg">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent -translate-y-1/2"></div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-6 md:p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Perguntas Frequentes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2">As máquinas são reais?</h4>
                  <p className="text-muted-foreground">
                    Sim! Todas as máquinas são reais e você está jogando em tempo real através de nossa plataforma.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Quanto custa para jogar?</h4>
                  <p className="text-muted-foreground">
                    Cada jogada custa a partir de R$10, dependendo da máquina e da dificuldade.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Como funciona a entrega?</h4>
                  <p className="text-muted-foreground">
                    Enviamos para todo o Brasil. O frete é calculado com base no seu CEP e no tamanho do prêmio.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-25"></div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Como funciona"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-pointer">
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
                      className="h-8 w-8 text-primary"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
