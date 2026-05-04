import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5200/api",
  withCredentials: true
});

// Chat endpoints
export const chatAPI = {
  listChats: () => api.get("/chat/list"),
  createChat: (title) => api.post("/chat/create", { title }),
  sendMessage: (chatId, message) => api.post("/chat/send", { chatId, message }),
  updateChatTitle: (chatId, title) => api.put(`/chat/${chatId}/title`, { title }),
  deleteChat: (chatId) => api.delete(`/chat/${chatId}`),
  getChat: (chatId) => api.get(`/chat/${chatId}`),
};

// Auth endpoints
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  signup: (email, password) => api.post("/auth/signup", { email, password }),
  logout: () => api.post("/auth/logout"),
  getCurrentUser: () => api.get("/auth/me"),
};

export default api;
