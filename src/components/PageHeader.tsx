import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, showBack = true }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 mb-6"
    >
      {showBack && (
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-all active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      <h1 className="title-large">{title}</h1>
    </motion.div>
  );
};

export default PageHeader;
