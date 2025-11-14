"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Target, Users, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function PlayPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [moves, setMoves] = useState(0)
  const timerRef = useRef(null)
  const [gameStatus, setGameStatus] = useState("idle") // idle, playing, success, failure
  const [machineData, setMachineData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [position, setPosition] = useState({ x: 50, y: 50 }) // Position of the claw (0-100)
  const [clawState, setClawState] = useState("up") // up, down, grabbing, returning

  // Simular carregamento dos dados da máquina
  useEffect(() => {
    const fetchMachineData = async () => {
      // Simulação de chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Dados simulados da máquina
      setMachineData({
        id: Number.parseInt(params.id),
        name: `Máquina ${params.id}`,
        difficulty: "Médio",
        price: 10,
        winRate: 25,
        players: 8,
        lastWin: "5 min atrás",
        description: "Controle a garra e tente capturar uma pelúcia. Você tem 30 segundos para posicionar e capturar.",
        prizes: ["Urso Kawaii", "Panda Fofo", "Coelho Pastel", "Gato Anime"],
      })

      setIsLoading(false)
    }

    fetchMachineData()
  }, [params.id])

  useEffect(() => {
    if (clawState === "down") {
      const timer = setTimeout(() => {
        setClawState("grabbing")
        setTimeout(() => {
          setClawState("returning")
          setTimeout(() => {
            setClawState("up")
            // Determinar se o jogador ganhou (30% de chance)
            const isWin = Math.random() < 0.3
            setGameStatus(isWin ? "success" : "failure")
            clearInterval(timerRef.current)
            setIsPlaying(false)

            if (isWin) {
              toast({
                title: "Parabéns! Você ganhou!",
                description: "Seu prêmio será enviado para o endereço cadastrado.",
              })
            } else {
              toast({
                title: "Que pena! Você não conseguiu desta vez.",
                description: "Tente novamente!",
              })
            }
          }, 2000)
        }, 1500)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [clawState, toast])

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            setIsPlaying(false)
            setGameStatus("failure")
            toast({
              title: "Tempo esgotado!",
              description: "Seu tempo de jogo acabou.",
            })
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, toast])

  const startGame = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para jogar.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsPlaying(true)
    setTimeLeft(30)
    setMoves(0)
    setGameStatus("playing")
    setPosition({ x: 50, y: 50 })
    setClawState("up")

    toast({
      title: "Jogo iniciado!",
      description: "Você tem 30 segundos para capturar um prêmio.",
    })
  }

  const handleMove = (direction) => {
    if (!isPlaying || clawState !== "up") return

    setMoves((prev) => prev + 1)

    // Atualizar a posição da garra
    setPosition((prev) => {
      const step = 5
      switch (direction) {
        case "up":
          return { ...prev, y: Math.max(0, prev.y - step) }
        case "down":
          return { ...prev, y: Math.min(100, prev.y + step) }
        case "left":
          return { ...prev, x: Math.max(0, prev.x - step) }
        case "right":
          return { ...prev, x: Math.min(100, prev.x + step) }
        default:
          return prev
      }
    })

    // Simular envio do comando para o servidor
    toast({
      title: `Movimento: ${direction}`,
      description: "Comando enviado com sucesso.",
      duration: 1000,
    })
  }

  const handleCapture = () => {
    if (!isPlaying || clawState !== "up") return
    setClawState("down")
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-purple-500/20">
            <CardHeader className="p-4 bg-card/60 backdrop-blur-sm border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{machineData.name}</CardTitle>
                  <CardDescription>Jogo exclusivo para você</CardDescription>
                </div>
                <Badge variant="outline" className={isPlaying ? "bg-green-500/20 text-green-500" : "bg-muted"}>
                  {isPlaying ? "Jogando" : "Aguardando"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div className="relative aspect-video bg-black">
                {/* Game area */}
                <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 relative">
                  {/* Claw machine visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4/5 h-4/5 border-2 border-gray-600 rounded-md bg-gray-800/50 relative">
                      {/* Prizes (randomly positioned) */}
                      {machineData.prizes.map((prize, index) => (
                        <div
                          key={index}
                          className="absolute w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-xs text-white"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            backgroundColor: ["#f472b6", "#a78bfa", "#60a5fa", "#34d399"][index % 4],
                          }}
                        >
                          {prize.split(" ")[0]}
                        </div>
                      ))}

                      {/* Claw */}
                      <div
                        className={`absolute w-16 h-16 transition-all duration-300 ${
                          clawState === "grabbing" ? "scale-90" : ""
                        }`}
                        style={{
                          left: `calc(${position.x}% - 2rem)`,
                          top: clawState === "up" ? `calc(${position.y}% - 2rem)` : "70%",
                          transition: clawState === "up" ? "all 0.3s ease" : "top 2s ease",
                        }}
                      >
                        <div className="w-full h-full relative">
                          {/* Claw base */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gray-400"></div>

                          {/* Claw arms */}
                          <div
                            className={`absolute top-4 left-1/2 transform -translate-x-1/2 flex ${
                              clawState === "grabbing" ? "gap-1" : "gap-6"
                            } transition-all duration-500`}
                          >
                            <div className="w-2 h-6 bg-gray-400 transform rotate-45"></div>
                            <div className="w-2 h-6 bg-gray-400 transform -rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {!isPlaying && gameStatus === "idle" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <Button onClick={startGame} size="lg" className="game-button text-lg">
                      Iniciar Jogo (R${machineData.price},00)
                    </Button>
                  </div>
                )}

                {gameStatus === "success" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <div className="bg-background/80 backdrop-blur-md p-6 rounded-lg max-w-md text-center">
                      <div className="text-3xl font-bold text-primary mb-2">Parabéns!</div>
                      <p className="mb-4">Você capturou um prêmio! Agora é só informar o endereço de entrega.</p>
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={() => setGameStatus("idle")}>
                          Jogar Novamente
                        </Button>
                        <Button className="game-button">Informar Endereço</Button>
                      </div>
                    </div>
                  </div>
                )}

                {gameStatus === "failure" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <div className="bg-background/80 backdrop-blur-md p-6 rounded-lg max-w-md text-center">
                      <div className="text-3xl font-bold text-red-500 mb-2">Que pena!</div>
                      <p className="mb-4">Você não conseguiu desta vez. Tente novamente!</p>
                      <Button className="game-button" onClick={() => setGameStatus("idle")}>
                        Tentar Novamente
                      </Button>
                    </div>
                  </div>
                )}

                {isPlaying && (
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-primary">
                      Tempo: {timeLeft}s
                    </Badge>
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      Movimentos: {moves}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
            {isPlaying && clawState === "up" && (
              <CardFooter className="grid grid-cols-3 gap-2 p-4 bg-card/60 backdrop-blur-sm border-t">
                <div className="col-span-1 flex justify-center">
                  <div className="grid grid-cols-3 grid-rows-3 gap-2">
                    <div></div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-muted/80 hover:bg-primary/20"
                      onClick={() => handleMove("up")}
                    >
                      <ChevronUp className="h-6 w-6" />
                    </Button>
                    <div></div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-muted/80 hover:bg-primary/20"
                      onClick={() => handleMove("left")}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <div></div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-muted/80 hover:bg-primary/20"
                      onClick={() => handleMove("right")}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    <div></div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-muted/80 hover:bg-primary/20"
                      onClick={() => handleMove("down")}
                    >
                      <ChevronDown className="h-6 w-6" />
                    </Button>
                    <div></div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <Button size="lg" className="game-button w-full text-lg" onClick={handleCapture}>
                    <Target className="mr-2 h-5 w-5" />
                    Capturar
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader className="p-4">
              <CardTitle>Detalhes da Máquina</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="prizes">Prêmios</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Dificuldade</h4>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill={i < 3 ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-yellow-500"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Jogadores Hoje</h4>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{machineData.players} jogadores</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Última Vitória</h4>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{machineData.lastWin}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Preço por Jogada</h4>
                      <div className="font-bold text-primary">R$ {machineData.price},00</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Descrição</h4>
                    <p className="text-sm text-muted-foreground">{machineData.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="prizes" className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {machineData.prizes.map((prize, i) => (
                      <div key={i} className="text-center">
                        <div className="aspect-square rounded-md overflow-hidden mb-2">
                          <img
                            src={`/placeholder.svg?height=100&width=100&text=${prize}`}
                            alt={prize}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-medium">{prize}</p>
                        <p className="text-xs text-muted-foreground">
                          Raridade: {i < 2 ? "Comum" : i < 4 ? "Raro" : "Ultra Raro"}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                  <div className="space-y-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Usuário{i + 1}</p>
                            <p className="text-xs text-muted-foreground">
                              {i === 0
                                ? "2 minutos atrás"
                                : i === 1
                                  ? "15 minutos atrás"
                                  : i === 2
                                    ? "30 minutos atrás"
                                    : i === 3
                                      ? "1 hora atrás"
                                      : "2 horas atrás"}
                            </p>
                          </div>
                          <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                            {i % 2 === 0 ? "Ganhou" : "Perdeu"}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-purple-500/20">
            <CardHeader className="p-4">
              <CardTitle>Instruções de Jogo</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Como jogar:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Use os botões de direção para posicionar a garra sobre o prêmio desejado</li>
                  <li>Clique em "Capturar" quando estiver na posição ideal</li>
                  <li>A garra descerá automaticamente e tentará pegar o prêmio</li>
                  <li>Se conseguir, o prêmio será enviado para o endereço cadastrado</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Dicas:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Posicione a garra diretamente sobre o centro do prêmio</li>
                  <li>Observe o formato do prêmio para determinar o melhor ponto de captura</li>
                  <li>Você tem apenas 30 segundos para posicionar a garra</li>
                  <li>Quanto mais próximo do centro, maior a chance de sucesso</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Sua taxa de vitória:</h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-background rounded-full flex-1">
                    <div
                      className="h-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Baseado em suas jogadas anteriores. Jogue mais para aumentar sua habilidade!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader className="p-4">
              <CardTitle>Convide Amigos</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Convide seus amigos e ganhe créditos! Para cada amigo que se cadastrar usando seu código, você ganha
                R$10 em créditos.
              </p>

              <div className="bg-muted p-3 rounded-lg flex items-center justify-between mb-4">
                <code className="text-primary font-mono">AMIGO123</code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText("AMIGO123")
                    toast({
                      title: "Código copiado!",
                      description: "Compartilhe com seus amigos.",
                    })
                  }}
                >
                  Copiar
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Compartilhar no Facebook
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Compartilhar no Twitter
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Compartilhar no WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader className="p-4">
              <CardTitle>Hardware Necessário</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Para integrar máquinas físicas com nossa plataforma, você precisará dos seguintes componentes:
              </p>

              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Controlador Principal</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Raspberry Pi 4 (4GB ou 8GB RAM)</li>
                    <li>Arduino Mega 2560 para controle dos motores</li>
                    <li>Fonte de alimentação 12V/5A</li>
                  </ul>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Componentes da Garra</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>2x Motores de passo NEMA 17</li>
                    <li>1x Servo motor para controle da garra</li>
                    <li>Drivers A4988 para motores de passo</li>
                    <li>Correia GT2 e polias</li>
                  </ul>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Conectividade</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Módulo WiFi (embutido no Raspberry Pi)</li>
                    <li>Câmera HD compatível com Raspberry Pi</li>
                    <li>Cabo Ethernet (recomendado para conexão estável)</li>
                  </ul>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="font-medium mb-1">Software e Integração</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Sistema operacional Raspberry Pi OS</li>
                    <li>Nossa API de integração (fornecida após cadastro)</li>
                    <li>Bibliotecas de controle de motores e câmera</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Para instruções detalhadas de montagem e integração, acesse nossa documentação técnica ou entre em
                  contato com nossa equipe de suporte.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
