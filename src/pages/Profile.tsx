import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Camera,
  Edit,
  MapPin,
  Mail,
  Shield,
  Settings,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/layout/BottomNav";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("Love connecting with new people! ✨");
  const [location, setLocation] = useState("San Francisco, CA");
  const [chargingEnabled, setChargingEnabled] = useState(true);
  const [mediaItems, setMediaItems] = useState([
    { id: "1", type: "image", emoji: "🌅" },
    { id: "2", type: "image", emoji: "🎨" },
    { id: "3", type: "video", emoji: "🎬" },
  ]);

  const handleSave = () => {
    toast.success("Profile updated!");
    setEditing(false);
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto">
        {/* Header with gradient */}
        <div className="gradient-primary h-32 relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full border-4 border-background bg-gradient-secondary flex items-center justify-center text-6xl shadow-2xl">
                {user?.firstName?.[0] || "👤"}
              </div>
              <Button
                variant="fab"
                size="icon"
                className="absolute bottom-0 right-0 w-10 h-10"
              >
                <Camera className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 px-4">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              {user?.isVerified && (
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                  ✓
                </div>
              )}
            </div>
            <p className="text-muted-foreground">@{user?.username}</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button
              variant="glass"
              className="flex-col h-auto py-4"
              onClick={() => setEditing(!editing)}
            >
              <Edit className="w-5 h-5 mb-1" />
              <span className="text-xs">Edit</span>
            </Button>
            <Button
              variant="glass"
              className="flex-col h-auto py-4"
              onClick={() => navigate("/verify")}
            >
              <Shield className="w-5 h-5 mb-1" />
              <span className="text-xs">Verify</span>
            </Button>
            <Button variant="glass" className="flex-col h-auto py-4">
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4 mb-6">
            <div className="glass-card rounded-2xl p-4">
              <Label className="text-sm font-semibold mb-2 block">Bio</Label>
              {editing ? (
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Tell people about yourself..."
                />
              ) : (
                <p className="text-muted-foreground">{bio}</p>
              )}
            </div>

            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <Label className="text-sm font-semibold">Location</Label>
              </div>
              {editing ? (
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                />
              ) : (
                <p className="text-muted-foreground">{location}</p>
              )}
            </div>

            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Label className="text-sm font-semibold">Email</Label>
              </div>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Media Gallery */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Media Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square glass-card rounded-2xl flex items-center justify-center text-4xl cursor-pointer hover:shadow-lg transition-smooth relative group"
                >
                  {item.emoji}
                  {item.type === "video" && (
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                      <Video className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {editing && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute inset-0 m-auto w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </Button>
                  )}
                </motion.div>
              ))}
              {editing && (
                <div className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-2xl flex items-center justify-center cursor-pointer hover:border-primary transition-smooth">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Earner Settings */}
          {user?.role === "earner" && (
            <div className="glass-card rounded-2xl p-4 mb-6">
              <h2 className="text-lg font-bold mb-4">Earning Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-semibold">Charging Enabled</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept paid conversations
                    </p>
                  </div>
                  <Switch
                    checked={chargingEnabled}
                    onCheckedChange={setChargingEnabled}
                  />
                </div>
                {chargingEnabled && (
                  <div className="space-y-3 pt-3 border-t border-border">
                    <div>
                      <Label className="text-sm">Text Rate (per message)</Label>
                      <Input
                        type="number"
                        placeholder="5.00"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Voice Rate (per minute)</Label>
                      <Input
                        type="number"
                        placeholder="10.00"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Video Rate (per minute)</Label>
                      <Input
                        type="number"
                        placeholder="15.00"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {editing && (
            <Button onClick={handleSave} size="lg" className="w-full mb-4">
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
