import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Heart, X, Info, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/layout/BottomNav";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  photos: string[];
  verified: boolean;
  role: string;
}

const profiles: Profile[] = [
  {
    id: "1",
    name: "Emma",
    age: 26,
    bio: "Love traveling and meeting new people ✨",
    location: "New York, NY",
    photos: ["🌸"],
    verified: true,
    role: "earner",
  },
  {
    id: "2",
    name: "James",
    age: 29,
    bio: "Tech enthusiast and coffee lover ☕",
    location: "San Francisco, CA",
    photos: ["🚀"],
    verified: true,
    role: "earner",
  },
  {
    id: "3",
    name: "Sofia",
    age: 24,
    bio: "Artist by day, dreamer by night 🎨",
    location: "Los Angeles, CA",
    photos: ["🎭"],
    verified: false,
    role: "earner",
  },
];

const ProfileCard = ({
  profile,
  onSwipe,
  onInfoClick,
}: {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
  onInfoClick: () => void;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      className="absolute w-full"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
    >
      <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
        {/* Photo */}
        <div className="aspect-[3/4] bg-gradient-secondary flex items-center justify-center text-9xl relative">
          {profile.photos[0]}
          {profile.verified && (
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
              ✓
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              {profile.name}, {profile.age}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onInfoClick();
              }}
            >
              <Info className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-muted-foreground">{profile.bio}</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {profile.location}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4" />
            <span className="capitalize">{profile.role}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      console.log("Liked:", profiles[currentIndex].name);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Discover</h1>
          <p className="text-muted-foreground">Find amazing people to connect with</p>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px]">
          {currentIndex < profiles.length ? (
            <ProfileCard
              profile={currentProfile}
              onSwipe={handleSwipe}
              onInfoClick={() => setSelectedProfile(currentProfile)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 glass-card rounded-3xl flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">That's everyone!</h2>
              <p className="text-muted-foreground">Check back later for new profiles</p>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        {currentIndex < profiles.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-6 mt-8"
          >
            <Button
              variant="destructive"
              size="fab"
              onClick={() => handleSwipe("left")}
              className="shadow-xl"
            >
              <X className="w-7 h-7" />
            </Button>
            <Button
              variant="fab"
              size="fab"
              onClick={() => handleSwipe("right")}
              className="shadow-xl w-20 h-20"
            >
              <Heart className="w-8 h-8" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Profile Details Sheet */}
      <Sheet open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>
              {selectedProfile?.name}, {selectedProfile?.age}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <p>{selectedProfile?.bio}</p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {selectedProfile?.location}
            </div>
            <Button className="w-full" size="lg">
              Connect
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <BottomNav />
    </div>
  );
}
