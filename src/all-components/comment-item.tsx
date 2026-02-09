import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useAuth } from "../context/auth-context"
import { usePosts } from "../context/post-context"


type CommentItemProps = {
    postId: string
    comment: {
        id: string
        authorId: string
        authorName: string
        content: string
        createdAt: string
    }
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("tr-TR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    })

export const CommentItem = ({ postId, comment }: CommentItemProps) => {
    const { user } = useAuth()
    const { deleteComment } = usePosts()
    const navigate = useNavigate();

    return (
        <div className="flex items-start justify-between gap-3 border rounded p-4 bg-background">
            <div>
                <div className="flex items-center gap-2">
                    <span
                        className="font-semibold text-sm cursor-pointer hover:underline"
                        onClick={() => navigate(`/user/${comment.authorName}`)}
                    >
                        @{comment.authorName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                    </span>
                </div>

                <div className="text-sm text-gray-700">
                    {comment.content}
                </div>
            </div>

            {user?.id === comment.authorId && (
                <Button
                    variant="destructive"
                    size="xs"
                    onClick={() => deleteComment(postId, comment.id)}
                >
                    Sil
                </Button>
            )}
        </div>
    )
}
