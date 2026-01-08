import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import PageHeader from '@/components/PageHeader';
import { useAuth } from '@/contexts/AuthContext';
const MyQRCode = () => {
  const {
    user
  } = useAuth();
  const qrValue = `nutbox:client:${user?.email || 'demo'}:${Date.now()}`;
  return <div className="screen-container">
      <PageHeader title="My QR Code" />

      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      delay: 0.2,
      duration: 0.4
    }} className="flex flex-col items-center">
        <div className="bg-card rounded-3xl p-8 shadow-elevated">
          <div className="bg-white p-4 rounded-2xl">
            <QRCode value={qrValue} size={200} level="H" style={{
            height: 'auto',
            maxWidth: '100%',
            width: '100%'
          }} />
          </div>
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="mt-8 text-center">
          <p className="text-lg font-medium text-foreground">
            ​Montrer le code à votre commerçant     
          </p>
          <p className="text-muted-foreground mt-2">
            The store will scan this to lend or collect containers
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.6
      }} className="mt-8 px-4 py-3 bg-accent rounded-xl">
          <p className="text-sm text-accent-foreground font-medium">
            {user?.name || 'Demo User'}
          </p>
        </motion.div>
      </motion.div>
    </div>;
};
export default MyQRCode;