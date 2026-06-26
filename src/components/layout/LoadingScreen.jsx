import { m, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="blur-loader-bg fixed inset-0 z-[100] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            <m.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src="/Arkevion_logo.png"
                alt="Arkevion"
                className="h-52 w-auto"
              />
            </m.div>
            

            <m.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-40 h-0.5 bg-gradient-to-r from-teal-primary to-teal-light origin-left rounded-full"
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

