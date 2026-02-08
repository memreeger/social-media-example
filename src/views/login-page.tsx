import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            login(email, password);
                            navigate("/");
                        }}
                    >
                        Login
                    </Button>
                    <Button 
                    className="ml-2 bg-red-300 hover:bg-red-500"
                        onClick={() => navigate(-1)}
                    >
                        Geri Dön
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
