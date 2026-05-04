export default function MessageBubble({ message }) {
  // ✅ support both formats
  const text = message.content || message.text || "";

  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-4`}>
      <div
        className={`max-w-lg rounded-3xl px-6 py-4 text-sm leading-6 whitespace-pre-wrap break-words shadow-lg ${
          message.role === "user"
            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white ml-16"
            : "bg-white/80 backdrop-blur-sm text-zinc-900 border border-gray-200 shadow-premium mr-16"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
