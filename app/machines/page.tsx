"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Clock,
  Lock,
  Star,
  Search,
  Filter,
  ArrowUpDown,
  Crown,
  Sparkles,
  Gift,
  Heart,
  Trophy,
  Flame,
  Gamepad,
  DollarSign,
  Info,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useMobile } from "@/hooks/use-mobile"

// Dados das máquinas disponíveis
const availableMachines = [
  {
    id: 1,
    name: "Máquina Kawaii",
    image: "/placeholder.svg?height=200&width=300",
    players: 12,
    lastWin: "2 min atrás",
    difficulty: "Fácil",
    type: "popular",
    status: "available",
    winRate: 28,
    price: 10,
    description: "Pelúcias exclusivas da coleção Kawaii com personagens fofos e coloridos.",
    prizes: ["Urso Kawaii", "Panda Fofo", "Coelho Pastel", "Gato Anime"],
    likes: 342,
    views: 1240,
    featured: true,
    promotion: null,
  },
  {
    id: 2,
    name: "Anime Lovers",
    image: "/placeholder.svg?height=200&width=300",
    players: 8,
    lastWin: "5 min atrás",
    difficulty: "Médio",
    type: "new",
    status: "available",
    winRate: 22,
    price: 12,
    description: "Pelúcias dos seus personagens favoritos de anime em tamanho especial.",
    prizes: ["Naruto Chibi", "Goku Fofo", "Sailor Moon", "Totoro"],
    likes: 186,
    views: 890,
    featured: false,
    promotion: "2x1",
  },
  {
    id: 3,
    name: "Bichinhos Fofinhos",
    image: "/placeholder.svg?height=200&width=300",
    players: 15,
    lastWin: "1 min atrás",
    difficulty: "Fácil",
    type: "popular",
    status: "available",
    winRate: 32,
    price: 8,
    description: "Coleção de bichinhos fofinhos perfeitos para presentear quem você ama.",
    prizes: ["Leãozinho", "Elefantinho", "Girafa Baby", "Pinguim"],
    likes: 421,
    views: 1560,
    featured: true,
    promotion: "30% OFF",
  },
]

// Dados das máquinas em uso
const inUseMachines = [
  {
    id: 4,
    name: "Heróis Chibi",
    image: "/placeholder.svg?height=200&width=300",
    players: 6,
    lastWin: "10 min atrás",
    difficulty: "Difícil",
    type: "exclusive",
    status: "in-use",
    winRate: 18,
    price: 15,
    description: "Coleção exclusiva de super-heróis em versão chibi adorável.",
    prizes: ["Batman Chibi", "Superman Fofo", "Wonder Woman", "Spider-Man"],
    likes: 210,
    views: 780,
    featured: false,
    promotion: null,
    availableIn: "5 minutos",
  },
  {
    id: 5,
    name: "Pokémon Plush",
    image: "/placeholder.svg?height=200&width=300",
    players: 20,
    lastWin: "30 seg atrás",
    difficulty: "Médio",
    type: "popular",
    status: "in-use",
    winRate: 25,
    price: 12,
    description: "Capture seus Pokémon favoritos em versão pelúcia super fofa!",
    prizes: ["Pikachu", "Bulbasaur", "Charmander", "Squirtle"],
    likes: 530,
    views: 2100,
    featured: true,
    promotion: null,
    availableIn: "2 minutos",
  },
]

