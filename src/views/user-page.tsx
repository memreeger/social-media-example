import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useAuth } from "../context/auth-context"
import { usePosts } from "../context/post-context"
import { PostCard } from "../ui-components/post-card"

const UserPage = () => {
    const { user } = useAuth()
    const { posts } = usePosts()
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Lütfen giriş yap

                <Button className="ml-2" onClick={() => navigate("/")}> Anasayfaya dön.</Button>
                <Button className="ml-2" onClick={() => navigate("/login")}>Giriş yap.</Button>
            </div>
        )
    }

    const myPosts = posts.filter(
        (post) => post.authorId === user.id
    )

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-2xl mx-auto p-4 space-y-6">
                <h1 className="text-xl font-bold">
                    @{user.username} Postlarım
                </h1>

                {myPosts.length === 0 ? (
                    <p>Henüz postun yok</p>
                ) : (
                    myPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                )}
            </main>
        </div>
    )
}

export default UserPage
