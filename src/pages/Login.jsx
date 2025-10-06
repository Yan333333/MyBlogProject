// Login.jsx - 用户登录/注册页面
import { useState } from "react";
import { saveUser, getUsers, setCurrentUser } from "../utils/storage";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("请输入用户名和密码！");
      return;
    }

    const users = getUsers();

    if (isRegister) {
      if (users.find((u) => u.username === username)) {
        alert("该用户名已存在！");
        return;
      }
      saveUser({ username, password });
      alert("注册成功，请登录！");
      setIsRegister(false);
    } else {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        alert("用户名或密码错误！");
        return;
      }

      setCurrentUser(user);
      alert(`欢迎回来，${user.username}！`);
      onLogin(user);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? "注册账户" : "用户登录"}
        </h2>

        <input
          type="text"
          placeholder="用户名"
          className="border rounded w-full p-2 mb-4 focus:outline-none focus:ring"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="密码"
          className="border rounded w-full p-2 mb-6 focus:outline-none focus:ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {isRegister ? "注册" : "登录"}
        </button>

        <p
          className="text-center mt-4 text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "已有账号？去登录" : "还没有账号？去注册"}
        </p>
      </form>
    </div>
  );
}
