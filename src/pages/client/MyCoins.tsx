import { motion } from 'framer-motion';
import { Coins, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ListItem from '@/components/ListItem';
import { useDemoState } from '@/hooks/useDemoState';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MyCoins = () => {
  const { state, transactions } = useDemoState();

  // On n'affiche que les transactions qui rapportent des coins (collect)
  const coinTransactions = transactions.filter((tx) => tx.action === 'collect');

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
          {state.nutCoins}
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

        {coinTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            Aucune transaction pour l'instant.{'\n'}Retournez un contenant pour gagner des Nut Coins !
          </p>
        ) : (
          <div className="bg-card rounded-2xl overflow-hidden shadow-card">
            {coinTransactions.map((tx, index) => (
              <ListItem
                key={tx.id}
                title="Contenant retourné"
                subtitle={format(new Date(tx.createdAt), 'dd MMM yyyy, HH:mm', { locale: fr })}
                badge={
                  <div className="flex items-center gap-1 font-semibold text-success">
                    <ArrowDownLeft className="w-4 h-4" />
                    +1
                  </div>
                }
                delay={index * 0.05}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyCoins;
