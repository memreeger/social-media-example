import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context"
import type { Post } from "../types/types"

type PostContextType = {
  posts: Post[]
  visiblePosts: Post[]
  createPost: (content: string) => void
  toggleLike: (postId: string) => void
  deletePost: (postId: string) => void
  addComment: (postId: string, commentText: string) => void
  deleteComment: (postId: string, commentId: string) => void
  loadMore: () => void
  hasMore: boolean
}

const PostContext = createContext<PostContextType | null>(null)

const PAGE_SIZE = 10

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("posts")
    return saved ? JSON.parse(saved) : []
  })

  const [visiblePosts, setVisiblePosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)

  const hasMore = visiblePosts.length < posts.length

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    const end = user ? page * PAGE_SIZE : PAGE_SIZE
    setVisiblePosts(posts.slice(0, end))
  }, [posts, page, user])



  const createPost = (content: string) => {
    if (!user) return

    const newPost: Post = {
      id: crypto.randomUUID(),
      authorId: user.id,
      authorName: user.username,
      content,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
    }
    // yeni post atıldığı zaman ilk sayfaya dön
    setPosts((prev) => [newPost, ...prev])
    setPage(1)
  }

  const toggleLike = (postId: string) => {
    if (!user) return

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
            ...p,
            likes: p.likes.includes(user.id)
              ? p.likes.filter((id) => id !== user.id)
              : [...p.likes, user.id],
          }
          : p
      )
    )
  }

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }

  const addComment = (postId: string, commentText: string) => {
    if (!user) return

    const newComment = {
      id: crypto.randomUUID(),
      authorId: user.id,
      authorName: user.username,
      content: commentText,
      createdAt: new Date().toISOString(),
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    )
  }

  const deleteComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) }
          : p
      )
    )
  }

  const loadMore = () => {
    if (!user) {
      alert("daha fazlası için lütfen giriş yapın")
      
      return
    }
    if (!hasMore) return
    setPage((p) => p + 1)
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        visiblePosts,
        createPost,
        toggleLike,
        deletePost,
        addComment,
        deleteComment,
        loadMore,
        hasMore,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePosts = () => {
  const context = useContext(PostContext)
  if (!context) throw new Error("usePosts must be used within PostProvider")
  return context
}
