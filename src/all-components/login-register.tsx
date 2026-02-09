import { useState } from "react"
import { useAuth } from "../context/auth-context"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"

export const LoginRegister = () => {
    const { login, register } = useAuth()
    const [mode, setMode] = useState<"login" | "register">("login")

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (mode === "login") {
                login(email, password)
            } else {
                register(username, email, password)
            }
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        {mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
                    </CardTitle>
                    <CardDescription>
                        {mode === "login"
                            ? "Hesabına giriş yap"
                            : "Yeni bir hesap oluştur"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {mode === "register" && (
                            <div className="space-y-2">
                                <Label>Kullanıcı Adı</Label>
                                <Input
                                    placeholder="cemmi"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="cemmi@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Şifre</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            {mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
                        </Button>
                    </form>

                    <div className="mt-4 text-center text-sm">
                        <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() =>
                                setMode(mode === "login" ? "register" : "login")
                            }
                        >
                            {mode === "login"
                                ? "Hesabın yok mu? Kayıt ol"
                                : "Zaten hesabın var mı? Giriş yap"}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
