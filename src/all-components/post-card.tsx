import { useState } from "react"
import { useAuth } from "../context/auth-context"
import { usePosts } from "../context/post-context"
import type { Post } from "../types/types"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { CommentInput } from "./comment-input"
import { CommentItem } from "./comment-item"

type PostCardProps = {
  post: Post
}

const formatDate = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const PostCard = ({ post }: PostCardProps) => {
  const { toggleLike, deletePost, addComment, deleteComment } = usePosts()
  const { user } = useAuth()
  const navigate = useNavigate();

  const [comment, setComment] = useState("")
  const [showComments, setShowComments] = useState(false)

  const handleCommentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (!comment.trim()) return
      addComment(post.id, comment)
      setComment("")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {post.authorName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col leading-tight">
            <CardTitle className="text-base font-semibold cursor-pointer hover:underline"
              onClick={() => navigate(`/user/${post.authorName}`)}
            >
              @{post.authorName}
            </CardTitle>
            <CardDescription className="text-xs">
              {formatDate(post.createdAt)}
            </CardDescription>
          </div>
        </div>

        {user?.id === post.authorId && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deletePost(post.id)}
          >
            Postu Sil
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-sm text-gray-800">{post.content}</div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm" // 
            onClick={() => toggleLike(post.id)}
            disabled={!user}
          >
            ❤️ {post.likes.length}
          </Button>

          <Button
            variant="outline"
            size="sm" // 
            onClick={() => setShowComments((prev) => !prev)}
          >
            💬 {post.comments.length}
          </Button>
        </div>

        {showComments && (
          <>
            <Separator />

            <div className="ml-6 space-y-3">
              <CommentInput postId={post.id} />

              <div className="space-y-2 ml-10">
                {post.comments.map((c) => (
                  <CommentItem
                    key={c.id}
                    postId={post.id}
                    comment={c}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
