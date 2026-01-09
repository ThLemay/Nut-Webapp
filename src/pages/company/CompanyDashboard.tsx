import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ScanLine, User } from 'lucide-react';
import ActionCard from '@/components/ActionCard';
import { useAuth } from '@/contexts/AuthContext';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const actions = [
    { icon: Package, label: 'Mon Stock', path: '/company/stock' },
    { icon: ScanLine, label: 'Prêter / Récupérer des contenants', path: '/company/scanner' },
    { icon: User, label: 'Mon Compte', path: '/account' },
  ];

  return (
    <div className="screen-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <p className="text-muted-foreground">Welcome back,</p>
        <h1 className="title-large mt-1">{user?.name || 'Company'}</h1>
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

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-8 grid grid-cols-2 gap-4"
      >
        <div className="bg-accent rounded-2xl p-5">
          <p className="text-3xl font-bold text-primary">47</p>
          <p className="text-sm text-muted-foreground mt-1">En stock</p>
        </div>
        <div className="bg-accent rounded-2xl p-5">
          <p className="text-3xl font-bold text-primary">23</p>
          <p className="text-sm text-muted-foreground mt-1">Empruntés</p>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyDashboard;
