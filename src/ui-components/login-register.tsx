import { useState } from "react"
import { useAuth } from "../context/auth-context"

export const LoginRegister = () => {
    const { login, register } = useAuth()
    const [mode, setMode] = useState<"login" | "register">("login")

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">
                    {mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
                </h2>

                {mode === "register" && (
                    <input
                        className="w-full border p-2 rounded mb-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Kullanıcı adı"
                    />
                )}

                <input
                    className="w-full border p-2 rounded mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    className="w-full border p-2 rounded mb-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre"
                />

                <button
                    className="w-full bg-blue-500 text-white p-2 rounded mt-2"
                    onClick={() => {
                        try {
                            if (mode === "login") {
                                login(email, password)
                            } else {
                                register(username, email, password)
                            }
                        } catch (err: any) {
                            alert(err.message)
                        }
                    }}
                >
                    {mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
                </button>

                <div className="mt-4 text-center">
                    <button
                        className="text-blue-500 underline"
                        onClick={() => setMode(mode === "login" ? "register" : "login")}
                    >
                        {mode === "login"
                            ? "Hesabın yok mu? Kayıt ol"
                            : "Zaten hesabın var mı? Giriş yap"}
                    </button>
                </div>
            </div>
        </div>
    )
}
