import { useState } from "react"
import { useAuth } from "../context/auth-context"
import { usePosts } from "../context/post-context"
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button"

type Props = {
    postId: string
}

export const CommentInput = ({ postId }: Props) => {
    const { user } = useAuth()
    const { addComment } = usePosts()
    const [comment, setComment] = useState("")

    const submit = () => {
        if (!comment.trim()) return
        addComment(postId, comment)
        setComment("")
    }

    return (
        <div className="border rounded p-3 bg-muted">
            <Textarea
                placeholder="Yorum yaz..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        submit()
                    }
                }}
                disabled={!user}
            />

            <div className="flex justify-end mt-2">
                <Button size="xs" onClick={submit} disabled={!user}>
                    Yorum yap
                </Button>
            </div>
        </div>
    )
}
