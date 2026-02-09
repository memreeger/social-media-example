import { useAuth } from "../context/auth-context";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white shadow p-4 flex justify-between items-center">
            <div
                className="font-bold cursor-pointer"
                onClick={() => navigate("/")}
            >
                Social App
            </div>

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
                            onClick={() => navigate("/me")}
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
    );
}
