"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ana Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Jogadora Premium",
    content:
      "Já ganhei 5 pelúcias diferentes! O sistema é super fácil de usar e a entrega foi rápida. Recomendo muito!",
    rating: 5,
  },
  {
    name: "Carlos Mendes",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Membro desde 2023",
    content:
      "Dei de presente para minha namorada uma pelúcia que ela queria muito. Foi uma surpresa incrível quando chegou na casa dela.",
    rating: 5,
  },
  {
    name: "Juliana Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Colecionadora",
    content: "A qualidade das pelúcias é excelente! Já montei uma coleção incrível e continuo jogando para completar.",
    rating: 4,
  },
  {
    name: "Rafael Oliveira",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Jogador Casual",
    content: "Achei que seria difícil ganhar, mas consegui na minha terceira tentativa! O suporte é muito atencioso.",
    rating: 5,
  },
  {
    name: "Mariana Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Streamer",
    content: "Faço lives jogando e meus seguidores adoram! É muito divertido e a emoção de ganhar é indescritível.",
    rating: 5,
  },
  {
    name: "Pedro Almeida",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Pai de 2 filhos",
    content:
      "Meus filhos amam as pelúcias que ganhamos. É uma atividade divertida que fazemos juntos nos fins de semana.",
    rating: 4,
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              O Que Nossos Jogadores Dizem
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Veja as experiências de quem já ganhou pelúcias em nossa plataforma
            </p>
          </div>
        </div>

        <div ref={ref} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/20 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">Junte-se a milhares de jogadores satisfeitos</h3>
          <p className="text-zinc-200 mb-6 max-w-2xl mx-auto">
            Mais de 50.000 pelúcias já foram entregues para jogadores em todo o Brasil. Comece a jogar agora e seja o
            próximo a ganhar!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-background/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold text-white">50.000+</p>
              <p className="text-sm text-zinc-300">Pelúcias Entregues</p>
            </div>
            <div className="bg-background/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold text-white">100.000+</p>
              <p className="text-sm text-zinc-300">Jogadores Ativos</p>
            </div>
            <div className="bg-background/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold text-white">4.8/5</p>
              <p className="text-sm text-zinc-300">Avaliação Média</p>
            </div>
            <div className="bg-background/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-sm text-zinc-300">Satisfação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
