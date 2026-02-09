import { createContext, useContext, useState } from "react"
import type { User } from "../types/types"

type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => void
    register: (username: string, email: string, password: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("currentUser") || "null")
    )

    const login = (email: string, password: string) => {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
        const found = users.find(
            u => u.email === email && u.password === password
        )
        if (!found) {
            alert("hatalı giriş yaptınız tekrar deneyiniz")
            throw new Error("Hatalı giriş")
        }

        localStorage.setItem("currentUser", JSON.stringify(found))
        setUser(found)
    }

    const register = (username: string, email: string, password: string) => {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
        const newUser: User = {
            id: crypto.randomUUID(),
            username,
            email,
            password,
        }
        localStorage.setItem("users", JSON.stringify([...users, newUser]))
        localStorage.setItem("currentUser", JSON.stringify(newUser))
        setUser(newUser)
    }

    const logout = () => {
        localStorage.removeItem("currentUser")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)!
