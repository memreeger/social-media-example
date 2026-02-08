export type User = {
    id: string
    username: string
    email: string
    password: string
}




export type Comment = {
    id: string
    authorId: string
    authorName: string
    content: string
    createdAt: string
}

export type Post = {
    id: string
    authorId: string
    authorName: string
    content: string
    createdAt: string
    likes: string[]
    comments: Comment[]

}
