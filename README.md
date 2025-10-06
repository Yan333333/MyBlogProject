# iBlog 项目说明文档

## 1. 项目概述

iBlog 是一个基于 **React + Vite** 的个人博客管理系统。
 主要功能包括：

- 用户注册、登录、登出
- 创建、编辑、删除文章
- 查看文章列表和文章详情
- 文章评论功能（评论可删除，仅评论作者可操作）
- 个人信息查看功能
- 前端页面自适应电脑屏幕大小

项目旨在帮助个人记录和管理文章，并提供基础的用户权限控制。

------

## 2. 技术栈

- **前端框架**：React 18
- **构建工具**：Vite
- **状态管理**：React Hooks（useState, useEffect）
- **本地存储**：浏览器 LocalStorage
- **样式**：TailwindCSS
- **语言**：JavaScript（ES6+）

------

## 3. 项目主要结构

```
iBlog/
│
├─ public/                # 静态资源
├─ src/
│   ├─ components/        # 可复用组件（Header, PostCard, Editor）
│   ├─ pages/             # 页面组件（Home, CreatePost, PostDetail, EditPost, Login）
│   ├─ utils/             # 工具函数（storage.js）
│   ├─ App.jsx            # 应用入口
│   └─ main.jsx           # React 渲染入口
├─ package.json           # 项目依赖和脚本
├─ package-lock.json
└─ README.md              # 项目说明文档
```

------

## 4. 功能说明

### 4.1 用户管理

- 注册新用户、登录、登出
- 当前用户信息保存在 LocalStorage 中
- 用户登录后才能创建文章、评论或修改自己的文章

### 4.2 文章管理

- 创建文章：标题 + 内容，支持多行文本
- 编辑文章：仅限文章作者
- 删除文章：仅限文章作者
- 文章列表页：显示所有文章或仅显示当前用户文章（视需求）
- 文章详情页：显示标题、内容、作者、评论
- 评论功能：用户可对文章评论，评论可删除仅限评论作者

### 4.3 页面布局与交互

- 所有页面自适应电脑屏幕宽高
- “新建文章”按钮固定在左上角，“个人信息”按钮固定在右上角
- 文章详情页的删除/编辑按钮仅对作者可见
- 评论区显示所有评论，评论删除按钮仅对评论作者可见

------

## 5. 数据存储说明

所有数据均保存在浏览器 **LocalStorage** 中：

- `posts`：文章数组，每篇文章包含：

  ```js
  {
    title: string,
    content: string,
    author: string,
    comments: [
      {
        author: string,
        content: string,
        time: string
      }
    ]
  }
  ```

- `users`：用户数组，每个用户包含：

  ```js
  {
    username: string,
    password: string
  }
  ```

- `currentUser`：当前登录用户信息

工具函数封装在 `src/utils/storage.js`：

- 获取/保存文章：`getPosts()`, `savePosts(posts)`
- 新建文章：`addPost(post)`
- 删除文章：`deletePost(index)`
- 用户注册/登录/登出：`saveUser(user)`, `getCurrentUser()`, `logoutUser()`
- 添加评论：`addComment(postIndex, comment)`

------

## 6. 运行说明

### 6.1 环境要求

- Node.js >= 18
- npm 或 yarn

### 6.2 安装依赖

```bash
npm install
```

### 6.3 启动开发环境

```bash
npm run dev
```

访问浏览器显示本地页面（默认端口 `5173`）

### 6.4 构建生产环境

```bash
npm run build
```

生成 `dist` 文件夹，可用于部署

------

## 7. 注意事项

1. 项目数据仅保存在浏览器 LocalStorage，刷新浏览器或清除缓存会丢失数据。
2. 评论、文章操作均有权限判断：**仅作者可操作自己的内容**
3. 如果使用浏览器自动翻译，可能会导致页面渲染异常，建议关闭翻译。
4. 项目仅针对电脑端进行了适配，不保证移动端显示效果。

------

## 8. 接手建议

- 熟悉 `src/utils/storage.js` 的数据存储逻辑
- 查看 `pages` 下的页面组件，理解页面跳转逻辑（`App.jsx` 控制）
- TailwindCSS 用于布局和样式，可根据需要调整
- 评论和文章功能都有权限控制，接手后可扩展其他权限功能