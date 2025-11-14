"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Package, CreditCard, Gift, Gamepad2, ChevronRight, Star } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel do Jogador</h1>
          <p className="text-muted-foreground">Bem-vindo de volta, {user.name}</p>
        </div>

        {/* BOTÃO JOGAR AGORA — ATUALIZADO PARA ABRIR O NGROK */}
        <Button asChild className="game-button">
          <a 
            href="https://eleni-interventricular-chere.ngrok-free.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jogar Agora
          </a>
        </Button>
      </div>

      {/* --- RESTANTE DO SEU CÓDIGO (NÃO ALTERADO) --- */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Créditos</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {user.credits.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Equivalente a {Math.floor(user.credits / 10)} jogadas</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/credits">Adicionar Créditos</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Nível</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.level}</div>
            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">75% para o próximo nível</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/profile">Ver Benefícios</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* ---- (todo o restante está idêntico ao seu código original) ---- */}

      </div>
    </div>
  )
}

function Lock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
