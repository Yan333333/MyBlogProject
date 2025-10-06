// PostDetail.jsx - 文章详情页
import Header from "../components/Header";
import { getPosts, savePosts, addComment } from "../utils/storage";
import { useState, useEffect } from "react";

export default function PostDetail({ index, onBack, currentUser, onEdit }) {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const allPosts = getPosts();
    setPosts(allPosts);

    if (index != null &&  allPosts[index]) {
      const p = allPosts[index];
      if (!p.comments) p.comments = [];
      setPost(p);
    } else {
      setPost(null);
    }
  }, [index]);

  const handleDelete = () => {
    if (!window.confirm("确定要删除这篇文章吗？")) return;

    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    savePosts(updatedPosts);
    alert("文章已删除！");
    setPost(null);
    setPosts(updatedPosts);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return; // 空评论不提交
    if (!currentUser || !currentUser ||index == null) return;

    const newComment = {
      author: currentUser.username,
      content: commentText,
      time: new Date().toLocaleString(),
    };

    // 从 localStorage 重新获取最新数据，防止重复或丢失
    const updatedPosts = getPosts();
    if (!updatedPosts[index].comments) updatedPosts[index].comments = [];
    updatedPosts[index].comments.push(newComment);

    savePosts(updatedPosts);
    
    setPosts(updatedPosts);
    setPost(updatedPosts[index]);

    setCommentText(""); // 清空输入框
  };

  const handleDeleteComment = (commentIndex) => {
    if (!window.confirm("确定要删除这条评论吗？")) return;
    const updatedPosts = [...posts];
    const updatedPost = { ...updatedPosts[index] };

    updatedPost.comments = updatedPost.comments.filter(
      (_, i) => i !== commentIndex
    );

    updatedPosts[index] = updatedPost;
    savePosts(updatedPosts);
    setPosts(updatedPosts);
    setPost(updatedPost);
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* 返回首页按钮固定 */}
      <div className="fixed top-16 left-0 right-0 w-full p-4 flex justify-between z-40 bg-gray-50 shadow">
        <button
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
          onClick={onBack}
        >
          返回首页
        </button>
      </div>

      <main className="mt-32 p-4 max-w-3xl mx-auto overflow-auto h-[calc(100vh-8rem)]">
        {post ? (
          <>
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-4">作者: {post.author}</p>
            <p className="text-gray-800 mb-6 whitespace-pre-line">{post.content}</p>
            {/* 仅作者可见的删除按钮 */}
            {currentUser && currentUser.username === post.author && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                删除文章
              </button>
            )}
            {/* 仅作者可见的编辑按钮 */}
            {currentUser && currentUser.username === post.author && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-2"
                onClick={() => onEdit(index)}
              >
                编辑文章
              </button>
            )}
           

             {/* 评论区 */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">评论</h2>
                {post.comments.length === 0 ? (
                  <p className="text-gray-500">暂无评论</p>
                ) : (
                  post.comments.map((cmt, i) => (
                    <div
                      key={i}
                      className="border p-2 rounded mb-2 bg-gray-100 relative"
                    >
                      <p className="text-gray-700 whitespace-pre-line">{cmt.content}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {cmt.author} · {cmt.time}
                      </p>

                      {/* 评论删除按钮 — 仅评论作者可见 */}
                      {currentUser && currentUser.username === cmt.author && (
                        <button
                          className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
                          onClick={() => handleDeleteComment(i)}
                        >
                          删除
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* 添加评论输入框 */}
              {currentUser && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border p-2 rounded"
                    placeholder="写下你的评论..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={handleAddComment}
                  >
                    发送
                  </button>
                </div>
              )}

          </>
        ) : (
          <p className="text-gray-500 text-center mt-10">文章不存在或已被删除</p>
        )}
      </main>
    </div>
  );
}