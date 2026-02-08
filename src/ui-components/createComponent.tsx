import { useState } from "react"
import { usePosts } from "../context/post-context"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { useAuth } from "../context/auth-context"

export const CreatePost = () => {
    const { createPost } = usePosts()
    const { user } = useAuth();
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const submitPost = async () => {
        if (!content.trim()) return

        setIsLoading(true)

        // Burada gerçek backend yok, ama "loading" hissi için 600ms delay
        await new Promise((resolve) => setTimeout(resolve, 600))

        createPost(content)
        setContent("")
        setIsLoading(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            submitPost()
        }
    }

    return (
        <div className="p-4 space-y-3">
            <Textarea
                className="w-full resize-none bg-white hover:border-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={user ? "Ne düşünüyorsun" : "Post oluşturmak için giriş yapınız."}
                disabled={!user || isLoading}
            />

            <div className="flex justify-end">
                <Button
                    variant="outline"
                    className="bg-blue-200"
                    onClick={submitPost}
                    disabled={!user || isLoading}
                >
                    {isLoading ? "Gönderiliyor..." : "Post oluştur"}
                </Button>
            </div>
        </div>
    )
}
