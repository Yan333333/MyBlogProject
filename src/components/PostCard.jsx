// PostCard.jsx - 文章卡片组件
export default function PostCard({ title, content }) {
  return (
    <div className="border p-4 rounded-lg shadow mb-4 hover:shadow-lg transition duration-200">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}