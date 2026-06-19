import { m } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      style={{ willChange: 'opacity' }}
    >
      {children}
    </m.div>
  );
}
