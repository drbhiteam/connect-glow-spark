import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Mic,
  Video,
  Phone,
  Image as ImageIcon,
  Smile,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  timestamp: string;
  type: "text" | "image" | "sticker";
}

export default function Chat() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey! How are you?",
      sender: "other",
      timestamp: "10:30",
      type: "text",
    },
    {
      id: "2",
      content: "I'm great! How about you?",
      sender: "me",
      timestamp: "10:31",
      type: "text",
    },
    {
      id: "3",
      content: "Doing well! Want to chat?",
      sender: "other",
      timestamp: "10:32",
      type: "text",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="glass-card border-b border-border p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft />
        </Button>

        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            👩
          </div>
          <div>
            <h2 className="font-bold">Sarah Miller</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Connection Banner */}
      <div className="bg-primary/10 text-primary p-3 text-center text-sm">
        <span className="font-semibold">Connected</span> • Premium chat active
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                msg.sender === "me"
                  ? "gradient-primary text-white rounded-br-sm"
                  : "glass-card rounded-bl-sm"
              }`}
            >
              <p>{msg.content}</p>
              <span
                className={`text-xs mt-1 block ${
                  msg.sender === "me" ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="glass-card border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ImageIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Smile className="w-5 h-5" />
          </Button>

          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
          />

          {message.trim() ? (
            <Button size="icon" onClick={handleSend} className="shrink-0">
              <Send className="w-5 h-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="shrink-0">
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto">
          {["👋", "❤️", "😂", "🔥", "👍", "🎉"].map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              size="sm"
              className="shrink-0"
              onClick={() => {
                const newMsg: Message = {
                  id: Date.now().toString(),
                  content: emoji,
                  sender: "me",
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  type: "sticker",
                };
                setMessages([...messages, newMsg]);
              }}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
