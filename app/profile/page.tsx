"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import {
  User,
  Trophy,
  Package,
  CreditCard,
  Gift,
  Settings,
  Bell,
  Lock,
  LogOut,
  Upload,
  Save,
  Share2,
  Copy,
  Check,
  Star,
  Heart,
  Gamepad2,
  Mail,
} from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading, logout, updateProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
    notifications: {
      email: true,
      app: true,
      marketing: false,
    },
    privacy: {
      showStats: true,
      showHistory: true,
    },
  })
  const [referralLink, setReferralLink] = useState("")
  const [referralCopied, setReferralCopied] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        location: user.location || "",
        phone: user.phone || "",
        notifications: {
          email: user.notifications?.email !== false,
          app: user.notifications?.app !== false,
          marketing: user.notifications?.marketing || false,
        },
        privacy: {
          showStats: user.privacy?.showStats !== false,
          showHistory: user.privacy?.showHistory !== false,
        },
      })
      setReferralLink(`https://plushforyou.com/ref/${user.id}`)
    }
  }, [user, isLoading, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const handlePrivacyChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update profile in auth context
      updateProfile({
        ...user,
        name: profileData.name,
        bio: profileData.bio,
        location: profileData.location,
        phone: profileData.phone,
        notifications: profileData.notifications,
        privacy: profileData.privacy,
        image: previewImage || user.image,
      })

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao atualizar suas informações.",
        variant: "destructive",
      })
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setReferralCopied(true)
    toast({
      title: "Link copiado!",
      description: "Link de convite copiado para a área de transferência.",
    })
    setTimeout(() => setReferralCopied(false), 3000)
  }

  if (isLoading || !user) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const achievements = [
    {
      id: 1,
      name: "Primeira Vitória",
      description: "Ganhe sua primeira pelúcia",
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      unlocked: true,
      date: "10/04/2023",
    },
    {
      id: 2,
      name: "Colecionador Iniciante",
      description: "Ganhe 5 pelúcias diferentes",
      icon: <Gift className="h-5 w-5 text-purple-500" />,
      unlocked: true,
      date: "15/05/2023",
    },
    {
      id: 3,
      name: "Jogador Frequente",
      description: "Jogue 10 vezes em uma semana",
      icon: <Gamepad2 className="h-5 w-5 text-green-500" />,
      unlocked: true,
      date: "22/05/2023",
    },
    {
      id: 4,
      name: "Mestre das Garras",
      description: "Ganhe 3 vezes seguidas",
      icon: <Star className="h-5 w-5 text-orange-500" />,
      unlocked: false,
      progress: 1,
      max: 3,
    },
    {
      id: 5,
      name: "Colecionador Avançado",
      description: "Ganhe 15 pelúcias diferentes",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      unlocked: false,
      progress: 5,
      max: 15,
    },
  ]

  const recentWins = [
    {
      id: 1,
      prize: "Urso Kawaii",
      machine: "Máquina Kawaii",
      date: "10/06/2023",
      image: "/placeholder.svg?height=80&width=80&text=Urso",
    },
    {
      id: 2,
      prize: "Panda Fofo",
      machine: "Bichinhos Fofinhos",
      date: "22/05/2023",
      image: "/placeholder.svg?height=80&width=80&text=Panda",
    },
    {
      id: 3,
      prize: "Gato Anime",
      machine: "Anime Lovers",
      date: "15/05/2023",
      image: "/placeholder.svg?height=80&width=80&text=Gato",
    },
  ]

  const referrals = [
    {
      id: 1,
      name: "Maria Silva",
      date: "15/06/2023",
      status: "Ativo",
      bonus: "50 créditos",
    },
    {
      id: 2,
      name: "João Santos",
      date: "10/06/2023",
      status: "Pendente",
      bonus: "-",
    },
  ]

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  {isEditing ? (
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage src={previewImage || user.image || "/placeholder.svg?height=96&width=96"} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer"
                      >
                        <Upload className="h-4 w-4" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  ) : (
                    <Avatar className="h-24 w-24 border-2 border-primary">
                      <AvatarImage src={user.image || "/placeholder.svg?height=96&width=96"} />
                      <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">Membro desde {user.joinDate || "Abril 2023"}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Nível {user.level || 5}
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                    VIP
                  </Badge>
                </div>
                <div className="w-full mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progresso para nível {(user.level || 5) + 1}</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{user.stats?.wins || 7}</p>
                  <p className="text-xs text-muted-foreground">Vitórias</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{user.stats?.plays || 32}</p>
                  <p className="text-xs text-muted-foreground">Jogadas</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{user.stats?.winRate || "22%"}</p>
                  <p className="text-xs text-muted-foreground">Taxa de Vitória</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{user.stats?.rank || 128}</p>
                  <p className="text-xs text-muted-foreground">Ranking</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Créditos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Saldo Atual</p>
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <p className="text-3xl font-bold">R$ {user.credits?.toFixed(2) || "100,00"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Equivalente a {Math.floor((user.credits || 100) / 10)} jogadas
                </p>
              </div>
              <Button className="w-full game-button">Adicionar Créditos</Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/dashboard">
                  <User className="mr-2 h-4 w-4" />
                  Painel
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/history">
                  <Trophy className="mr-2 h-4 w-4" />
                  Histórico
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/shipments">
                  <Package className="mr-2 h-4 w-4" />
                  Entregas
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/credits">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Créditos
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-500" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Card className="border-purple-500/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Perfil</CardTitle>
                  <CardDescription>Gerencie suas informações pessoais</CardDescription>
                </div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                    <Button className="game-button" onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Editar Perfil
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        placeholder="Cidade, Estado"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      placeholder="Conte um pouco sobre você..."
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Nome</h3>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Localização</h3>
                      <p>{user.location || "Não informado"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Telefone</h3>
                      <p>{user.phone || "Não informado"}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Biografia</h3>
                    <p className="text-sm">{user.bio || "Nenhuma biografia informada."}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="achievements">
            <TabsList className="w-full">
              <TabsTrigger value="achievements" className="flex-1">
                <Trophy className="h-4 w-4 mr-2" />
                Conquistas
              </TabsTrigger>
              <TabsTrigger value="collection" className="flex-1">
                <Gift className="h-4 w-4 mr-2" />
                Coleção
              </TabsTrigger>
              <TabsTrigger value="referrals" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Convide Amigos
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="mt-6">
              <Card className="border-purple-500/20">
                <CardHeader>
                  <CardTitle>Suas Conquistas</CardTitle>
                  <CardDescription>
                    Você desbloqueou {achievements.filter((a) => a.unlocked).length} de {achievements.length} conquistas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border ${achievement.unlocked ? "bg-muted/30" : "bg-muted/10"}`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              achievement.unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground/50"
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium">{achievement.name}</h4>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              </div>
                              {achievement.unlocked ? (
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                                  Desbloqueado
                                </Badge>
                              ) : (
                                <Badge variant="outline">Bloqueado</Badge>
                              )}
                            </div>
                            {achievement.unlocked ? (
                              <p className="text-xs text-muted-foreground mt-2">Desbloqueado em {achievement.date}</p>
                            ) : (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>Progresso</span>
                                  <span>
                                    {achievement.progress}/{achievement.max}
                                  </span>
                                </div>
                                <Progress value={(achievement.progress / achievement.max) * 100} className="h-1.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collection" className="mt-6">
              <Card className="border-purple-500/20">
                <CardHeader>
                  <CardTitle>Sua Coleção</CardTitle>
                  <CardDescription>Pelúcias que você ganhou</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {recentWins.map((win) => (
                      <Card key={win.id} className="overflow-hidden border-purple-500/10">
                        <div className="aspect-square relative">
                          <img
                            src={win.image || "/placeholder.svg"}
                            alt={win.prize}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{win.prize}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-muted-foreground">{win.machine}</p>
                            <p className="text-xs text-muted-foreground">{win.date}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Card className="overflow-hidden border-dashed border-purple-500/20 flex items-center justify-center aspect-square">
                      <div className="text-center p-4">
                        <Gift className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Ganhe mais pelúcias jogando</p>
                        <Button asChild className="mt-4 game-button">
                          <a href="/machines">Jogar Agora</a>
                        </Button>
                      </div>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver Coleção Completa
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="referrals" className="mt-6">
              <Card className="border-purple-500/20">
                <CardHeader>
                  <CardTitle>Convide Amigos</CardTitle>
                  <CardDescription>
                    Convide amigos e ganhe créditos quando eles se cadastrarem e fizerem a primeira jogada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Seu Link de Convite</h3>
                    <div className="flex gap-2">
                      <Input value={referralLink} readOnly className="bg-background/50" />
                      <Button variant="outline" onClick={copyReferralLink}>
                        {referralCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">R$10</p>
                        <p className="text-xs text-muted-foreground">Para você</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">R$10</p>
                        <p className="text-xs text-muted-foreground">Para seu amigo</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">∞</p>
                        <p className="text-xs text-muted-foreground">Convites ilimitados</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Amigos Convidados</h3>
                    {referrals.length > 0 ? (
                      <div className="space-y-4">
                        {referrals.map((referral) => (
                          <div key={referral.id} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">{referral.name}</p>
                              <p className="text-xs text-muted-foreground">Convidado em {referral.date}</p>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant="outline"
                                className={
                                  referral.status === "Ativo"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-yellow-500/10 text-yellow-500"
                                }
                              >
                                {referral.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">Bônus: {referral.bonus}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8 bg-muted/30 rounded-lg">
                        <p className="text-muted-foreground">Você ainda não convidou nenhum amigo</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 game-button">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartilhar no WhatsApp
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar por Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notificações
                    </CardTitle>
                    <CardDescription>Gerencie como você recebe notificações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Notificações por Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba emails sobre vitórias, promoções e atualizações
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-notifications">Notificações no App</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações push sobre novidades e promoções
                        </p>
                      </div>
                      <Switch
                        id="app-notifications"
                        checked={profileData.notifications.app}
                        onCheckedChange={(checked) => handleNotificationChange("app", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-notifications">Notificações de Marketing</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba ofertas exclusivas e novidades sobre nossos produtos
                        </p>
                      </div>
                      <Switch
                        id="marketing-notifications"
                        checked={profileData.notifications.marketing}
                        onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Privacidade
                    </CardTitle>
                    <CardDescription>Gerencie suas configurações de privacidade</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-stats">Mostrar Estatísticas</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que outros vejam suas estatísticas de jogo
                        </p>
                      </div>
                      <Switch
                        id="show-stats"
                        checked={profileData.privacy.showStats}
                        onCheckedChange={(checked) => handlePrivacyChange("showStats", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-history">Mostrar Histórico</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que outros vejam seu histórico de jogos recentes
                        </p>
                      </div>
                      <Switch
                        id="show-history"
                        checked={profileData.privacy.showHistory}
                        onCheckedChange={(checked) => handlePrivacyChange("showHistory", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
