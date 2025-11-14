"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

const topPlayers = [
  { id: 1, name: "GamerPro123", points: 12500, wins: 42, image: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "PeluciaQueen", points: 10800, wins: 36, image: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "MasterClaw", points: 9200, wins: 31, image: "/placeholder.svg?height=50&width=50" },
]

const rankingData = [
  ...topPlayers,
  { id: 4, name: "CatchEmAll", points: 8500, wins: 28, image: "/placeholder.svg?height=50&width=50" },
  { id: 5, name: "PlushHunter", points: 7900, wins: 26, image: "/placeholder.svg?height=50&width=50" },
  { id: 6, name: "GarraVeloz", points: 7200, wins: 24, image: "/placeholder.svg?height=50&width=50" },
  { id: 7, name: "ToyCollector", points: 6800, wins: 22, image: "/placeholder.svg?height=50&width=50" },
  { id: 8, name: "PrizeWinner", points: 6300, wins: 21, image: "/placeholder.svg?height=50&width=50" },
  { id: 9, name: "LuckyGrab", points: 5900, wins: 19, image: "/placeholder.svg?height=50&width=50" },
  { id: 10, name: "ClawMaster", points: 5500, wins: 18, image: "/placeholder.svg?height=50&width=50" },
  { id: 11, name: "PlushLover", points: 5100, wins: 17, image: "/placeholder.svg?height=50&width=50" },
  { id: 12, name: "ToyChaser", points: 4800, wins: 16, image: "/placeholder.svg?height=50&width=50" },
  { id: 13, name: "PrizeHunter", points: 4500, wins: 15, image: "/placeholder.svg?height=50&width=50" },
  { id: 14, name: "GrabKing", points: 4200, wins: 14, image: "/placeholder.svg?height=50&width=50" },
  { id: 15, name: "PlushPro", points: 3900, wins: 13, image: "/placeholder.svg?height=50&width=50" },
]

export default function RankingPage() {
  const [period, setPeriod] = useState("all-time")

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ranking de Jogadores</h1>
          <p className="text-muted-foreground">Os melhores jogadores da plataforma</p>
        </div>
        <Button asChild className="game-button">
          <Link href="/machines">Jogar e Subir no Ranking</Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Top Jogadores</CardTitle>
                  <CardDescription>Classificação baseada em pontos</CardDescription>
                </div>
                <Tabs value={period} onValueChange={setPeriod}>
                  <TabsList>
                    <TabsTrigger value="weekly">Semanal</TabsTrigger>
                    <TabsTrigger value="monthly">Mensal</TabsTrigger>
                    <TabsTrigger value="all-time">Todos os Tempos</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 w-16">Pos.</th>
                        <th className="text-left p-3">Jogador</th>
                        <th className="text-right p-3">Pontos</th>
                        <th className="text-right p-3 hidden sm:table-cell">Vitórias</th>
                        <th className="text-right p-3 w-20"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankingData.map((player, index) => (
                        <tr key={player.id} className="border-t hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            {index < 3 ? (
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold">
                                {index + 1}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-medium">
                                {index + 1}
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{player.name}</p>
                                {index < 3 && (
                                  <Badge variant="outline" className="mt-1">
                                    {index === 0 ? "Lenda" : index === 1 ? "Elite" : "Mestre"}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-right font-bold">{player.points.toLocaleString()}</td>
                          <td className="p-3 text-right hidden sm:table-cell">{player.wins}</td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/profile/${player.id}`}>Ver</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">Carregar Mais</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle>Pódio</CardTitle>
              <CardDescription>Os três melhores jogadores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-center gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 border-2 border-purple-500">
                    <AvatarImage src={topPlayers[1].image || "/placeholder.svg"} alt={topPlayers[1].name} />
                    <AvatarFallback>{topPlayers[1].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="mt-2 text-center">
                    <p className="font-bold">{topPlayers[1].name}</p>
                    <p className="text-sm text-muted-foreground">{topPlayers[1].points} pts</p>
                  </div>
                  <div className="h-24 w-16 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg mt-4 flex items-center justify-center">
                    <Medal className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-muted rounded-full px-3 py-1 -mt-2 text-sm font-bold">2</div>
                </div>

                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 border-2 border-yellow-500">
                    <AvatarImage src={topPlayers[0].image || "/placeholder.svg"} alt={topPlayers[0].name} />
                    <AvatarFallback>{topPlayers[0].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="mt-2 text-center">
                    <p className="font-bold">{topPlayers[0].name}</p>
                    <p className="text-sm text-muted-foreground">{topPlayers[0].points} pts</p>
                  </div>
                  <div className="h-32 w-20 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg mt-4 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                  <div className="bg-muted rounded-full px-3 py-1 -mt-2 text-sm font-bold">1</div>
                </div>

                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 border-2 border-orange-500">
                    <AvatarImage src={topPlayers[2].image || "/placeholder.svg"} alt={topPlayers[2].name} />
                    <AvatarFallback>{topPlayers[2].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="mt-2 text-center">
                    <p className="font-bold">{topPlayers[2].name}</p>
                    <p className="text-sm text-muted-foreground">{topPlayers[2].points} pts</p>
                  </div>
                  <div className="h-20 w-16 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-lg mt-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-muted rounded-full px-3 py-1 -mt-2 text-sm font-bold">3</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle>Prêmios do Ranking</CardTitle>
              <CardDescription>Recompensas para os melhores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                  <Trophy className="h-10 w-10 text-yellow-500" />
                  <div>
                    <p className="font-bold">1º Lugar</p>
                    <p className="text-sm text-muted-foreground">R$500 em créditos + Pelúcia exclusiva</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                  <Medal className="h-10 w-10 text-purple-500" />
                  <div>
                    <p className="font-bold">2º Lugar</p>
                    <p className="text-sm text-muted-foreground">R$300 em créditos + 3 jogadas grátis</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20">
                  <Award className="h-10 w-10 text-orange-500" />
                  <div>
                    <p className="font-bold">3º Lugar</p>
                    <p className="text-sm text-muted-foreground">R$150 em créditos + 2 jogadas grátis</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
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
                    className="h-10 w-10 text-blue-500"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                  <div>
                    <p className="font-bold">4º-10º Lugar</p>
                    <p className="text-sm text-muted-foreground">1 jogada grátis por semana</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
