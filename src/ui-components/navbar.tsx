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
        <div className="w-full bg-white shadow p-4 flex justify-between items-center gap-4">


            <span
                className="font-bold cursor-pointer"
                onClick={() => navigate("/")}
            >
                Social App
            </span>

            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                >
                    🏠 Home
                </Button>


            </div>

            <div className="flex items-center gap-2 w-full max-w-sm">
                <Input
                    placeholder="Kullanıcı ara..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch()
                    }}
                />
                <Button
                    variant="outline"
                    onClick={handleSearch}
                >
                    Ara
                </Button>
            </div>

            {/* RIGHT */}
            <div className="flex gap-2 items-center">
                {!user ? (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                        <Button onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </>
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
    )
}
