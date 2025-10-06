import { useState, useEffect } from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import EditPost from "./pages/EditPost";
import {
  getPosts,
  getCurrentUser,
  logoutUser,
  getUsers,
} from "./utils/storage";

function App() {
  const [page, setPage] = useState("home"); // 当前显示页面：home/create/detail
  const [selectedIndex, setSelectedIndex] = useState(null); // 文章索引，用于详情页
  const [currentUser, setCurrentUser] = useState(null); // 当前登录用户

  
  // 初始化：检测是否已有登录用户
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setPage("login");
    }
  }, []);

  // 点击文章卡片查看详情
  const handleViewPost = (index) => {
    setSelectedIndex(index);
    setPage("detail");
  };

  // 在 CreatePost 完成新建文章后，返回首页
  const handleBackHome = () => {
    setPage("home");
  };

  // 首页显示的文章列表，用于传给 Home 页面
  const posts = getPosts();

    const handleCreate = () => {
    setPage("create");
  };

  // 登录成功
  const handleLogin = (user) => {
    setCurrentUser(user);
    setPage("home");
  };

  // 登出
  const handleLogout = () => {
    if (window.confirm("确定要退出登录吗？")) {
      logoutUser();
      setCurrentUser(null);
      setPage("login");
    }
  };

  const handleEditPost = (index) => {
    setSelectedIndex(index);
    setPage("edit");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 overflow-hidden">
      {page === "login" && <Login onLogin={handleLogin} />}

      {page === "home" && currentUser && (
        <Home
          posts={posts}
          onCreate={handleCreate}
          onViewPost={handleViewPost}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {page === "create" && currentUser && (
        <CreatePost onBack={handleBackHome} currentUser={currentUser} />
      )}

      {page === "detail" && selectedIndex !== null && (
        <PostDetail
          index={selectedIndex}
          onBack={handleBackHome}
          currentUser={currentUser}
          onEdit={handleEditPost}
        />
      )}

      {page === "edit" && selectedIndex !== null && currentUser && (
        <EditPost
          index={selectedIndex}
          onBack={handleBackHome}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default App;