// Dados das máquinas bloqueadas
const lockedMachines = [
  {
    id: 6,
    name: "Pelúcias Espaciais",
    image: "/placeholder.svg?height=200&width=300",
    players: 9,
    lastWin: "7 min atrás",
    difficulty: "Médio",
    type: "new",
    status: "locked",
    unlockRequirement: "Comprar VIP",
    winRate: 20,
    price: 14,
    description: "Pelúcias temáticas do espaço com planetas, astronautas e alienígenas fofos.",
    prizes: ["Astronauta", "Planeta Sorridente", "Alienígena Fofo", "Foguete"],
    likes: 175,
    views: 620,
    featured: false,
    promotion: null,
    unlockProgress: 0,
  },
  {
    id: 7,
    name: "Bichos da Floresta",
    image: "/placeholder.svg?height=200&width=300",
    players: 5,
    lastWin: "15 min atrás",
    difficulty: "Fácil",
    type: "standard",
    status: "locked",
    unlockRequirement: "Nível 2",
    winRate: 30,
    price: 10,
    description: "Adoráveis animais da floresta em pelúcias super macias e detalhadas.",
    prizes: ["Raposa", "Esquilo", "Coruja", "Texugo"],
    likes: 145,
    views: 510,
    featured: false,
    promotion: null,
    unlockProgress: 85,
  },
  {
    id: 8,
    name: "Dragões Fofos",
    image: "/placeholder.svg?height=200&width=300",
    players: 11,
    lastWin: "3 min atrás",
    difficulty: "Difícil",
    type: "exclusive",
    status: "locked",
    unlockRequirement: "10 vitórias",
    winRate: 15,
    price: 18,
    description: "Dragões míticos transformados em pelúcias adoráveis e colecionáveis.",
    prizes: ["Dragão Azul", "Dragão Vermelho", "Dragão Verde", "Dragão Dourado"],
    likes: 290,
    views: 950,
    featured: false,
    promotion: null,
    unlockProgress: 20,
  },
  {
    id: 9,
    name: "Edição Limitada",
    image: "/placeholder.svg?height=200&width=300",
    players: 25,
    lastWin: "1 min atrás",
    difficulty: "Difícil",
    type: "exclusive",
    status: "locked",
    unlockRequirement: "Evento especial",
    winRate: 12,
    price: 20,
    description: "Pelúcias de edição limitada disponíveis apenas por tempo limitado!",
    prizes: ["Unicórnio Raro", "Fênix Dourada", "Kraken Fofo", "Yeti Branco"],
    likes: 450,
    views: 1800,
    featured: true,
    promotion: null,
    unlockProgress: 10,
  },
  {
    id: 10,
    name: "Coleção Rara",
    image: "/placeholder.svg?height=200&width=300",
    players: 18,
    lastWin: "4 min atrás",
    difficulty: "Médio",
    type: "exclusive",
    status: "locked",
    unlockRequirement: "Comprar VIP+",
    winRate: 22,
    price: 16,
    description: "Pelúcias raras e difíceis de encontrar, exclusivas para membros VIP+.",
    prizes: ["Pégaso", "Sereia", "Centauro", "Grifo"],
    likes: 320,
    views: 1100,
    featured: false,
    promotion: null,
    unlockProgress: 0,
  },
  {
    id: 11,
    name: "Pelúcias Premiadas",
    image: "/placeholder.svg?height=200&width=300",
    players: 22,
    lastWin: "2 min atrás",
    difficulty: "Difícil",
    type: "exclusive",
    status: "locked",
    unlockRequirement: "Nível 5",
    winRate: 16,
    price: 15,
    description: "Pelúcias que ganharam prêmios de design e são extremamente detalhadas.",
    prizes: ["Lobo Premium", "Tigre Detalhado", "Panda Realista", "Leão Artesanal"],
    likes: 380,
    views: 1400,
    featured: true,
    promotion: null,
    unlockProgress: 30,
  },
  {
    id: 12,
    name: "Coleção Especial",
    image: "/placeholder.svg?height=200&width=300",
    players: 14,
    lastWin: "8 min atrás",
    difficulty: "Médio",
    type: "new",
    status: "locked",
    unlockRequirement: "Convide 3 amigos",
    winRate: 24,
    price: 12,
    description: "Pelúcias especiais com acabamento premium e materiais de alta qualidade.",
    prizes: ["Urso de Pelúcia Premium", "Coelho de Algodão", "Gato Persa", "Cachorro Husky"],
    likes: 210,
    views: 780,
    featured: false,
    promotion: null,
    unlockProgress: 33,
  },
]

// Combinando todas as máquinas
const allMachines = [...availableMachines, ...inUseMachines, ...lockedMachines]

