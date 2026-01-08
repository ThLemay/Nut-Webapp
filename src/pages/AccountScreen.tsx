import { motion } from 'framer-motion';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { useAuth } from '@/contexts/AuthContext';

const AccountScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const profileFields = [
    { icon: User, label: 'Name', value: user?.name || 'Demo User' },
    { icon: Mail, label: 'Email', value: user?.email || 'demo@example.com' },
    { icon: Shield, label: 'Account Type', value: user?.role === 'client' ? 'Client' : 'Entreprise' },
  ];

  return (
    <div className="screen-container">
      <PageHeader title="My Account" />

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-card rounded-3xl p-6 mb-6 shadow-elevated flex items-center gap-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{user?.name || 'Demo User'}</h2>
          <p className="text-muted-foreground capitalize">{user?.role} Account</p>
        </div>
      </motion.div>

      {/* Profile Fields */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl overflow-hidden shadow-card mb-6"
      >
        {profileFields.map((field, index) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="ios-list-item"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <field.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{field.label}</p>
                <p className="font-medium text-foreground">{field.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="w-full py-4 rounded-2xl bg-destructive/10 text-destructive font-semibold flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-muted-foreground text-sm mt-6"
      >
        Demo Mode • Read-only profile
      </motion.p>
    </div>
  );
};

export default AccountScreen;
