"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

const featuredMachines = [
  {
    id: 1,
    name: "Super Kawaii Collection",
    description: "Pelúcias exclusivas da coleção Kawaii com personagens fofos e coloridos.",
    image: "/placeholder.svg?height=400&width=600",
    badge: "Destaque",
  },
  {
    id: 2,
    name: "Anime Heroes",
    description: "Pelúcias dos seus personagens favoritos de anime em tamanho especial.",
    image: "/placeholder.svg?height=400&width=600",
    badge: "Limitado",
  },
  {
    id: 3,
    name: "Monsters & Dragons",
    description: "Coleção especial de monstros e dragões fofos para sua coleção.",
    image: "/placeholder.svg?height=400&width=600",
    badge: "Novo",
  },
]

export function FeaturedMachines() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const timerRef = useRef(null)

  const next = () => {
    setCurrent(current === featuredMachines.length - 1 ? 0 : current + 1)
  }

  const prev = () => {
    setCurrent(current === 0 ? featuredMachines.length - 1 : current - 1)
  }

  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        next()
      }, 5000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [current, autoplay])

  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  return (
    <section className="w-full py-12 md:py-16" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-xl">
          {featuredMachines.map((machine, index) => (
            <div
              key={machine.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${machine.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30"></div>
              <div className="relative z-20 h-full flex flex-col justify-center p-6 md:p-12 lg:max-w-[50%]">
                <motion.div
                  key={`content-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <Badge className="bg-primary/80 backdrop-blur-sm text-primary-foreground">{machine.badge}</Badge>
                  <h2 className="text-3xl font-heading tracking-tighter sm:text-4xl md:text-5xl">{machine.name}</h2>
                  <p className="text-muted-foreground md:text-lg">{machine.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild size="lg" className="game-button">
                      <Link href={`/play/${machine.id}`}>Jogar Agora</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                    >
                      <Link href={`/machine/${machine.id}`}>Ver Detalhes</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}

          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={prev}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Anterior</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={next}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Próximo</span>
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2">
              {featuredMachines.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? "w-6 bg-primary" : "w-2 bg-primary/50"
                  }`}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
