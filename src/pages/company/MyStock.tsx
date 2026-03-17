import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ListItem from '@/components/ListItem';

const stockItems = [
  { id: 1, name: 'Grand contenant', quantity: 12, available: 8 },
  { id: 2, name: 'Contenant moyen', quantity: 20, available: 15 },
  { id: 3, name: 'Petit contenant', quantity: 25, available: 18 },
];

const MyStock = () => {
  const totalItems = stockItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAvailable = stockItems.reduce((sum, item) => sum + item.available, 0);

  return (
    <div className="screen-container">
      <PageHeader title="Mon stock" />

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-primary rounded-3xl p-6 mb-8 shadow-elevated"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <Package className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-primary-foreground/80 font-medium">Vue des stocks</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-3xl font-bold text-primary-foreground">{totalAvailable}</p>
            <p className="text-primary-foreground/70 text-sm">Disponible</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-foreground">{totalItems - totalAvailable}</p>
            <p className="text-primary-foreground/70 text-sm">Empruntés</p>
          </div>
        </div>
      </motion.div>

      {/* Stock List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="title-medium mb-4">Container Types</h2>
        <div className="bg-card rounded-2xl overflow-hidden shadow-card">
          {stockItems.map((item, index) => (
            <ListItem
              key={item.id}
              title={item.name}
              subtitle={`${item.quantity} total`}
              badge={
                <span className="badge-success">
                  {item.available} available
                </span>
              }
              delay={index * 0.05}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MyStock;
