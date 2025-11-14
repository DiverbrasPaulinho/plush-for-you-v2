"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  Gamepad2,
  Video,
  MousePointerClick,
  Package,
  Trophy,
  ChevronRight,
  Play,
  Gift,
  CreditCard,
  CheckCircle2,
  Clock,
  Smartphone,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Zap,
  Star,
  Heart,
  Share2,
  Mail,
  Phone,
  MessageSquare,
  Send,
  X,
} from "lucide-react"

export default function HowItWorksPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [activeStep, setActiveStep] = useState(1)
  const [showDemo, setShowDemo] = useState(false)
  const [demoPlaying, setDemoPlaying] = useState(false)
  const [demoMuted, setDemoMuted] = useState(true)
  const [demoProgress, setDemoProgress] = useState(0)
  const [demoStage, setDemoStage] = useState(1)
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", message: "Olá! Como posso ajudar você a entender como funciona o Plush For You?" },
  ])
  const [chatInput, setChatInput] = useState("")
  const [showPromo, setShowPromo] = useState(false)
  const [countdown, setCountdown] = useState(300)
  const [subscribed, setSubscribed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const demoRef = useRef(null)
  const stepsRef = useRef(null)
  const videoRef = useRef(null)
  const chatContainerRef = useRef(null)
  const isStepsInView = useInView(stepsRef, { once: true, amount: 0.2 })

  // Simular contagem regressiva
  useEffect(() => {
    if (showPromo) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showPromo])

  // Mostrar promoção após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromo(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // Rolar para o final do chat quando novas mensagens são adicionadas
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  // Simular progresso da demo
  useEffect(() => {
    if (demoPlaying) {
      const interval = setInterval(() => {
        setDemoProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setDemoPlaying(false)
            setDemoStage(4)
            return 100
          }

          // Mudar estágio baseado no progresso
          if (prev === 30) setDemoStage(2)
          if (prev === 70) setDemoStage(3)

          return prev + 1
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [demoPlaying])

  const steps = [
    {
      icon: <Gamepad2 className="h-10 w-10 text-primary" />,
      title: "Escolha uma Máquina",
      description: "Navegue por nossa seleção de máquinas com diferentes temas e níveis de dificuldade.",
      details:
        "Temos mais de 20 máquinas diferentes, cada uma com pelúcias exclusivas. Você pode filtrar por categoria, dificuldade ou popularidade para encontrar a máquina perfeita para você.",
      video: "/placeholder.mp4",
      image: "/placeholder.svg?height=300&width=500&text=Escolha+uma+Máquina",
    },
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: "Assista ao Stream em HD",
      description: "Veja a máquina em tempo real através de nossas câmeras de alta definição.",
      details:
        "Nossas câmeras transmitem em 1080p com baixa latência, permitindo que você veja exatamente o que está acontecendo na máquina em tempo real. Múltiplos ângulos garantem visibilidade total.",
      video: "/placeholder.mp4",
      image: "/placeholder.svg?height=300&width=500&text=Stream+em+HD",
    },
    {
      icon: <MousePointerClick className="h-10 w-10 text-primary" />,
      title: "Controle Remotamente",
      description: "Use os controles na tela para mover a garra e tentar capturar o prêmio desejado.",
      details:
        "Controles intuitivos permitem que você mova a garra para frente, para trás, para os lados e finalmente capture o prêmio. Você tem 30 segundos para posicionar a garra perfeitamente.",
      video: "/placeholder.mp4",
      image: "/placeholder.svg?height=300&width=500&text=Controle+Remoto",
    },
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      title: "Receba em Casa",
      description: "Se você ganhar, enviaremos o prêmio diretamente para o endereço que escolher.",
      details:
        "Entregamos para todo o Brasil com rastreamento completo. Você pode acompanhar o status da entrega em tempo real através do seu painel de controle. Tempo médio de entrega: 3-7 dias úteis.",
      video: "/placeholder.mp4",
      image: "/placeholder.svg?height=300&width=500&text=Entrega+em+Casa",
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      title: "Ganhe Pontos e Prêmios",
      description: "Acumule pontos a cada jogada e troque por jogadas grátis ou descontos em envios.",
      details:
        "Mesmo quando não ganha uma pelúcia, você acumula pontos que podem ser trocados por recompensas. Quanto mais você joga, mais benefícios exclusivos você desbloqueia, incluindo acesso a máquinas VIP.",
      video: "/placeholder.mp4",
      image: "/placeholder.svg?height=300&width=500&text=Pontos+e+Prêmios",
    },
  ]

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      })
      return
    }

    setSubscribed(true)
    setShowConfetti(true)

    toast({
      title: "Inscrição realizada!",
      description: "Você receberá 3 jogadas grátis no seu email.",
    })

    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const scrollToDemo = () => {
    setShowDemo(true)
    setTimeout(() => {
      demoRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1)
    } else {
      setActiveStep(1)
    }
  }

  const handleDemoPlay = () => {
    setDemoPlaying(true)
    setDemoProgress(0)
    setDemoStage(1)
  }

  const handleDemoMute = () => {
    setDemoMuted(!demoMuted)
    if (videoRef.current) {
      videoRef.current.muted = !demoMuted
    }
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Adicionar mensagem do usuário
    setChatMessages([...chatMessages, { sender: "user", message: chatInput }])

    // Simular resposta do bot
    setTimeout(() => {
      let botResponse = "Entendi! Vou te ajudar com isso."

      if (chatInput.toLowerCase().includes("preço") || chatInput.toLowerCase().includes("custo")) {
        botResponse =
          "Cada jogada custa a partir de R$10, dependendo da máquina. Temos pacotes promocionais que oferecem descontos: 3 jogadas por R$25, 5 jogadas por R$40 e 10 jogadas por R$70."
      } else if (chatInput.toLowerCase().includes("entrega") || chatInput.toLowerCase().includes("frete")) {
        botResponse =
          "Enviamos para todo o Brasil! O frete é calculado com base no seu CEP e no tamanho do prêmio. O tempo médio de entrega é de 3 a 7 dias úteis para capitais e 5 a 10 dias úteis para o interior."
      } else if (chatInput.toLowerCase().includes("ganhar") || chatInput.toLowerCase().includes("chance")) {
        botResponse =
          "A taxa de vitória varia de 15% a 35%, dependendo da máquina. Mesmo quando você não ganha, acumula pontos que podem ser trocados por recompensas!"
      } else if (chatInput.toLowerCase().includes("começar") || chatInput.toLowerCase().includes("jogar")) {
        botResponse =
          "Para começar a jogar, basta criar uma conta gratuita, adicionar créditos e escolher uma máquina. Novos usuários ganham 3 jogadas grátis ao se cadastrarem!"
      }

      setChatMessages((prev) => [...prev, { sender: "bot", message: botResponse }])
    }, 1000)

    setChatInput("")
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="container py-8 relative">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array(50)
            .fill(0)
            .map((_, i) => {
              const size = 5 + Math.random() * 10
              const left = Math.random() * 100
              const animationDuration = 1 + Math.random() * 2
              const delay = Math.random()
              const color = [
                "bg-red-500",
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
                "bg-purple-500",
                "bg-pink-500",
              ][Math.floor(Math.random() * 6)]

              return (
                <div
                  key={i}
                  className={`absolute rounded-full ${color}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    top: "-20px",
                    animation: `fall ${animationDuration}s ease-in forwards ${delay}s`,
                  }}
                />
              )
            })}
        </div>
      )}

      {/* Promo Popup */}
      <Dialog open={showPromo && !subscribed} onOpenChange={setShowPromo}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <div className="relative">
            <img
              src="/placeholder.svg?height=200&width=500&text=Oferta+Especial"
              alt="Oferta Especial"
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40"
                onClick={() => setShowPromo(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <Badge className="bg-red-500 mb-2">Oferta por Tempo Limitado</Badge>
              <h2 className="text-2xl font-bold text-white">Ganhe 5 Jogadas Grátis!</h2>
            </div>
          </div>

          <div className="p-6 text-center">
            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-1">Esta oferta expira em:</div>
              <div className="text-2xl font-bold text-primary">{formatTime(countdown)}</div>
            </div>

            <p className="mb-4">
              Inscreva-se agora e ganhe <span className="font-bold">5 jogadas grátis</span> +
              <span className="font-bold"> 50% de desconto</span> no seu primeiro pacote!
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full game-button">
                Quero Minhas Jogadas Grátis
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Ao se inscrever, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chatbot */}
      <div
        className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${showChatbot ? "w-[350px]" : "w-auto"}`}
      >
        {showChatbot ? (
          <Card className="border-purple-500/20 shadow-lg">
            <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Assistente Plush</CardTitle>
                  <CardDescription className="text-xs">Online agora</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowChatbot(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <div ref={chatContainerRef} className="p-4 h-[300px] overflow-y-auto flex flex-col gap-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <CardFooter className="p-4 border-t">
              <form onSubmit={handleChatSubmit} className="w-full flex gap-2">
                <Input
                  placeholder="Digite sua pergunta..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <Button type="submit" size="icon" className="bg-primary">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        ) : (
          <Button
            onClick={() => setShowChatbot(true)}
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Badge className="bg-primary/80 backdrop-blur-sm mb-2">Diversão Garantida</Badge>
            <h1 className="text-4xl font-bold tracking-tighter font-heading sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Como Funciona o Plush For You
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
              Jogue em máquinas de pelúcia reais, capture prêmios e receba em casa. É fácil, divertido e você pode jogar
              de qualquer lugar!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="game-button" onClick={scrollToDemo}>
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
              >
                <Link href="/machines">
                  Jogar Agora
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Entrega em todo Brasil</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Câmeras HD em tempo real</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Pagamento seguro</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-25"></div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                poster="/placeholder.svg?height=400&width=600"
                className="w-full h-full object-cover"
                loop
                muted
              >
                <source src="/placeholder.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-background/80 backdrop-blur-sm hover:bg-background/60"
                  onClick={scrollToDemo}
                >
                  <Play className="h-8 w-8 text-primary" />
                </Button>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 flex gap-2">
              <Badge className="bg-background/80 backdrop-blur-sm border-none">
                <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                4.9/5 (2.5k avaliações)
              </Badge>
              <Badge className="bg-background/80 backdrop-blur-sm border-none">
                <Users className="h-3 w-3 mr-1" />
                100k+ jogadores
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Steps */}
      <section ref={stepsRef} className="py-12 md:py-24 bg-gradient-to-b from-background to-background/80">
        <div className="text-center mb-12">
          <Badge className="mb-4">Processo Simples</Badge>
          <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Jogue em 5 Passos Fáceis
          </h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Entenda como você pode jogar e ganhar pelúcias reais sem sair de casa
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col items-center text-center ${activeStep === index + 1 ? "scale-110 z-10" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isStepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveStep(index + 1)}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-4 cursor-pointer">
                  <div
                    className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${activeStep === index + 1 ? "bg-primary/40 scale-110" : "bg-primary/20"}`}
                  ></div>
                  <div
                    className={`relative flex items-center justify-center h-20 w-20 rounded-full border transition-all duration-300 ${
                      activeStep === index + 1
                        ? "bg-primary border-purple-500 shadow-lg shadow-purple-500/30"
                        : "bg-card border-purple-500/50"
                    }`}
                  >
                    <div className={activeStep === index + 1 ? "text-white" : "text-primary"}>{step.icon}</div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-background text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center border border-purple-500/50">
                    {index + 1}
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold mb-2 transition-colors ${activeStep === index + 1 ? "text-primary" : ""}`}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 md:p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/20">
          <div className="grid md:grid-cols-[2fr_3fr] gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">{steps[activeStep - 1].title}</h3>
              <p className="text-muted-foreground mb-6">{steps[activeStep - 1].details}</p>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                  onClick={nextStep}
                >
                  Próximo Passo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button asChild className="game-button">
                  <Link href="/machines">Experimentar Agora</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-lg blur-md"></div>
              <div className="relative rounded-lg overflow-hidden border border-purple-500/20">
                <img
                  src={steps[activeStep - 1].image || "/placeholder.svg"}
                  alt={`Passo ${activeStep}: ${steps[activeStep - 1].title}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/60"
                  size="sm"
                  onClick={scrollToDemo}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Ver em Ação
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      {showDemo && (
        <section ref={demoRef} className="py-12 md:py-24">
          <div className="text-center mb-12">
            <Badge className="mb-4">Demonstração Interativa</Badge>
            <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Experimente Como Funciona
            </h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
              Veja como é fácil jogar em nossas máquinas de pelúcia online
            </p>
          </div>

          <Tabs defaultValue="desktop" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="desktop">
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
                    className="h-4 w-4 mr-2"
                  >
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                  </svg>
                  Desktop
                </TabsTrigger>
                <TabsTrigger value="mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="desktop" className="mt-0">
              <div className="relative mx-auto max-w-4xl aspect-video rounded-lg overflow-hidden border border-purple-500/20">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="relative h-full flex flex-col">
                  <div className="bg-card/80 backdrop-blur-sm p-2 border-b border-purple-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-sm font-medium">Máquina Kawaii - Plush For You</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                        Ao Vivo
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        <Users className="h-3 w-3 inline mr-1" />
                        128 assistindo
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-black flex items-center justify-center relative">
                    <img
                      src={`/placeholder.svg?height=400&width=600&text=Estágio+${demoStage}`}
                      alt="Demonstração"
                      className="w-full h-full object-cover opacity-80"
                    />

                    {!demoPlaying && demoProgress === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Button className="game-button mb-4" onClick={handleDemoPlay}>
                            <Play className="mr-2 h-4 w-4" />
                            Iniciar Demonstração
                          </Button>
                          <p className="text-white text-sm max-w-xs mx-auto">
                            Veja como funciona o processo completo de jogo
                          </p>
                        </div>
                      </div>
                    )}

                    {demoPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white text-xl mb-2 font-bold">
                            {demoStage === 1
                              ? "Posicionando a garra..."
                              : demoStage === 2
                                ? "Descendo a garra..."
                                : "Capturando o prêmio..."}
                          </div>
                          <div className="w-64 bg-background/20 rounded-full h-2 mb-4">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${demoProgress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!demoPlaying && demoProgress === 100 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center bg-background/80 backdrop-blur-md p-6 rounded-lg max-w-md">
                          <div className="text-3xl font-bold text-primary mb-2">Parabéns!</div>
                          <p className="mb-4">
                            Você capturou um Urso Kawaii! Agora é só informar o endereço de entrega.
                          </p>
                          <div className="flex justify-center gap-4">
                            <Button variant="outline">Jogar Novamente</Button>
                            <Button className="game-button">Informar Endereço</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-card/80 backdrop-blur-sm p-4 border-t border-purple-500/20 grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <div className="grid grid-cols-3 grid-rows-3 gap-2">
                        <div></div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-muted/80 hover:bg-primary/20"
                          disabled={demoPlaying || demoProgress === 100}
                        >
                          <ChevronUp className="h-6 w-6" />
                        </Button>
                        <div></div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-muted/80 hover:bg-primary/20"
                          disabled={demoPlaying || demoProgress === 100}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <div></div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-muted/80 hover:bg-primary/20"
                          disabled={demoPlaying || demoProgress === 100}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                        <div></div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-muted/80 hover:bg-primary/20"
                          disabled={demoPlaying || demoProgress === 100}
                        >
                          <ChevronDown className="h-6 w-6" />
                        </Button>
                        <div></div>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="game-button w-full text-lg"
                        disabled={demoPlaying || demoProgress === 100}
                        onClick={handleDemoPlay}
                      >
                        <MousePointerClick className="mr-2 h-5 w-5" />
                        Capturar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4 gap-2">
                <Button variant="outline" size="sm" className="rounded-full" onClick={handleDemoMute}>
                  {demoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setDemoPlaying(false)
                    setDemoProgress(0)
                    setDemoStage(1)
                  }}
                >
                  Reiniciar
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="mt-0">
              <div className="relative mx-auto max-w-[300px] h-[600px] rounded-3xl overflow-hidden border border-purple-500/20">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="relative h-full flex flex-col">
                  <div className="bg-card/80 backdrop-blur-sm p-2 border-b border-purple-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium">Máquina Kawaii</div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500 text-xs">
                      Ao Vivo
                    </Badge>
                  </div>

                  <div className="flex-1 bg-black flex items-center justify-center relative">
                    <img
                      src={`/placeholder.svg?height=400&width=300&text=Mobile+Demo+${demoStage}`}
                      alt="Demonstração Mobile"
                      className="w-full h-full object-cover opacity-80"
                    />

                    {!demoPlaying && demoProgress === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Button className="game-button mb-4 text-sm" onClick={handleDemoPlay}>
                            <Play className="mr-2 h-4 w-4" />
                            Iniciar Demo
                          </Button>
                        </div>
                      </div>
                    )}

                    {demoPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white text-base mb-2 font-bold">
                            {demoStage === 1 ? "Posicionando..." : demoStage === 2 ? "Descendo..." : "Capturando..."}
                          </div>
                          <div className="w-40 bg-background/20 rounded-full h-2 mb-4">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${demoProgress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!demoPlaying && demoProgress === 100 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center bg-background/80 backdrop-blur-md p-4 rounded-lg max-w-[250px]">
                          <div className="text-xl font-bold text-primary mb-2">Parabéns!</div>
                          <p className="mb-4 text-sm">Você capturou um Urso Kawaii!</p>
                          <Button className="game-button w-full text-sm">Informar Endereço</Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-card/80 backdrop-blur-sm p-4 border-t border-purple-500/20">
                    <div className="grid grid-cols-3 grid-rows-3 gap-2 mb-4">
                      <div></div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-muted/80 hover:bg-primary/20 h-10 w-10"
                        disabled={demoPlaying || demoProgress === 100}
                      >
                        <ChevronUp className="h-5 w-5" />
                      </Button>
                      <div></div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-muted/80 hover:bg-primary/20 h-10 w-10"
                        disabled={demoPlaying || demoProgress === 100}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <div></div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-muted/80 hover:bg-primary/20 h-10 w-10"
                        disabled={demoPlaying || demoProgress === 100}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                      <div></div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-muted/80 hover:bg-primary/20 h-10 w-10"
                        disabled={demoPlaying || demoProgress === 100}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </Button>
                      <div></div>
                    </div>
                    <Button
                      size="lg"
                      className="game-button w-full"
                      disabled={demoPlaying || demoProgress === 100}
                      onClick={handleDemoPlay}
                    >
                      Capturar
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      )}

      {/* Benefits */}
      <section className="py-12 md:py-24">
        <div className="text-center mb-12">
          <Badge className="mb-4">Vantagens Exclusivas</Badge>
          <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Por Que Escolher o Plush For You?
          </h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
            Vantagens exclusivas que fazem nossa plataforma ser a melhor opção para jogar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Câmeras HD em Tempo Real</CardTitle>
                <CardDescription>
                  Transmissão em alta definição com múltiplos ângulos para você ver cada detalhe.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Câmeras 1080p com baixa latência</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Múltiplos ângulos para melhor visibilidade</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Iluminação profissional para visualização clara</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Entrega Garantida</CardTitle>
                <CardDescription>Envio rápido e seguro para todo o Brasil com rastreamento completo.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Entrega para todo o Brasil</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Rastreamento em tempo real</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Embalagem especial para proteger as pelúcias</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Bônus e Recompensas</CardTitle>
                <CardDescription>Sistema de recompensas que premia sua fidelidade e habilidade.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Pontos em todas as jogadas, mesmo sem vitória</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Jogadas grátis para novos usuários</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Programa de fidelidade com benefícios exclusivos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Pagamento Seguro</CardTitle>
                <CardDescription>Diversas opções de pagamento com total segurança e privacidade.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Cartão de crédito, PIX e boleto</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Criptografia de ponta a ponta</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Sistema de créditos para jogadas mais rápidas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Disponível 24/7</CardTitle>
                <CardDescription>Jogue a qualquer hora, de qualquer lugar, sem filas ou espera.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Máquinas disponíveis 24 horas por dia</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Sem filas ou tempo de espera</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Suporte técnico disponível para ajudar a qualquer momento</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Compatível com Todos Dispositivos</CardTitle>
                <CardDescription>Jogue pelo computador, tablet ou smartphone com a mesma qualidade.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Interface adaptada para todos os tamanhos de tela</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Controles otimizados para touch e mouse</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Aplicativo disponível para iOS e Android</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-background to-background/80">
        <div className="text-center mb-12">
          <Badge className="mb-4">Depoimentos</Badge>
          <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            O Que Nossos Jogadores Dizem
          </h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
            Veja as experiências de quem já ganhou pelúcias em nossa plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              name: "Ana Silva",
              avatar: "/placeholder.svg?height=80&width=80",
              role: "Jogadora Premium",
              content:
                "Já ganhei 5 pelúcias diferentes! O sistema é super fácil de usar e a entrega foi rápida. Recomendo muito!",
              rating: 5,
            },
            {
              name: "Carlos Mendes",
              avatar: "/placeholder.svg?height=80&width=80",
              role: "Membro desde 2023",
              content:
                "Dei de presente para minha namorada uma pelúcia que ela queria muito. Foi uma surpresa incrível quando chegou na casa dela.",
              rating: 5,
            },
            {
              name: "Juliana Costa",
              avatar: "/placeholder.svg?height=80&width=80",
              role: "Colecionadora",
              content:
                "A qualidade das pelúcias é excelente! Já montei uma coleção incrível e continuo jogando para completar.",
              rating: 4,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between mb-4">
                    <div className="flex gap-4">
                      <div className="relative">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur opacity-75"></div>
                        <Avatar className="h-12 w-12 border-2 border-background">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">{testimonial.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>24 curtidas</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 gap-1">
                      <Share2 className="h-3 w-3" />
                      <span>Compartilhar</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
            Ver Mais Depoimentos
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-24">
        <div className="text-center mb-12">
          <Badge className="mb-4">Dúvidas Frequentes</Badge>
          <h2 className="text-3xl font-heading tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
            Tudo o que você precisa saber sobre o Plush For You
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>As máquinas são reais?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Sim! Todas as máquinas são 100% reais e você está jogando em tempo real através de nossa plataforma.
                </p>
                <p className="mb-2">
                  Utilizamos câmeras HD e controles remotos que permitem que você manipule a garra exatamente como faria
                  pessoalmente. Cada movimento que você faz é transmitido instantaneamente para a máquina física.
                </p>
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=400&text=Máquinas+Reais"
                    alt="Máquinas Reais"
                    className="w-full h-auto"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Quanto custa para jogar?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Cada jogada custa a partir de R$10, dependendo da máquina e da dificuldade.</p>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted">
                    <span>Jogada individual</span>
                    <span className="font-bold">R$10,00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted">
                    <span>Pacote de 3 jogadas</span>
                    <div>
                      <span className="line-through text-muted-foreground mr-2">R$30,00</span>
                      <span className="font-bold">R$25,00</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted">
                    <span>Pacote de 5 jogadas</span>
                    <div>
                      <span className="line-through text-muted-foreground mr-2">R$50,00</span>
                      <span className="font-bold">R$40,00</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-muted">
                    <span>Pacote de 10 jogadas</span>
                    <div>
                      <span className="line-through text-muted-foreground mr-2">R$100,00</span>
                      <span className="font-bold">R$70,00</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  Novos usuários recebem 3 jogadas grátis ao se cadastrarem. Além disso, você acumula pontos a cada
                  jogada que podem ser trocados por jogadas grátis.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Como funciona a entrega?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Enviamos para todo o Brasil. O frete é calculado com base no seu CEP e no tamanho do prêmio.
                </p>
                <p className="mb-2">
                  Utilizamos os Correios e transportadoras parceiras para garantir a entrega mais rápida possível. O
                  tempo médio de entrega é de 3 a 7 dias úteis para capitais e 5 a 10 dias úteis para o interior.
                </p>
                <p className="mb-2">
                  Todas as entregas possuem código de rastreamento que você pode acompanhar pelo seu painel.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-muted flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <span>Você pode acompanhar o status da entrega em tempo real através do seu painel de controle.</span>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>E se eu não conseguir pegar nenhuma pelúcia?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Mesmo quando você não ganha uma pelúcia, acumula pontos que podem ser trocados por recompensas como
                  jogadas grátis, descontos em fretes ou acesso a máquinas exclusivas.
                </p>
                <p className="mb-2">
                  Além disso, oferecemos dicas e tutoriais para melhorar suas habilidades. Algumas máquinas têm níveis
                  de dificuldade menores, ideais para iniciantes.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-lg bg-muted text-center">
                    <div className="font-bold text-lg">10</div>
                    <div className="text-xs text-muted-foreground">pontos por jogada</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted text-center">
                    <div className="font-bold text-lg">100</div>
                    <div className="text-xs text-muted-foreground">pontos = 1 jogada grátis</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted text-center">
                    <div className="font-bold text-lg">500</div>
                    <div className="text-xs text-muted-foreground">pontos = frete grátis</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Posso enviar o prêmio como presente?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Sim! Ao ganhar uma pelúcia, você pode escolher enviá-la para qualquer endereço no Brasil.
                </p>
                <p className="mb-2">
                  Oferecemos opção de embalagem para presente com cartão personalizado por um valor adicional de R$15. É
                  uma ótima maneira de surpreender alguém especial com um presente único que você mesmo capturou.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-muted flex items-center gap-3">
                  <Gift className="h-5 w-5 text-primary" />
                  <span>Você pode adicionar uma mensagem personalizada no cartão que acompanha o presente.</span>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Como sei que não é uma fraude?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Entendemos sua preocupação! Por isso, transmitimos tudo em tempo real e com múltiplos ângulos de
                  câmera.
                </p>
                <p className="mb-2">
                  Você pode ver outros jogadores na sala de chat e acompanhar suas jogadas. Temos milhares de avaliações
                  positivas e depoimentos de clientes satisfeitos.
                </p>
                <p className="mb-2">
                  Além disso, somos uma empresa registrada com CNPJ e todos os dados estão disponíveis em nosso site.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-muted text-center">
                    <div className="font-bold text-lg">4.9/5</div>
                    <div className="text-xs text-muted-foreground">avaliação média</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted text-center">
                    <div className="font-bold text-lg">100k+</div>
                    <div className="text-xs text-muted-foreground">clientes satisfeitos</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Ainda tem dúvidas? Entre em contato conosco</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              contato@plushforyou.com
            </Button>
            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              (11) 99999-9999
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setShowChatbot(true)}>
              <MessageSquare className="h-4 w-4" />
              Chat Online
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-4">Fale Conosco</Badge>
            <h2 className="text-3xl font-bold tracking-tighter font-heading sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Tem Alguma Dúvida?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Preencha o formulário ao lado e nossa equipe entrará em contato o mais rápido possível para responder
              todas as suas dúvidas.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">contato@plushforyou.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-muted-foreground">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Horário de Atendimento</p>
                  <p className="text-muted-foreground">Segunda a Sexta, 9h às 18h</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle>Envie sua Mensagem</CardTitle>
              <CardDescription>Preencha o formulário abaixo e entraremos em contato</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Como podemos ajudar?"
                      className="min-h-[120px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full game-button">Enviar Mensagem</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-24">
        <div className="rounded-xl bg-gradient-to-r from-purple-900/70 to-pink-900/70 backdrop-blur-sm border border-purple-500/20 p-8 md:p-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white mb-2">Oferta Especial</Badge>
              <h2 className="text-3xl font-bold tracking-tighter font-heading sm:text-4xl md:text-5xl text-white">
                Pronto para Começar a Jogar?
              </h2>
              <p className="text-zinc-200 md:text-xl max-w-[600px]">
                Cadastre-se agora e ganhe 5 jogadas grátis para começar sua experiência no Plush For You!
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">5</div>
                  <div className="text-sm text-zinc-300">Jogadas Grátis</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">50%</div>
                  <div className="text-sm text-zinc-300">Desconto no 1º Pacote</div>
                </div>
              </div>

              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 mt-6">
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="game-button">
                  <Zap className="mr-2 h-4 w-4" />
                  Quero Jogar Grátis
                </Button>
              </form>

              <p className="text-sm text-zinc-300">
                Ao se cadastrar, você concorda com nossos termos de uso e política de privacidade.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-lg blur-md"></div>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500&text=Comece+Agora"
                  alt="Comece a jogar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-background/80 backdrop-blur-md rounded-lg p-6 max-w-xs">
                    <h3 className="text-xl font-bold mb-2">Bônus de Boas-vindas</h3>
                    <div className="text-4xl font-bold text-primary mb-2">5 JOGADAS</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Cadastre-se hoje e ganhe 5 jogadas grátis + 50% de desconto no seu primeiro pacote
                    </p>
                    <Button asChild className="game-button w-full">
                      <Link href="/register">
                        Criar Conta
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Avatar({ className, children }) {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>{children}</div>
  )
}

function AvatarImage({ className, src, alt }) {
  return <img className={cn("aspect-square h-full w-full", className)} src={src || "/placeholder.svg"} alt={alt} />
}

function AvatarFallback({ className, children }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}>
      {children}
    </div>
  )
}

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

function Textarea({ id, placeholder, className, value, onChange }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      value={value}
      onChange={onChange}
    />
  )
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}
