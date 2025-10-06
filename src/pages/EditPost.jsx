// EditPost.jsx - 编辑文章页面
import Header from "../components/Header";
import Editor from "../components/Editor";
import { getPosts, savePosts } from "../utils/storage";
import { useState, useEffect } from "react";

export default function EditPost({ index, onBack, currentUser }) {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const allPosts = getPosts();
    setPosts(allPosts);

    if (allPosts[index]) {
      setPost(allPosts[index]);
    } else {
      setPost(null);
    }
  }, [index]);

  const handleSave = (updatedPost) => {
    if (!post) return;

    if (post.author !== currentUser.username) {
      alert("您无权修改这篇文章！");
      return;
    }

    const updatedPosts = [...posts];
    updatedPosts[index] = {
      ...updatedPosts[index],
      title: updatedPost.title,
      content: updatedPost.content,
    };

    savePosts(updatedPosts);
    alert("文章已更新！");
    onBack();
  };

  if (!post) {
    return (
      <div>
        <Header />
        <main className="p-4 text-center text-gray-500">
          文章不存在或已被删除
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen relative bg-gray-50">
      <Header />

      {/* 返回首页按钮固定 */}
      <div className="fixed top-16 w-full max-w-3xl mx-auto p-4 flex justify-start z-40 bg-gray-50 shadow">
        <button
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
          onClick={onBack}
        >
          返回首页
        </button>
      </div>

      <main className="mt-32 p-4 max-w-3xl mx-auto overflow-auto h-[calc(100vh-8rem)]">
        <h1 className="text-2xl font-bold mb-4">编辑文章</h1>
        {/* 传入初始值 */}
        <Editor
          onSave={handleSave}
          initialTitle={post.title}
          initialContent={post.content}
        />
      </main>
    </div>
  );
}
