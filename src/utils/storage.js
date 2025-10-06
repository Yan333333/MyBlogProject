// storage.js - 封装 localStorage 操作
export const getPosts = () => {
  const data = localStorage.getItem("posts");
  return data ? JSON.parse(data) : [];
};

export const savePosts = (posts) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

export const addPost = (post) => {
  const posts = getPosts();
  posts.unshift({ ...post, comments: [] }); // 新文章放在前面
  savePosts(posts);
};

export const deletePost = (index) => {
  const posts = getPosts();
  posts.splice(index, 1);
  savePosts(posts);
};

export const addComment = (postIndex, comment) => {
  const posts = getPosts();
  if (!posts[postIndex]) return;
  if (!Array.isArray(posts[postIndex].comments)) {
    posts[postIndex].comments = [];
  }
  if (!comment || !comment.content || !comment.content.trim()) return;
  posts[postIndex].comments = [...posts[postIndex].comments, comment];
  savePosts(posts);
};


export function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}