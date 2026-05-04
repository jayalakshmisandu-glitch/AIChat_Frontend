import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chatAPI, authAPI } from "../Services/api";
import Sidebar from "../Components/Sidebar";
import MessageBubble from "../Components/MessageBubble";
import InputBox from "../Components/InputBox";

export default function ChatPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load chats on component mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await chatAPI.listChats();
        const chats = response.data.chats;
        setSessions(chats);
        
        // Set active session to the first chat or create one
        if (chats.length > 0) {
          setActiveSessionId(chats[0].id);
          await loadChat(chats[0].id);
        } else {
          const newChat = await chatAPI.createChat("New Chat");
          setSessions([newChat.data.chat]);
          setActiveSessionId(newChat.data.chat.id);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
        // Create a new chat if loading fails
        try {
          const newChat = await chatAPI.createChat("New Chat");
          setSessions([newChat.data.chat]);
          setActiveSessionId(newChat.data.chat.id);
        } catch (e) {
          console.error("Failed to create new chat:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);
   useEffect(() => {
    setIsLoadingResponse(false);
  }, [activeSessionId]);

  const activeSessionIndex = sessions.findIndex((session) => session.id === activeSessionId);
  const activeSession = sessions[activeSessionIndex] ?? sessions[0];
  const messages = activeSession?.messages ?? [];

  const updateActiveSession = (updater) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== activeSessionId) return session;

        if (typeof updater === "function") {
          return updater(session);
        }

        return { ...session, ...updater };
      })
    );
  };

  const handleNewChat = async () => {
    try {
       setIsLoadingResponse(false);
      const response = await chatAPI.createChat("New Chat");
      const newChat = response.data.chat;
      setSessions((prev) => [newChat, ...prev]);
      setActiveSessionId(newChat.id);
    } catch (error) {
      console.error("Failed to create new chat:", error);
      alert("Failed to create new chat");
    }
  };

  const handleSelectSession = async (id) => {
     setIsLoadingResponse(false);
    setActiveSessionId(id);
    await loadChat(id);
  };

  const handleDeleteChat = async (chatId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      try {
        await chatAPI.deleteChat(chatId);
        setSessions((prev) => prev.filter((session) => session.id !== chatId));
        
        if (activeSessionId === chatId) {
          if (sessions.length > 1) {
            const nextSession = sessions.find((s) => s.id !== chatId);
            setActiveSessionId(nextSession.id);
          } else {
            handleNewChat();
          }
        }
      } catch (error) {
        console.error("Failed to delete chat:", error);
        alert("Failed to delete chat");
      }
    }
  };

  const normalizeChatResponse = (data) => {
    const chat = data.chat ?? data;
    const messages = chat.messages ?? data.messages ?? [];
    return { ...chat, messages };
  };

  const loadChat = async (chatId) => {
    try {
      const response = await chatAPI.getChat(chatId);
      const chat = normalizeChatResponse(response.data);
      setSessions((prev) =>
        prev.map((session) => (session.id === chatId ? { ...session, ...chat } : session))
      );
    } catch (error) {
      console.error("Failed to load chat:", error);
    }
  };

  const handleRenameChat = async (chatId, newTitle) => {
    try {
      await chatAPI.updateChatTitle(chatId, newTitle);
      setSessions((prev) =>
        prev.map((session) =>
          session.id === chatId ? { ...session, title: newTitle } : session
        )
      );
    } catch (error) {
      console.error("Failed to rename chat:", error);
      alert("Failed to rename chat");
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } finally {
      navigate("/");
    }
  };

  const sendMessage = async (text) => {
    const trimmed = text?.trim();
    if (!trimmed || !activeSessionId) return;

    const userMessage = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];

    // add user message immediately
    updateActiveSession({
      messages: newMessages,
      lastMessage: trimmed,
    });

    setIsLoadingResponse(true);

    try {
      const res = await chatAPI.sendMessage(activeSessionId, trimmed);
      const full = res.data.response;

      // update title if first message
      if (activeSession?.title === "New Chat") {
        const newTitle = trimmed.slice(0, 20);

        await chatAPI.updateChatTitle(activeSessionId, newTitle);

        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSessionId ? { ...s, title: newTitle } : s
          )
        );
      }

      // STREAMING
      let aiText = "";

      updateActiveSession((session) => ({
        ...session,
        messages: [...newMessages, { role: "ai", content: "" }],
      }));

      for (let i = 0; i < full.length; i++) {
        aiText += full[i];

        updateActiveSession((session) => {
          const updated = [...session.messages];

          updated[updated.length - 1] = {
            role: "ai",
            content: aiText,
          };

          return {
            ...session,
            messages: updated,
            lastMessage: aiText,
          };
        });

        await new Promise((r) => setTimeout(r, 15));
      }

      setIsLoadingResponse(false);
    } catch (error) {
      console.error("Chat send failed", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send message";

      updateActiveSession({
        messages: [...newMessages, { role: "ai", text: `Error: ${message}` }],
        lastMessage: `Error: ${message}`,
      });

      setIsLoadingResponse(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          <p className="text-sm text-zinc-400">Loading your chats...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-zinc-900">
    
    {/* Sidebar */}
    <Sidebar
      sessions={sessions}
      activeSessionId={activeSessionId}
      onNewChat={handleNewChat}
      onSelectSession={handleSelectSession}
      onLogout={handleLogout}
      onDeleteChat={handleDeleteChat}
      onRenameChat={handleRenameChat}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />

    {/* Main */}
    <main className="flex-1 flex flex-col bg-white">

      {/* Header */}
      <header className="flex h-16 items-center justify-between px-6 border-b border-gray-200 shadow-sm bg-white">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8.5 12H15.5M12 8.5V15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>

          {/* 🔥 FIXED TITLE */}
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">
              Gemini AI
            </h1>
            <p className="text-xs text-gray-500">
              Smart assistant
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={handleLogout}
          className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90 transition"
        >
          Logout
        </button>
      </header>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-10">

          {messages.length === 0 && !isLoadingResponse && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg text-white">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                  <path d="M5 7.5C5 6.12 6.12 5 7.5 5H16.5C17.88 5 19 6.12 19 7.5V13.5C19 14.88 17.88 16 16.5 16H11L7 19V16H7.5C6.12 16 5 14.88 5 13.5V7.5Z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                How can I help?
              </h2>

              <p className="text-gray-500 max-w-md">
                Start a conversation or select a chat from sidebar.
              </p>
            </div>
          )}

          <div className="space-y-6">
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} />
            ))}

            {isLoadingResponse && (
              <div className="flex items-center gap-3 text-gray-500">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                </div>
                <span className="text-sm"> thinking...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <InputBox sendMessage={sendMessage} disabled={isLoadingResponse} />
        </div>
      </div>

    </main>
  </div>
);
}

