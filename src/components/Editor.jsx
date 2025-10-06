// Editor.jsx - 新建/编辑文章表单
import { useState, useEffect } from "react";

export default function Editor({ onSave, initialTitle = "", initialContent = "" }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSave = () => {
    if (!title || !content) {
      alert("标题和内容不能为空！");
      return;
    }
    onSave({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 border rounded-lg shadow">
      <input
        type="text"
        placeholder="文章标题"
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="文章内容"
        className="w-full mb-4 p-2 border rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleSave}
      >
        保存文章
      </button>
    </div>
  );
}