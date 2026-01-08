import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ListItemProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  onClick?: () => void;
  delay?: number;
  showChevron?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ 
  title, 
  subtitle, 
  badge, 
  onClick, 
  delay = 0,
  showChevron = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileTap={onClick ? { scale: 0.99, opacity: 0.8 } : undefined}
      onClick={onClick}
      className={`ios-list-item ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{title}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {badge}
        {showChevron && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
      </div>
    </motion.div>
  );
};

export default ListItem;
