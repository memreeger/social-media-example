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

        // "loading" hissi için 600ms delay verdik
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
            <div
                className={`flex justify-end text-xs ${content.length > 180 ? "text-red-500" : "text-muted-foreground"
                    }`}
            >
                {content.length} / 200
            </div>
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    className="bg-blue-200"
                    onClick={submitPost}
                    disabled={!user || isLoading || content.length > 200}
                >
                    {isLoading ? "Gönderiliyor..." : "Post oluştur"}
                </Button>
            </div>
        </div>
    )
}
