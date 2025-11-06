import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-20 right-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        variant="fab"
        size="fab"
        onClick={onClick}
        className="shadow-2xl"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};
