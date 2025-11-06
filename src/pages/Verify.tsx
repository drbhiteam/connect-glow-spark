import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Check, X, ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import { toast } from "sonner";

type VerificationStatus = "idle" | "recording" | "preview" | "submitted" | "approved" | "rejected";

export default function Verify() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleStartRecording = () => {
    setStatus("recording");
    // Simulating video capture
    setTimeout(() => {
      setStatus("preview");
      // In real app, capture actual video blob
      setPreviewUrl("data:video/mp4;base64,");
    }, 3000);
  };

  const handleSubmit = () => {
    setStatus("submitted");
    toast.success("Verification submitted! We'll review it shortly.");
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="glass-card border-b border-border p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-xl font-bold">Video Verification</h1>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <div className="w-32 h-32 mx-auto gradient-secondary rounded-full flex items-center justify-center shadow-2xl">
                  <Camera className="w-16 h-16 text-white" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-2">Get Verified</h2>
                  <p className="text-muted-foreground">
                    Record a short selfie video to verify your identity and gain
                    the verified badge
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 text-left space-y-3">
                  <h3 className="font-semibold">Instructions:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span>Ensure good lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span>Face the camera directly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span>Slowly turn your head left and right</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span>Video should be 3-5 seconds</span>
                    </li>
                  </ul>
                </div>

                <Button size="lg" className="w-full" onClick={handleStartRecording}>
                  <Camera className="mr-2" />
                  Start Recording
                </Button>
              </motion.div>
            )}

            {status === "recording" && (
              <motion.div
                key="recording"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="aspect-[3/4] bg-gradient-secondary rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full border-4 border-white/50 animate-pulse mx-auto mb-4"></div>
                      <p className="text-lg font-semibold">Recording...</p>
                      <p className="text-sm opacity-80">Turn your head slowly</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {status === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="aspect-[3/4] bg-muted rounded-3xl overflow-hidden relative flex items-center justify-center">
                  <div className="text-center text-6xl">🎬</div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStatus("idle")}
                  >
                    <X className="mr-2" />
                    Retake
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleSubmit}
                  >
                    <Upload className="mr-2" />
                    Submit
                  </Button>
                </div>
              </motion.div>
            )}

            {status === "submitted" && (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-32 h-32 mx-auto gradient-primary rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Check className="w-16 h-16 text-white" />
                </motion.div>

                <div>
                  <h2 className="text-2xl font-bold mb-2">Submitted!</h2>
                  <p className="text-muted-foreground">
                    Your verification is under review. We'll notify you once it's
                    approved.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
