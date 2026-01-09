import { motion } from 'framer-motion';
import { Coins, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ListItem from '@/components/ListItem';

const transactions = [
  { id: 1, type: 'earned', amount: 10, description: 'Contenant retourné', date: "Aujourd'hui" },
  { id: 2, type: 'spent', amount: 5, description: 'Remise appliquée', date: 'Hier' },
  { id: 3, type: 'earned', amount: 10, description: 'Contenant retourné', date: 'Jan 5' },
  { id: 4, type: 'earned', amount: 20, description: 'Bonus', date: 'Jan 3' },
  { id: 5, type: 'spent', amount: 15, description: 'Remise appliquée', date: 'Jan 2' },
  { id: 6, type: 'earned', amount: 10, description: 'Contenant retourné', date: 'Dec 30' },
];

const MyCoins = () => {
  const balance = 245;

  return (
    <div className="screen-container">
      <PageHeader title="Mes Nut Coins" />

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-primary rounded-3xl p-6 mb-8 shadow-elevated"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <Coins className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-primary-foreground/80 font-medium">Solde disponible</span>
        </div>
        <div className="text-5xl font-bold text-primary-foreground">
          {balance}
          <span className="text-2xl font-normal ml-2">NC</span>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="title-medium mb-4">Historique des transactions</h2>
        <div className="bg-card rounded-2xl overflow-hidden shadow-card">
          {transactions.map((tx, index) => (
            <ListItem
              key={tx.id}
              title={tx.description}
              subtitle={tx.date}
              badge={
                <div className={`flex items-center gap-1 font-semibold ${
                  tx.type === 'earned' ? 'text-success' : 'text-destructive'
                }`}>
                  {tx.type === 'earned' ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                  {tx.type === 'earned' ? '+' : '-'}{tx.amount}
                </div>
              }
              delay={index * 0.05}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MyCoins;
