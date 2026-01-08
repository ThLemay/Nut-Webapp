import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  delay?: number;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon: Icon, label, onClick, delay = 0 }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="ios-card w-full flex items-center gap-4 text-left"
    >
      <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-lg font-medium text-foreground">{label}</span>
    </motion.button>
  );
};

export default ActionCard;
