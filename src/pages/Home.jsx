import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { useState } from "react";

export default function Home({ posts, onCreate, onViewPost, onLogout, currentUser }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50">
      <Header />

       {/* 顶部按钮区 */}
      <div className="fixed top-16 left-0 right-0 w-full p-4 flex justify-between z-40 bg-gray-50 shadow">
        <div className="flex gap-2">
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
            onClick={onCreate}
          >
            新建文章
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            onClick={() => setShowProfile(true)}
          >
            个人信息
          </button>
        </div>

        <div className="flex gap-2">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          onClick={onLogout}
        >
          退出登录
        </button>
        </div>
      </div>

      {/* 文章列表容器 */}
      <main className="flex-1 p-4 max-w-5xl mx-auto overflow-auto mt-32">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">暂无文章</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="border p-3 rounded mb-3 shadow hover:shadow-md cursor-pointer"
              onClick={() => onViewPost(index)}
            >
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
            </div>
          ))
        )}
      </main>

      {/* 个人信息弹窗 */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">个人信息</h2>
            <p><strong>用户名:</strong> {currentUser.username}</p>
            <p><strong>密码:</strong> {currentUser.password}</p>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              onClick={() => setShowProfile(false)}
            >
              关闭
            </button>
          </div>
        </div>
      )}

    </div>
  );
}