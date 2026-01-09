import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import ListItem from '@/components/ListItem';

const containers = [
  { id: 'NB-2847', name: 'Grand contenant', status: 'borrowed', date: 'Dec 28, 2025' },
  { id: 'NB-1923', name: 'Contenant moyen', status: 'borrowed', date: 'Jan 3, 2026' },
  { id: 'NB-5621', name: 'Petit contenant', status: 'returned', date: 'Jan 5, 2026' },
  { id: 'NB-3384', name: 'Petit contenant', status: 'returned', date: 'Jan 6, 2026' },
  { id: 'NB-7192', name: 'Grand contenant', status: 'borrowed', date: 'Jan 7, 2026' },
];

const MyContainers = () => {
  return (
    <div className="screen-container">
      <PageHeader title="Mes Contenants" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl overflow-hidden shadow-card"
      >
        {containers.map((container, index) => (
          <ListItem
            key={container.id}
            title={container.name}
            subtitle={`${container.id} • ${container.date}`}
            badge={
              <span className={container.status === 'borrowed' ? 'badge-warning' : 'badge-success'}>
                {container.status === 'borrowed' ? 'Borrowed' : 'Returned'}
              </span>
            }
            delay={index * 0.05}
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-muted-foreground text-sm mt-6"
      >
        {containers.filter(c => c.status === 'borrowed').length} contenants empruntés
      </motion.p>
    </div>
  );
};

export default MyContainers;
