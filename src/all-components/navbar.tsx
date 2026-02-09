import { useAuth } from "../context/auth-context"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    const handleSearch = () => {
        if (!query.trim()) return
        navigate(`/user/${query.trim()}`)
        setQuery("")
    }

    return (
        <header className="w-full bg-white shadow p-4">
            <div className="max-w-6xl mx-auto flex items-center gap-4">

                {/* SOL: Logo + Home */}
                <div className="flex items-center gap-4">
                    <span
                        className="font-bold text-lg cursor-pointer hover:underline"
                        onClick={() => navigate("/")}
                    >
                        Social App
                    </span>
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className="hidden sm:inline-flex"
                    >
                        🏠 Home
                    </Button>
                </div>

                {/* ORTA: Search Bar */}
                <div className="flex-1 max-w-md">
                    <div className="flex gap-2">
                        <Input
                            placeholder={user ? "Kullanıcı ara..." : "Giriş yapınca arama yapabilirsin"}
                            disabled={!user}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <Button
                            variant="outline"
                            onClick={handleSearch}
                            disabled={!user || !query.trim()}
                        >
                            Ara
                        </Button>
                    </div>
                </div>

                {/* SAĞ: Auth Buttons */}
                <div className="flex items-center gap-2 ml-auto">
                    {!user ? (
                        <Button variant="outline" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/user/${user.username}`)}
                            >
                                Profilim
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
