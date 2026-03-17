import { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanLine,
  CheckCircle2,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Html5Qrcode } from 'html5-qrcode';
import { addTransaction } from '@/lib/demoDb';

type ScanState = 'scanning' | 'scanned' | 'success';

const QRScanner = () => {
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [selectedAction, setSelectedAction] = useState<'lend' | 'collect' | null>(null);
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const [clientEmail, setClientEmail] = useState<string | null>(null);

  const scannerElementId = useId();
  const qrRef = useRef<Html5Qrcode | null>(null);
  const isStartingRef = useRef(false);

  const stopScanner = async () => {
    const qr = qrRef.current;
    if (!qr) return;
    try { qr.stop(); } catch { /* déjà stoppé */ }
    try { qr.clear(); } catch { /* ignore */ }
  };

  const startScanner = async () => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;

    try {
      const qr = new Html5Qrcode(scannerElementId);
      qrRef.current = qr;

      await qr.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: (w: number, h: number) => {
            const size = Math.floor(Math.min(w, h) * 0.7);
            return { width: size, height: size };
          },
        },
        async (text) => {
          // Extraire l'email du format nutbox:client:email:timestamp
          const parts = text.split(':');
          const email = parts.length >= 3 ? parts[2] : text;

          setDecodedText(text);
          setClientEmail(email);
          setScanState('scanned');
          await stopScanner();
        },
        () => { /* erreurs de décodage fréquentes, ignorées */ }
      );
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : "Impossible d'accéder à la caméra. Vérifie les autorisations du navigateur.";
      console.error('QR start error:', e);
      alert(message);
    } finally {
      isStartingRef.current = false;
    }
  };

  useEffect(() => {
    if (scanState === 'scanning') {
      startScanner();
    } else {
      stopScanner();
    }
    return () => { stopScanner(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanState]);

  const handleAction = (action: 'lend' | 'collect') => {
    if (decodedText) {
      addTransaction(decodedText, action);
    }
    setSelectedAction(action);
    setScanState('success');

    setTimeout(() => {
      setScanState('scanning');
      setSelectedAction(null);
      setDecodedText(null);
      setClientEmail(null);
    }, 2500);
  };

  return (
    <div className="screen-container relative">
      <PageHeader title="Scanner un QR code" />

      <AnimatePresence mode="wait">
        {scanState === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-72 h-72 mb-8">
              <div className="absolute inset-0 bg-secondary rounded-3xl overflow-hidden" />

              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div
                  id={scannerElementId}
                  className="w-full h-full [&>video]:w-full [&>video]:h-full [&>video]:object-cover [&>canvas]:w-full [&>canvas]:h-full"
                />
              </div>

              {/* Coin markers */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-xl" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-xl" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-xl" />

              <motion.div
                className="absolute left-4 right-4 h-1 bg-primary/50 rounded-full"
                animate={{ top: ['20%', '80%', '20%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <ScanLine className="w-16 h-16 text-primary/20" />
              </div>
            </div>

            <p className="text-lg font-medium text-foreground mb-2">Scanner le QR code</p>
            <p className="text-muted-foreground text-center mb-4">
              Positionnez le code QR à l'intérieur du cadre.
            </p>
            <p className="text-muted-foreground text-center text-sm">
              Si Edge demande une autorisation, accepte l'accès caméra.
            </p>
          </motion.div>
        )}

        {scanState === 'scanned' && (
          <motion.div
            key="scanned"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center"
          >
            {/* Info client extraite du QR */}
            <div className="bg-card rounded-3xl p-6 shadow-elevated mb-6 w-full max-w-xs">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                  <Package className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {clientEmail ?? 'Client inconnu'}
                  </h3>
                  <p className="text-muted-foreground text-sm">Client vérifié</p>
                </div>
              </div>
            </div>

            <p className="text-lg font-medium text-foreground mb-6">Choisis une action</p>

            <div className="w-full max-w-xs space-y-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction('lend')}
                className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-3"
              >
                <ArrowUpFromLine className="w-5 h-5" />
                Prêter contenant
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction('collect')}
                className="w-full py-4 px-6 rounded-2xl bg-success text-success-foreground font-semibold flex items-center justify-center gap-3"
              >
                <ArrowDownToLine className="w-5 h-5" />
                Collecter contenant
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setScanState('scanning');
                  setDecodedText(null);
                  setClientEmail(null);
                }}
                className="w-full py-3 px-6 rounded-2xl bg-secondary text-foreground font-semibold"
              >
                Re-scanner
              </motion.button>
            </div>
          </motion.div>
        )}

        {scanState === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center flex-1 py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-24 h-24 rounded-full bg-success flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-success-foreground" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Réussi !</h2>
            <p className="text-muted-foreground text-center">
              {selectedAction === 'lend'
                ? 'Contenant prêté au client'
                : 'Contenant récupéré — +1 Nut Coin attribué'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRScanner;
