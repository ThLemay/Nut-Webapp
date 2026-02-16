import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import ListItem from '@/components/ListItem';
import { useDemoState } from '@/hooks/useDemoState';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MyContainers = () => {
  const { transactions, state } = useDemoState();

  const containerHistory = transactions.map((tx) => ({
    id: tx.id,
    status: tx.action === 'lend' ? 'borrowed' : 'returned',
    date: format(new Date(tx.createdAt), 'dd MMM yyyy', { locale: fr }),
  }));

  return (
    <div className="screen-container">
      <PageHeader title="Mes Contenants" />

      {containerHistory.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground text-sm py-8"
        >
          Aucun contenant pour l'instant.
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl overflow-hidden shadow-card"
        >
          {containerHistory.map((item, index) => (
            <ListItem
              key={item.id}
              title="Contenant"
              subtitle={item.date}
              badge={
                <span className={item.status === 'borrowed' ? 'badge-warning' : 'badge-success'}>
                  {item.status === 'borrowed' ? 'Emprunté' : 'Retourné'}
                </span>
              }
              delay={index * 0.05}
            />
          ))}
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-muted-foreground text-sm mt-6"
      >
        {state.clientContainers} contenant{state.clientContainers !== 1 ? 's' : ''} emprunté{state.clientContainers !== 1 ? 's' : ''}
      </motion.p>
    </div>
  );
};

export default MyContainers;
