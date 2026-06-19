import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import ContactCTA from '../components/sections/ContactCTA';
import PageHeroBanner from '../components/ui/PageHeroBanner';
import { staggerContainer, fadeUp } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';

const categories = ['All', 'Web', 'Mobile', 'Design', 'AI'];

const projects = [
  { id: 1, title: 'E-Commerce Platform', category: 'Web', description: 'Multi-vendor platform handling 10,000+ concurrent users with real-time inventory.', result: '3x increase in conversions', technologies: ['React', 'Django', 'MySQL', 'Redis', 'AWS'], color: '#1F8A9E' },
  { id: 2, title: 'Healthcare SaaS', category: 'Web', description: 'Patient management system with telemedicine and appointment scheduling.', result: '500+ clinics onboarded in 3 months', technologies: ['Next.js', 'Django', 'PostgreSQL'], color: '#176B7D' },
  { id: 3, title: 'FinTech Dashboard', category: 'Design', description: 'Financial analytics dashboard making complex data actionable.', result: '65% increase in user engagement', technologies: ['Figma', 'React', 'D3.js'], color: '#2AAFCA' },
  { id: 4, title: 'Logistics App', category: 'Mobile', description: 'Real-time package tracking with GPS and offline-first capability.', result: '200K+ downloads in 6 months', technologies: ['React Native', 'Node.js', 'MongoDB'], color: '#104E5C' },
  { id: 5, title: 'AI Content Generator', category: 'AI', description: 'LLM-powered content creation for SEO-optimized marketing at scale.', result: '80% reduction in content time', technologies: ['Python', 'OpenAI API', 'FastAPI', 'React'], color: '#57C4DC' },
  { id: 6, title: 'EdTech Platform', category: 'Web', description: 'Live-class platform with video streaming for 10,000+ students.', result: '10,000+ active students', technologies: ['React', 'Django', 'WebRTC', 'AWS'], color: '#09313A' },
];

export default function PortfolioPage() {
  useLenis();
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <PageTransition>
      <PageHeroBanner className="relative overflow-hidden bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="container-pad relative z-10">
          <div className="mb-16">
            <span className="text-xs font-semibold text-teal-primary uppercase tracking-widest mb-4 block">Portfolio</span>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-gray-900 leading-tight mb-10">
              Selected work
            </h1>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active === cat
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <m.div
                  key={project.id}
                  variants={fadeUp}
                  layout
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
                  onClick={() => setSelected(project)}
                >
                  <div
                    className="aspect-[4/3] flex items-end p-6 relative overflow-hidden"
                    style={{ backgroundColor: project.color }}
                  >
                    <div className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="relative flex items-center justify-between w-full">
                      <span className="text-white/60 text-xs font-medium uppercase tracking-wider">{project.category}</span>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-gray-900 mb-1.5">{project.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        </div>
      </PageHeroBanner>

      <AnimatePresence>
        {selected && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <m.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="aspect-video flex items-end p-8 relative"
                style={{ backgroundColor: selected.color }}
              >
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <h2 className="font-display font-bold text-3xl text-white relative">{selected.title}</h2>
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold text-teal-primary bg-teal-50 px-3 py-1 rounded-full border border-teal-100">{selected.category}</span>
                  <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <X size={14} />
                  </button>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{selected.description}</p>
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 mb-5">
                  <p className="text-xs font-semibold text-teal-primary uppercase tracking-wider mb-1">Result</p>
                  <p className="text-sm font-medium text-gray-900">{selected.result}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.technologies.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <ContactCTA />
    </PageTransition>
  );
}
