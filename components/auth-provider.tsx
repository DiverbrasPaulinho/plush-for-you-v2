"use client"

import { useContext } from "react"

import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage or session
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      // This would be replaced with a real API call
      // Simulating API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const userData = {
        id: "user_123",
        name: "Usuário Demo",
        email: email,
        image: null,
        credits: 100,
        level: 5,
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      })

      return true
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha no login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name, email, password) => {
    try {
      setIsLoading(true)
      // This would be replaced with a real API call
      // Simulating API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      const userData = {
        id: "user_" + Date.now(),
        name: name,
        email: email,
        image: null,
        credits: 50, // Bonus credits for new users
        level: 1,
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao Plush For You.",
      })

      return true
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha no registro",
        description: error.message || "Tente novamente mais tarde.",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