export default function MachinesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(!isMobile)
  const [selectedMachine, setSelectedMachine] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 20])
  const [difficultyFilter, setDifficultyFilter] = useState(["Fácil", "Médio", "Difícil"])
  const [showOnlyPromotions, setShowOnlyPromotions] = useState(false)
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState([])
  const itemsPerPage = 6
  const videoRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Filtrar máquinas
  const filteredMachines = allMachines
    .filter((machine) => {
      // Filtro por tipo
      if (filter !== "all" && machine.type !== filter) return false

      // Filtro por status
      if (filter === "available" && machine.status !== "available") return false
      if (filter === "in-use" && machine.status !== "in-use") return false
      if (filter === "locked" && machine.status !== "locked") return false
      if (filter === "favorites" && !favorites.includes(machine.id)) return false

      // Filtro por busca
      if (searchQuery && !machine.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

      // Filtro por preço
      if (machine.price < priceRange[0] || machine.price > priceRange[1]) return false

      // Filtro por dificuldade
      if (!difficultyFilter.includes(machine.difficulty)) return false

      // Filtro por promoções
      if (showOnlyPromotions && !machine.promotion) return false

      // Filtro por disponibilidade
      if (showOnlyAvailable && machine.status !== "available") return false

      return true
    })
    .sort((a, b) => {
      // Ordenação
      if (sortBy === "popular") return b.players - a.players
      if (sortBy === "newest") return a.id < b.id ? 1 : -1
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "win-rate") return b.winRate - a.winRate
      if (sortBy === "easiest") {
        const difficultyMap = { Fácil: 1, Médio: 2, Difícil: 3 }
        return difficultyMap[a.difficulty] - difficultyMap[b.difficulty]
      }
      if (sortBy === "hardest") {
        const difficultyMap = { Fácil: 1, Médio: 2, Difícil: 3 }
        return difficultyMap[b.difficulty] - difficultyMap[a.difficulty]
      }
      return 0
    })

  // Paginação
  const totalPages = Math.ceil(filteredMachines.length / itemsPerPage)
  const currentMachines = filteredMachines.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleUnlock = (machine) => {
    toast({
      title: "Máquina bloqueada",
      description: `Para desbloquear esta máquina você precisa: ${machine.unlockRequirement}`,
    })
  }

  const handleInUse = (machine) => {
    toast({
      title: "Máquina em uso",
      description: `Esta máquina está sendo usada no momento. Estará disponível em ${machine.availableIn}.`,
    })
  }

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleQuickPlay = (e, machine) => {
    e.preventDefault()
    e.stopPropagation()

    if (machine.status === "locked") {
      handleUnlock(machine)
      return
    }

    if (machine.status === "in-use") {
      handleInUse(machine)
      return
    }

    toast({
      title: "Preparando sua jogada!",
      description: `Conectando à máquina ${machine.name}...`,
    })

    setTimeout(() => {
      window.location.href = `/play/${machine.id}`
    }, 1500)
  }

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const handleMachineClick = (machine) => {
    setSelectedMachine(machine)
  }

  const handleDifficultyToggle = (difficulty) => {
    setDifficultyFilter((prev) => {
      if (prev.includes(difficulty)) {
        return prev.filter((d) => d !== difficulty)
      } else {
        return [...prev, difficulty]
      }
    })
  }

  const resetFilters = () => {
    setFilter("all")
    setSearchQuery("")
    setSortBy("popular")
    setPriceRange([0, 20])
    setDifficultyFilter(["Fácil", "Médio", "Difícil"])
    setShowOnlyPromotions(false)
    setShowOnlyAvailable(false)
    setCurrentPage(1)
  }

  const getStatusBadge = (machine) => {
    if (machine.status === "available") {
      return <Badge className="bg-green-500">Disponível</Badge>
    } else if (machine.status === "in-use") {
      return <Badge className="bg-yellow-500">Em Uso</Badge>
    } else {
      return <Badge className="bg-gray-500">Bloqueada</Badge>
    }
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Máquinas de Pelúcia
          </h1>
          <p className="text-muted-foreground">
            Escolha entre diversas máquinas com diferentes temas e níveis de dificuldade
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={viewMode === "grid" ? "bg-muted" : ""}
            onClick={() => setViewMode("grid")}
          >
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
              className="h-4 w-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={viewMode === "list" ? "bg-muted" : ""}
            onClick={() => setViewMode("list")}
          >
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
              className="h-4 w-4"
            >
              <line x1="8" x2="21" y1="6" y2="6" />
              <line x1="8" x2="21" y1="12" y2="12" />
              <line x1="8" x2="21" y1="18" y2="18" />
              <line x1="3" x2="3.01" y1="6" y2="6" />
              <line x1="3" x2="3.01" y1="12" y2="12" />
              <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
          </Button>
          {isMobile && (
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Featured Machine */}
      <div className="mb-8">
        <div className="relative rounded-xl overflow-hidden border border-purple-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-transparent to-pink-900/80 z-10"></div>
          <video
            ref={videoRef}
            className="w-full h-[300px] md:h-[400px] object-cover"
            poster="/placeholder.svg?height=400&width=1200"
            loop
            muted={muted}
          >
            <source src="/placeholder.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/60"
              onClick={handleVideoPlay}
            >
              {isPlaying ? (
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
                  className="h-4 w-4"
                >
                  <rect width="4" height="16" x="6" y="4" />
                  <rect width="4" height="16" x="14" y="4" />
                </svg>
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/60"
              onClick={handleVideoMute}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          <div className="absolute inset-0 flex items-center z-20 p-6 md:p-12">
            <div className="max-w-2xl">
              <Badge className="mb-2 bg-primary/80 backdrop-blur-sm">Destaque da Semana</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Máquina Kawaii Premium</h2>
              <p className="text-white/80 mb-4 max-w-md">
                Nossa máquina mais popular com pelúcias exclusivas da coleção Kawaii. Taxa de vitória aumentada por
                tempo limitado!
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-background/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                  <Users className="h-4 w-4 inline mr-1" /> 24 jogadores hoje
                </div>
                <div className="bg-background/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                  <Trophy className="h-4 w-4 inline mr-1" /> 35% taxa de vitória
                </div>
                <div className="bg-background/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                  <DollarSign className="h-4 w-4 inline mr-1" /> R$10 por jogada
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="game-button">
                  <a href="/play/1">Jogar Agora</a>
                </Button>
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Sidebar Filters */}
        {showFilters && (
          <motion.div
            initial={isMobile ? { x: -250, opacity: 0 } : false}
            animate={isMobile ? { x: 0, opacity: 1 } : false}
            exit={isMobile ? { x: -250, opacity: 0 } : false}
            className={`space-y-6 ${isMobile ? "fixed inset-y-0 left-0 z-50 w-[250px] bg-background p-4 shadow-lg overflow-y-auto" : ""}`}
          >
            {isMobile && (
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Filtros</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nome da máquina"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "all" ? "bg-muted" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  Todas
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "available" ? "bg-muted" : ""}`}
                  onClick={() => setFilter("available")}
                >
                  <Badge className="mr-2 bg-green-500">Disponível</Badge>
                  Disponíveis
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "in-use" ? "bg-muted" : ""}`}
                  onClick={() => setFilter("in-use")}
                >
                  <Badge className="mr-2 bg-yellow-500">Em Uso</Badge>
                  Em Uso
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "locked" ? "bg-muted" : ""}`}
                  onClick={() => setFilter("locked")}
                >
                  <Badge className="mr-2 bg-gray-500">Bloqueada</Badge>
                  Bloqueadas
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "favorites" ? "bg-muted" : ""}`}
                  onClick={() => setFilter("favorites")}
                >
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  Favoritas
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Categorias
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "popular" ? "bg-muted" : ""}`}
                  onClick={() => setFilter("popular")}
                >
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  Populares
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "new" ? "bg-muted" : ""}`}
                  onClick={() => setFilter("new")}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-green-500" />
                  Novidades
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "exclusive" ? "bg-muted" : ""}`}
                  onClick={() => setFilter("exclusive")}
                >
                  <Crown className="mr-2 h-4 w-4 text-purple-500" />
                  Exclusivas
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Ordenar por
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${sortBy === "popular" ? "bg-muted" : ""}`}
                  onClick={() => setSortBy("popular")}
                >
                  <Flame className="mr-2 h-4 w-4 text-orange-500" />
                  Mais populares
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${sortBy === "newest" ? "bg-muted" : ""}`}
                  onClick={() => setSortBy("newest")}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                  Mais recentes
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${sortBy === "win-rate" ? "bg-muted" : ""}`}
                  onClick={() => setSortBy("win-rate")}
                >
                  <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                  Maior taxa de vitória
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${sortBy === "price-low" ? "bg-muted" : ""}`}
                  onClick={() => setSortBy("price-low")}
                >
                  <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                  Menor preço
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${sortBy === "price-high" ? "bg-muted" : ""}`}
                  onClick={() => setSortBy("price-high")}
                >
                  <DollarSign className="mr-2 h-4 w-4 text-purple-500" />
                  Maior preço
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${sortBy === "easiest" ? "bg-muted" : ""}`}
                  onClick={() => setSortBy("easiest")}
                >
                  <ArrowUpDown className="mr-2 h-4 w-4 rotate-180" />
                  Mais fáceis
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${sortBy === "hardest" ? "bg-muted" : ""}`}
                  onClick={() => setSortBy("hardest")}
                >
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Mais difíceis
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Preço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>R${priceRange[0]}</span>
                  <span>R${priceRange[1]}</span>
                </div>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={20}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Gamepad className="h-4 w-4 mr-2" />
                  Dificuldade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="difficulty-easy"
                    checked={difficultyFilter.includes("Fácil")}
                    onCheckedChange={() => handleDifficultyToggle("Fácil")}
                  />
                  <label
                    htmlFor="difficulty-easy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Fácil
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="difficulty-medium"
                    checked={difficultyFilter.includes("Médio")}
                    onCheckedChange={() => handleDifficultyToggle("Médio")}
                  />
                  <label
                    htmlFor="difficulty-medium"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Médio
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="difficulty-hard"
                    checked={difficultyFilter.includes("Difícil")}
                    onCheckedChange={() => handleDifficultyToggle("Difícil")}
                  />
                  <label
                    htmlFor="difficulty-hard"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Difícil
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Gift className="h-4 w-4 mr-2" />
                  Opções Adicionais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="show-promotions" checked={showOnlyPromotions} onCheckedChange={setShowOnlyPromotions} />
                  <Label htmlFor="show-promotions">Apenas promoções</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-available" checked={showOnlyAvailable} onCheckedChange={setShowOnlyAvailable} />
                  <Label htmlFor="show-available">Apenas disponíveis</Label>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Desbloqueie Todas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-200 mb-4 text-sm">
                  Torne-se VIP e tenha acesso a todas as máquinas exclusivas e bônus especiais!
                </p>
                <Button className="w-full game-button">Assinar VIP</Button>
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full" onClick={resetFilters}>
              Limpar Filtros
            </Button>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Exibindo {currentMachines.length} de {filteredMachines.length} máquinas
            </p>
            <div className="flex items-center gap-2">
              {!isMobile && (
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Card key={index} className="overflow-hidden bg-card/60 backdrop-blur-sm border-purple-500/20">
                    <div className="h-[200px] bg-muted animate-pulse"></div>
                    <CardContent className="p-4">
                      <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-3/4 mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
                        <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <div className="h-10 bg-muted animate-pulse rounded w-full"></div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {currentMachines.map((machine, index) => (
                  <motion.div
                    key={machine.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleMachineClick(machine)}
                  >
                    <Card className="overflow-hidden bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <img
                            src={machine.image || "/placeholder.svg"}
                            alt={machine.name}
                            className={`w-full aspect-video object-cover ${machine.status !== "available" ? "opacity-70" : ""}`}
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {getStatusBadge(machine)}
                            {machine.promotion && <Badge className="bg-red-500">{machine.promotion}</Badge>}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 left-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(machine.id)
                            }}
                          >
                            <Heart
                              className={`h-4 w-4 ${favorites.includes(machine.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>

                          {machine.status === "locked" ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <div className="bg-background/80 backdrop-blur-md rounded-full p-3">
                                <Lock className="h-8 w-8 text-primary" />
                              </div>
                            </div>
                          ) : machine.status === "in-use" ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                              <div className="bg-background/80 backdrop-blur-md rounded-full p-3 mb-2">
                                <Users className="h-8 w-8 text-yellow-500" />
                              </div>
                              <p className="text-white bg-background/50 px-3 py-1 rounded-full text-sm">
                                Disponível em {machine.availableIn}
                              </p>
                            </div>
                          ) : (
                            <Button
                              className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-black/30 backdrop-blur-sm transition-all duration-300 rounded-none"
                              variant="ghost"
                              onClick={(e) => handleQuickPlay(e, machine)}
                            >
                              <div className="bg-background/80 backdrop-blur-md rounded-full p-4">
                                <Play className="h-8 w-8 text-primary" />
                              </div>
                            </Button>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <CardTitle className="text-white text-xl">{machine.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{machine.players} jogadores</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Vitória: {machine.lastWin}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="bg-card/60">
                            {machine.difficulty}
                          </Badge>

                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{machine.winRate}% vitórias</span>
                          </div>
                        </div>

                        {machine.status === "locked" && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progresso para desbloquear</span>
                              <span>{machine.unlockProgress}%</span>
                            </div>
                            <Progress value={machine.unlockProgress} className="h-2" />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <div className="w-full">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-lg">R${machine.price}</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{machine.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          {machine.status === "available" ? (
                            <Button asChild className="w-full game-button">
                              <a href={`/play/${machine.id}`}>Jogar Agora</a>
                            </Button>
                          ) : machine.status === "in-use" ? (
                            <Button
                              className="w-full bg-yellow-500 hover:bg-yellow-600"
                              onClick={() => handleInUse(machine)}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              Aguardar Disponibilidade
                            </Button>
                          ) : (
                            <Button className="w-full bg-muted hover:bg-muted/80" onClick={() => handleUnlock(machine)}>
                              <Lock className="mr-2 h-4 w-4" />
                              {machine.unlockRequirement}
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {currentMachines.map((machine, index) => (
                  <motion.div
                    key={machine.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    onClick={() => handleMachineClick(machine)}
                  >
                    <Card className="overflow-hidden bg-card/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-40">
                          <img
                            src={machine.image || "/placeholder.svg"}
                            alt={machine.name}
                            className={`w-full h-full object-cover ${machine.status !== "available" ? "opacity-70" : ""}`}
                          />

                          {machine.status === "locked" ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <div className="bg-background/80 backdrop-blur-md rounded-full p-2">
                                <Lock className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                          ) : machine.status === "in-use" ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                              <div className="bg-background/80 backdrop-blur-md rounded-full p-2 mb-1">
                                <Users className="h-6 w-6 text-yellow-500" />
                              </div>
                              <p className="text-white bg-background/50 px-2 py-1 rounded-full text-xs">
                                Em {machine.availableIn}
                              </p>
                            </div>
                          ) : (
                            <Button
                              className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 bg-black/30 backdrop-blur-sm transition-all duration-300 rounded-none"
                              variant="ghost"
                              onClick={(e) => handleQuickPlay(e, machine)}
                            >
                              <div className="bg-background/80 backdrop-blur-md rounded-full p-3">
                                <Play className="h-6 w-6 text-primary" />
                              </div>
                            </Button>
                          )}

                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {getStatusBadge(machine)}
                            {machine.promotion && <Badge className="bg-red-500">{machine.promotion}</Badge>}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-2 left-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(machine.id)
                            }}
                          >
                            <Heart
                              className={`h-4 w-4 ${favorites.includes(machine.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </div>

                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold">{machine.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2">
                                {machine.description}
                              </p>
                            </div>
                            <Badge variant="outline" className="bg-card/60">
                              {machine.difficulty}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-3 mt-2 mb-3">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{machine.players} jogadores</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span>{machine.winRate}% vitórias</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Vitória: {machine.lastWin}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold">
                              <DollarSign className="h-4 w-4" />
                              <span>R${machine.price}</span>
                            </div>
                          </div>

                          {machine.status === "locked" && (
                            <div className="mt-2 mb-3">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Progresso para desbloquear</span>
                                <span>{machine.unlockProgress}%</span>
                              </div>
                              <Progress value={machine.unlockProgress} className="h-2" />
                            </div>
                          )}

                          <div className="mt-3">
                            {machine.status === "available" ? (
                              <Button asChild className="game-button">
                                <a href={`/play/${machine.id}`}>Jogar Agora</a>
                              </Button>
                            ) : machine.status === "in-use" ? (
                              <Button
                                className="bg-yellow-500 hover:bg-yellow-600"
                                onClick={() => handleInUse(machine)}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                Aguardar Disponibilidade
                              </Button>
                            ) : (
                              <Button className="bg-muted hover:bg-muted/80" onClick={() => handleUnlock(machine)}>
                                <Lock className="mr-2 h-4 w-4" />
                                {machine.unlockRequirement}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {filteredMachines.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nenhuma máquina encontrada</h3>
              <p className="text-muted-foreground max-w-md">
                Não encontramos máquinas com os filtros selecionados. Tente ajustar seus filtros ou volte mais tarde.
              </p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Limpar filtros
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-primary" : ""}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Machine Detail Dialog */}
      <Dialog open={!!selectedMachine} onOpenChange={(open) => !open && setSelectedMachine(null)}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          {selectedMachine && (
            <>
              <div className="relative h-[200px] sm:h-[300px]">
                <img
                  src={selectedMachine.image || "/placeholder.svg"}
                  alt={selectedMachine.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40"
                    onClick={() => setSelectedMachine(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusBadge(selectedMachine)}
                    {selectedMachine.promotion && <Badge className="bg-red-500">{selectedMachine.promotion}</Badge>}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedMachine.name}</h2>
                  <p className="text-white/80">{selectedMachine.description}</p>
                </div>
              </div>

              <div className="p-6">
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                    <TabsTrigger value="prizes">Prêmios</TabsTrigger>
                    <TabsTrigger value="stats">Estatísticas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Dificuldade</h4>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => {
                              const difficultyMap = { Fácil: 2, Médio: 3, Difícil: 5 }
                              const difficultyLevel = difficultyMap[selectedMachine.difficulty] || 3
                              return (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill={i < difficultyLevel ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-yellow-500"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              )
                            })}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Jogadores</h4>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{selectedMachine.players} jogadores</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Última Vitória</h4>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{selectedMachine.lastWin}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Preço por Jogada</h4>
                        <div className="font-bold text-primary">R$ {selectedMachine.price},00</div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Taxa de Vitória</h4>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span>{selectedMachine.winRate}%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Popularidade</h4>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{selectedMachine.likes} curtidas</span>
                        </div>
                      </div>
                    </div>
                    {selectedMachine.status === "locked" && (
                      <div className="mt-4 p-4 rounded-lg bg-muted">
                        <h4 className="text-sm font-medium mb-2">Requisito para Desbloquear</h4>
                        <div className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-primary" />
                          <span>{selectedMachine.unlockRequirement}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Seu progresso</span>
                            <span>{selectedMachine.unlockProgress}%</span>
                          </div>
                          <Progress value={selectedMachine.unlockProgress} className="h-2" />
                        </div>
                      </div>
                    )}
                    {selectedMachine.status === "in-use" && (
                      <div className="mt-4 p-4 rounded-lg bg-yellow-500/10">
                        <h4 className="text-sm font-medium mb-2">Máquina em Uso</h4>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-yellow-500" />
                          <span>Disponível em aproximadamente {selectedMachine.availableIn}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Você pode aguardar ou escolher outra máquina disponível.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="prizes" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {selectedMachine.prizes.map((prize, i) => (
                        <div key={i} className="text-center">
                          <div className="aspect-square rounded-md overflow-hidden mb-2 bg-muted">
                            <img
                              src={`/placeholder.svg?height=100&width=100&text=${prize}`}
                              alt={prize}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium">{prize}</p>
                          <p className="text-xs text-muted-foreground">
                            Raridade: {i === 0 ? "Comum" : i === 1 ? "Incomum" : i === 2 ? "Raro" : "Ultra Raro"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="stats" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Histórico de Vitórias</h4>
                        <div className="h-[200px] bg-muted rounded-lg p-4 flex items-end justify-between">
                          {Array(7)
                            .fill(0)
                            .map((_, i) => {
                              const height = 30 + Math.random() * 120
                              return (
                                <div key={i} className="flex flex-col items-center">
                                  <div
                                    className="w-8 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-md"
                                    style={{ height: `${height}px` }}
                                  ></div>
                                  <span className="text-xs mt-2">Dia {i + 1}</span>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Últimos Vencedores</h4>
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                    {String.fromCharCode(65 + i)}
                                  </div>
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
                                </div>
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                                  Ganhou
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <DialogFooter className="p-6 pt-0">
                {selectedMachine.status === "available" ? (
                  <Button asChild className="w-full game-button">
                    <a href={`/play/${selectedMachine.id}`}>Jogar Agora - R${selectedMachine.price},00</a>
                  </Button>
                ) : selectedMachine.status === "in-use" ? (
                  <Button
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => handleInUse(selectedMachine)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Aguardar Disponibilidade
                  </Button>
                ) : (
                  <Button className="w-full bg-muted hover:bg-muted/80" onClick={() => handleUnlock(selectedMachine)}>
                    <Lock className="mr-2 h-4 w-4" />
                    Desbloquear - {selectedMachine.unlockRequirement}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Checkbox({ id, checked, onCheckedChange }) {
  return (
    <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onCheckedChange(!checked)}
        className="opacity-0 absolute h-4 w-4 cursor-pointer"
      />
      {checked && (
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
          className="h-3 w-3 text-primary-foreground"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  )
}
