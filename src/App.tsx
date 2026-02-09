// import Navbar from "./ui-components/navbar"
// import { PostCard } from "./ui-components/post-card"
// import { usePosts } from "./context/post-context"
// import type { Post } from "./types/types"
// import { CreatePost } from "./ui-components/createComponent"
// import { Button } from "./components/ui/button"

// function App() {
//   const { visiblePosts, loadMore, hasMore } = usePosts()

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <main className="max-w-2xl mx-auto p-4 space-y-6">
//         <CreatePost />

//         {visiblePosts.map((post: Post) => (
//           <PostCard key={post.id} post={post} />
//         ))}

//         {hasMore ? (
//           <div className="flex justify-center">
//             <Button onClick={loadMore}>Daha Fazla Yükle</Button>
//           </div>
//         ) : <div className="animate-bounce flex justify-center"> Sona Ulaştınız </div>}
//       </main>
//     </div>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home-page";
import Login from "./views/login-page";
import Register from "./views/register-page";
import Navbar from "./ui-components/navbar";
import UserProfilePage from "./views/user-profile-page";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="user/:username" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

