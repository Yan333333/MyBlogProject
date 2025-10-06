// CreatePost.jsx - 创建文章页面
import Header from "../components/Header";
import Editor from "../components/Editor";
import { addPost, getPosts } from "../utils/storage";
import { useState, useEffect } from "react";

export default function CreatePost({ onBack, currentUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const allPosts = getPosts();
    // 只保留当前用户的文章
    const myPosts = allPosts.filter((p) => p.author === currentUser.username);
    setPosts(myPosts);
  }, [currentUser]);

  const handleSave = (post) => {
    addPost({ ...post, author: currentUser.username, comments: [] }); // 加上作者
    setPosts(getPosts());
    alert("文章保存成功！");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50">
      <Header />

      {/* 返回首页按钮固定在 Header 下方 */}
      <div className="fixed top-16 left-0 right-0 w-full p-4 flex justify-between z-40 bg-gray-50 shadow">
        <button
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
          onClick={onBack}
        >
          返回首页
        </button>
      </div>

      {/* 页面内容 */}
      <main className="flex-1 mt-32 p-4 max-w-3xl mx-auto overflow-auto">
        <Editor onSave={handleSave} />

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">已有文章预览</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500">暂无文章</p>
          ) : (
            posts.map((post, index) => (
              <div
                key={index}
                className="border p-3 rounded mb-3 shadow hover:shadow-md"
              >
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}