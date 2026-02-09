import Navbar from "../ui-components/navbar";
import { PostCard } from "../ui-components/post-card";
import { CreatePost } from "../ui-components/createComponent";
import { usePosts } from "../context/post-context";
import type { Post } from "../types/types";
import { Button } from "../components/ui/button";

export default function Home() {
    const { visiblePosts, loadMore, hasMore } = usePosts();

    return (
        <div className="min-h-screen bg-gray-100">
            

            <main className="max-w-2xl mx-auto p-4 space-y-6">
                <CreatePost />

                {visiblePosts.map((post: Post) => (
                    <PostCard key={post.id} post={post} />
                ))}

                {hasMore ? (
                    <div className="flex justify-center">
                        <Button onClick={loadMore}>Daha Fazla Yükle</Button>
                    </div>
                ) : (<div className="flex justify-center"> Sona ulaştınız. </div>)}
            </main>
        </div>
    );
}
