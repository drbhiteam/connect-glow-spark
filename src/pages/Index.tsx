import { motion } from "framer-motion";
import { Heart, MessageCircle, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-primary overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-secondary rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative"
          >
            <div className="w-32 h-32 mx-auto glass-card rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <span className="text-7xl">💬</span>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -z-10"
            >
              <div className="w-32 h-32 mx-auto border-4 border-dashed border-white/30 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold text-white"
            >
              Connect
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                className="inline-block mx-2"
              >
                ❤️
              </motion.span>
              Chat
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-white/90"
            >
              Meet amazing people and start meaningful conversations
            </motion.p>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-4 py-6"
          >
            <div className="glass-card rounded-2xl p-4 backdrop-blur-xl">
              <Heart className="w-8 h-8 mx-auto mb-2 text-white" />
              <p className="text-xs text-white/90 font-medium">Real Connections</p>
            </div>
            <div className="glass-card rounded-2xl p-4 backdrop-blur-xl">
              <Shield className="w-8 h-8 mx-auto mb-2 text-white" />
              <p className="text-xs text-white/90 font-medium">Verified Users</p>
            </div>
            <div className="glass-card rounded-2xl p-4 backdrop-blur-xl">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-white" />
              <p className="text-xs text-white/90 font-medium">Premium Chat</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-3"
          >
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="w-full bg-white text-primary hover:bg-white/90 shadow-2xl h-14 text-lg font-bold"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="glass"
              onClick={() => navigate("/login")}
              className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl h-14"
            >
              Sign In
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-2 text-white/80 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join thousands of users worldwide</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
