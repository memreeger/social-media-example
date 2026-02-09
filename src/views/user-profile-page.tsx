import { useParams } from "react-router-dom"
import { usePosts } from "../context/post-context"
import { PostCard } from "../all-components/post-card"

const UserProfilePage = () => {
    const { username } = useParams()
    const { posts } = usePosts()

    if (!username) {
        return <p>Kullanıcı bulunamadı</p>
    }

    const userPosts = posts.filter(
        (post) =>
            post.authorName.toLowerCase() === username.toLowerCase()
    )

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-2xl mx-auto p-4 space-y-6">
                <h1 className="text-xl font-bold">@{username} adlı kullanıcının postları</h1>

                {userPosts.length === 0 ? (
                    <p>Bu kullanıcının henüz postu yok</p>
                ) : (
                    userPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                )}
            </main>

        </div>
    )
}

export default UserProfilePage
