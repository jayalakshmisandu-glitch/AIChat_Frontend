import { useState } from "react";

export default function InputBox({ sendMessage, disabled = false }) {
  const [text, setText] = useState("");

 return (
 <form
  onSubmit={(e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    sendMessage(text);
    setText("");
  }}
  className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition"
>
  <input
    className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-50"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Type your message..."
    disabled={disabled}
  />

  <button
    type="submit"
    disabled={!text.trim() || disabled}
    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:scale-105 transition disabled:opacity-50"
  >
    ▲
  </button>
</form>
);
}
