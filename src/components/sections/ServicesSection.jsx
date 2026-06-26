import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Layers, Palette, TrendingUp, Smartphone, Zap, ArrowUpRight } from 'lucide-react';

const services = [
  { icon: Code2, title: 'Web Development', description: 'Fast, secure, SEO-ready websites for brands, institutions, and growing businesses that need a polished digital presence.', path: '/services', color: '#0d9488', image: '/New folder/dg.png' },
  { icon: Layers, title: 'Full Stack', description: 'End-to-end applications with clean frontends, reliable APIs, databases, authentication, and scalable deployment workflows.', path: '/services', color: '#0891b2', image: '/New folder/modern.png' },
  { icon: Smartphone, title: 'Mobile Development', description: 'Android, iOS, and mobile-first app experiences designed around smooth navigation, fast actions, and real user needs.', path: '/services', color: '#0d9488', image: '/New folder/Ecom.png' },
  { icon: Palette, title: 'UI/UX Design', description: 'Research-led interface design, prototypes, and design systems that make products easier to use and trust.', path: '/services', color: '#7c3aed', image: '/New folder/UI.png' },
  { icon: TrendingUp, title: 'Digital Marketing', description: 'SEO, social media, paid campaigns, and content strategy designed to increase visibility and qualified leads.', path: '/services', color: '#0d9488', image: '/New folder/digital.png' },
  { icon: Zap, title: 'AI Automation', description: 'Practical AI assistants, data workflows, and automation systems that reduce manual effort and improve response speed.', path: '/services', color: '#7c3aed', image: '/New folder/userinter.png' },
];

const ease = [0.25, 0.46, 0.45, 0.94];

export default function ServicesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section className="py-6 md:py-12 bg-[#fafcfc] relative overflow-hidden" ref={ref}>
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[240px] h-[240px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.04) 0%, transparent 70%)' }}
      />

      <div className="container-pad relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <m.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease }}
              className="eyebrow mb-4 inline-flex"
            >
              <ArrowUpRight size={11} /> Services
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08, ease }}
              className="section-title mt-3"
            >
              What we <span className="text-gradient">do</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.14, ease }}
              className="text-gray-400 mt-3 max-w-md text-sm leading-relaxed"
            >
              From concept to launch, Arkevion Technology provides practical digital services that help teams operate smarter, reach customers faster, and grow beyond limits.
            </m.p>
          </div>
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2, ease }}
          >
            <Link to="/services" className="btn-outline text-sm py-2.5 px-5">
              All services <ArrowUpRight size={14} />
            </Link>
          </m.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {services.map(({ icon: Icon, title, description, path, color, image }, i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              className="svc-card group cursor-default overflow-hidden"
            >
              <Link to={path} className="block h-full">
                <div className="aspect-[16/9] overflow-hidden bg-gray-50">
                  <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4 sm:p-7">
                <div
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 transition-transform duration-250 group-hover:scale-110"
                  style={{ background: `${color}10`, color }}
                >
                  <Icon size={18} />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-[1.0625rem] text-charcoal mb-1.5 sm:mb-2.5 group-hover:text-teal-600 transition-colors duration-150">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 sm:mb-6 hidden sm:block">{description}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-3 sm:hidden line-clamp-2">{description}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
                  Learn more <ArrowUpRight size={13} />
                </div>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

