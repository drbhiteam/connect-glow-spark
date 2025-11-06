import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Video, Phone } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

interface ChatRoom {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export default function Dashboard() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch chat rooms - placeholder data for now
    setRooms([
      {
        id: "1",
        name: "Sarah Miller",
        avatar: "👩",
        lastMessage: "Hey! How are you?",
        timestamp: "2m ago",
        unread: 2,
        online: true,
      },
      {
        id: "2",
        name: "Alex Johnson",
        avatar: "👨",
        lastMessage: "Let's talk later",
        timestamp: "1h ago",
        unread: 0,
        online: false,
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 glass-card p-4 border-b border-border">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        {/* Chat List */}
        <div className="p-4 space-y-3">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/chat/${room.id}`)}
              className="glass-card p-4 rounded-2xl cursor-pointer hover:shadow-lg transition-smooth"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-2xl">
                    {room.avatar}
                  </div>
                  {room.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-card" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {room.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {room.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {room.lastMessage}
                  </p>
                </div>

                {room.unread > 0 && (
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {room.unread}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <FloatingActionButton onClick={() => navigate("/discover")} />
      <BottomNav />
    </div>
  );
}
