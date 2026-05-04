import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ChatPage from "./Pages/ChatPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatPage />} />
  
        
      </Routes>
    </BrowserRouter>
  );
}