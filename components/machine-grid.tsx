"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Clock } from "lucide-react"

const machines = [
  {
    id: 1,
    name: "Máquina Kawaii",
    image: "/placeholder.svg?height=200&width=300",
    players: 12,
    lastWin: "2 min atrás",
    difficulty: "Fácil",
    type: "popular",
  },
  {
    id: 2,
    name: "Anime Lovers",
    image: "/placeholder.svg?height=200&width=300",
    players: 8,
    lastWin: "5 min atrás",
    difficulty: "Médio",
    type: "new",
  },
  {
    id: 3,
    name: "Bichinhos Fofinhos",
    image: "/placeholder.svg?height=200&width=300",
    players: 15,
    lastWin: "1 min atrás",
    difficulty: "Fácil",
    type: "popular",
  },
  {
    id: 4,
    name: "Heróis Chibi",
    image: "/placeholder.svg?height=200&width=300",
    players: 6,
    lastWin: "10 min atrás",
    difficulty: "Difícil",
    type: "exclusive",
  },
  {
    id: 5,
    name: "Pokémon Plush",
    image: "/placeholder.svg?height=200&width=300",
    players: 20,
    lastWin: "30 seg atrás",
    difficulty: "Médio",
    type: "popular",
  },
  {
    id: 6,
    name: "Pelúcias Espaciais",
    image: "/placeholder.svg?height=200&width=300",
    players: 9,
    lastWin: "7 min atrás",
    difficulty: "Médio",
    type: "new",
  },
  {
    id: 7,
    name: "Bichos da Floresta",
    image: "/placeholder.svg?height=200&width=300",
    players: 5,
    lastWin: "15 min atrás",
    difficulty: "Fácil",
    type: "standard",
  },
  {
    id: 8,
    name: "Dragões Fofos",
    image: "/placeholder.svg?height=200&width=300",
    players: 11,
    lastWin: "3 min atrás",
    difficulty: "Difícil",
    type: "exclusive",
  },
]

export function MachineGrid() {
  const [filter, setFilter] = useState("all")

  const filteredMachines = filter === "all" ? machines : machines.filter((machine) => machine.type === filter)

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Nossas Máquinas
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Escolha entre diversas máquinas com diferentes temas e níveis de dificuldade
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-gradient-to-r from-pink-600 to-purple-600" : ""}
            >
              Todas
            </Button>
            <Button
              variant={filter === "popular" ? "default" : "outline"}
              onClick={() => setFilter("popular")}
              className={filter === "popular" ? "bg-gradient-to-r from-pink-600 to-purple-600" : ""}
            >
              Populares
            </Button>
            <Button
              variant={filter === "new" ? "default" : "outline"}
              onClick={() => setFilter("new")}
              className={filter === "new" ? "bg-gradient-to-r from-pink-600 to-purple-600" : ""}
            >
              Novidades
            </Button>
            <Button
              variant={filter === "exclusive" ? "default" : "outline"}
              onClick={() => setFilter("exclusive")}
              className={filter === "exclusive" ? "bg-gradient-to-r from-pink-600 to-purple-600" : ""}
            >
              Exclusivas
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {filteredMachines.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={machine.image || "/placeholder.svg"}
                      alt={machine.name}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        className={
                          machine.type === "popular"
                            ? "bg-orange-500"
                            : machine.type === "new"
                              ? "bg-green-500"
                              : machine.type === "exclusive"
                                ? "bg-purple-500"
                                : "bg-blue-500"
                        }
                      >
                        {machine.type === "popular"
                          ? "Popular"
                          : machine.type === "new"
                            ? "Novo"
                            : machine.type === "exclusive"
                              ? "Exclusivo"
                              : "Padrão"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <CardTitle className="text-white text-xl">{machine.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{machine.players} jogando</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Vitória: {machine.lastWin}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-card/60">
                      Dificuldade: {machine.difficulty}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full game-button">
                    <Link href={`/play/${machine.id}`}>Jogar Agora</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
          >
            <Link href="/machines">Ver Todas as Máquinas</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
