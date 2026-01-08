import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import logoWhite from '@/assets/logo-white.png';
const LoginScreen = () => {
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    const success = await login(email, password, selectedRole);
    setIsLoading(false);
    if (success) {
      navigate(selectedRole === 'client' ? '/client/dashboard' : '/company/dashboard');
    }
  };
  return <div className="min-h-screen bg-background flex flex-col px-6 py-12">
      {/* Logo & Welcome */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-card p-3">
          <img src={logoWhite} alt="NutBox Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="title-large text-center">Bienvenue</h1>
        <p className="text-muted-foreground mt-2 text-center">
          Sign in to continue
        </p>
      </motion.div>

      {/* Role Selector */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1,
      duration: 0.4
    }} className="flex gap-3 mb-8">
        <button onClick={() => setSelectedRole('client')} className={`flex-1 py-3 rounded-xl font-medium transition-all ${selectedRole === 'client' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          Client
        </button>
        <button onClick={() => setSelectedRole('company')} className={`flex-1 py-3 rounded-xl font-medium transition-all ${selectedRole === 'company' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          Company
        </button>
      </motion.div>

      {/* Form */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2,
      duration: 0.4
    }} className="space-y-4">
        <div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="ios-input" placeholder="Adresse mail" />
        </div>

        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="ios-input pr-12" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Login Button */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3,
      duration: 0.4
    }} className="mt-8">
        <button onClick={handleLogin} disabled={isLoading || !email || !password} className="ios-button-primary disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Signing in...
            </span> : 'Sign In'}
        </button>
      </motion.div>

      {/* Demo hint */}
      <motion.p initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.5,
      duration: 0.4
    }} className="text-center text-muted-foreground text-sm mt-8">
        Demo mode: Enter any credentials
      </motion.p>
    </div>;
};
export default LoginScreen;