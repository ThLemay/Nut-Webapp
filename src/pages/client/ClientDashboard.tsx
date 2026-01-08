import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, QrCode, Coins, User } from 'lucide-react';
import ActionCard from '@/components/ActionCard';
import { useAuth } from '@/contexts/AuthContext';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const actions = [
    { icon: Package, label: 'sddfzdv', path: '/client/containers' },
    { icon: QrCode, label: 'My QR Code', path: '/client/qr-code' },
    { icon: Coins, label: 'My Nut Coins', path: '/client/coins' },
    { icon: User, label: 'My Account', path: '/account' },
  ];

  return (
    <div className="screen-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <p className="text-muted-foreground">Hello,</p>
        <h1 className="title-large mt-1">{user?.name || 'User'}</h1>
      </motion.div>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <ActionCard
            key={action.path}
            icon={action.icon}
            label={action.label}
            onClick={() => navigate(action.path)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;
