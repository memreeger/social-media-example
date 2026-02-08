import { useAuth } from "../context/auth-context";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white shadow p-4 flex justify-between">
            <div className="font-bold">Social App</div>

            <div className="flex gap-2">
                {!user ? (
                    <>
                        <Button variant="outline" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                        <Button onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </>
                ) : (
                    <Button variant="destructive" onClick={() => logout()}>
                        Logout
                    </Button>
                )}
            </div>
        </div>
    );
}
