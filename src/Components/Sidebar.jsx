import { useState } from "react";

export default function Sidebar({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onLogout,
  onDeleteChat,
  onRenameChat,
  searchQuery,
  onSearchChange,
}) {
  const [renaming, setRenaming] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRenameStart = (session) => {
    setRenaming(session.id);
    setNewTitle(session.title);
  };

  const handleRenameSave = (sessionId) => {
    if (newTitle.trim()) {
      onRenameChat(sessionId, newTitle.trim());
    }
    setRenaming(null);
  };

  return (
    <aside className="hidden w-72 flex-col border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-sm sm:flex text-zinc-900">
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600">
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8.5 12H15.5M12 8.5V15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-zinc-900">AI Chat</p>
          <p className="text-xs text-zinc-500">Conversations</p>
        </div>
      </div>

      <div className="px-4 py-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-primary-300 hover:bg-primary-50 text-sm font-medium text-zinc-700 transition-all duration-200 px-4 py-3"
        >
          <span className="text-xl">+</span>
          New Chat
        </button>
      </div>

      <div className="px-3 py-2">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 focus:outline-none transition-all"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1.5">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div key={session.id} className="group flex items-center gap-2">
                {renaming === session.id ? (
                  <div className="flex-1 flex gap-1">
                    <input
                      autoFocus
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameSave(session.id);
                        if (e.key === "Escape") setRenaming(null);
                      }}
                      className="flex-1 rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-zinc-900 focus:border-primary-400 focus:ring-1 focus:ring-primary-400/20 outline-none shadow-sm"
                    />
                    <button
                      onClick={() => handleRenameSave(session.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-sm transition-all"
                      title="Save"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onSelectSession(session.id)}
                      className={`flex-1 truncate rounded-xl px-3 py-3 text-left text-sm font-medium transition-all shadow-sm ${
                        session.id === activeSessionId
                          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:shadow-glow"
                          : "bg-white text-zinc-700 hover:bg-gray-50 hover:text-zinc-900 hover:shadow-md border border-gray-200"
                      }`}
                    >
                      {session.title}
                    </button>
                    <button
                      onClick={() => handleRenameStart(session)}
                      className="hidden h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-gray-100 hover:text-zinc-700 shadow-sm transition-all group-hover:flex"
                      title="Rename"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDeleteChat(session.id)}
                      className="hidden h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 shadow-sm transition-all group-hover:flex"
                      title="Delete"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-zinc-500 py-8">No chats found</p>
          )}
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={onLogout}
          className="w-full rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 text-left text-sm font-semibold text-white shadow-lg hover:shadow-glow hover:from-gray-800 hover:to-gray-700 transition-all duration-200"
        >
          Logout →
        </button>
      </div>
    </aside>
  );
}
