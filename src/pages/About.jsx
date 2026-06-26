import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Lightbulb, ShieldCheck, Info, ArrowRight, Users, Briefcase, Calendar, Target, Eye, Award, Sparkles, Handshake } from 'lucide-react';
import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];
const vp   = { once: true, amount: 0.15 };
const profileImages = ['/were/hr1.jpg', '/were/hr2.jpg', '/were/hr3.jpg', '/were/hr4.jpg'];
const aboutHighlights = [
  { Icon: Target, title: 'Mission', body: 'To deliver innovative digital solutions that empower businesses to grow, operate smarter, and lead confidently.' },
  { Icon: Eye, title: 'Vision', body: 'To become the most trusted technology partner for ambitious businesses across India and beyond.' },
];

const values = [
  { Icon: Lightbulb, title: 'Innovation', body: 'We turn bold ideas into useful, lasting products.', color: '#0891b2' },
  { Icon: ShieldCheck, title: 'Integrity', body: 'We work with clarity, honesty, and genuine care.', color: '#0d9488' },
  { Icon: Award, title: 'Excellence', body: 'We polish every detail that makes a product stand out.', color: '#7c3aed' },
  { Icon: Sparkles, title: 'Modern Thinking', body: 'We keep solutions practical, current, and ready to scale.', color: '#2563eb' },
  { Icon: Handshake, title: 'Customer Success', body: 'We stay close to client goals from first call to launch.', color: '#16a34a' },
  { Icon: Users, title: 'Collaboration', body: 'We build with open communication and shared ownership.', color: '#ea580c' },
];

export default function About() {
  useLenis();

  return (
    <PageTransition>
      {/* Hero */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="eyebrow"><Info size={11} /> About Us</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }} className="section-title mt-4">
            Building technology<br /><span className="text-gradient">beyond the limit.</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }} className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
            Arkevion Technology is a Trichy-based technology company focused on web development, UI/UX design, software solutions, AI automation, digital marketing, and skill-building internship programs.
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Stats bar */}
      <section className="border-y border-gray-100 bg-white">
        <div className="container-pad py-8 grid grid-cols-3">
          {[
            { Icon: Calendar,  val: '2+',   label: 'Years'    },
            { Icon: Briefcase, val: '50+', label: 'Projects' },
            { Icon: Users,     val: '100+',  label: 'Clients'  },
          ].map(({ Icon, val, label }, i) => (
            <m.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: i * 0.1, ease }}
              className="flex flex-col items-center gap-1.5 px-4 text-center border-r last:border-r-0 border-gray-100"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                <Icon size={16} className="text-teal-600" />
              </div>
              <span className="font-display font-extrabold text-2xl text-charcoal">{val}</span>
              <span className="text-xs text-gray-400 font-medium">{label}</span>
            </m.div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container-pad">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <m.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.55, ease }}>
            <span className="eyebrow"><Info size={11} /> Who We Are</span>
            <h2 className="section-title mt-4 mb-6">
              A team that builds<br /><span className="text-gradient">what matters.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Arkevion Technology partners with startups, local businesses, institutions, and growing teams to turn ideas into reliable digital products.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-7">
              We combine brand clarity, clean design, modern engineering, automation thinking, and marketing execution to build solutions that are useful from day one.
            </p>
            <div className="mb-7 flex items-center">
              {profileImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Arkevion team member ${i + 1}`}
                  className="-mr-3 h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
              <span className="ml-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Our core team</span>
            </div>
            <Link to="/contact" className="btn-outline text-sm">
              Work with us <ArrowRight size={14} />
            </Link>
          </m.div>

          <m.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.55, delay: 0.1, ease }}>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <img
                src="/about.png"
                alt="Arkevion technology team workspace"
                className="h-64 w-full object-cover sm:h-80 lg:h-[360px]"
                style={{ objectPosition: 'center top' }}
              />
            </div>
          </m.div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {aboutHighlights.map(({ Icon, title, body }) => (
              <div key={title} className="glass-card p-5 group cursor-default">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={17} className="text-teal-600" />
                </div>
                <h3 className="font-bold text-sm text-charcoal mb-1">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 md:py-16 bg-[#fafcfc]">
        <div className="container-pad">
          <m.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} className="text-center mb-10">
            <span className="eyebrow"><Info size={11} /> Our Values</span>
            <h2 className="section-title mt-4">What drives <span className="text-gradient">us.</span></h2>
          </m.div>

          <div className="grid gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-3">
            {values.map(({ Icon, title, body, color }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ delay: i * 0.1, ease }}
                whileHover={{ y: -5 }}
                className="glass-card p-4 sm:p-7 group text-center cursor-default"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${color}10`, color }}>
                  <Icon size={18} />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-lg text-charcoal mb-1.5 sm:mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{body}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-pad">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            className="relative overflow-hidden rounded-3xl p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg, #0c1a29 0%, #0d4a42 60%, #0c1a29 100%)', boxShadow: '0 24px 72px rgba(13,148,136,0.22)' }}
          >
            <div className="glow-orb w-64 h-64" style={{ top: '-70px', right: '-30px', background: 'rgba(20,184,166,0.15)' }} />
            <div className="glow-orb w-48 h-48" style={{ bottom: '-50px', left: '8%',  background: 'rgba(8,145,178,0.12)' }} />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to work together?</h2>
              <p className="mt-2 text-sm text-white/70">Let's build something great — no commitment, just a conversation.</p>
            </div>
            <Link to="/contact" className="relative z-10 shrink-0 btn-primary">
              Get in touch <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>
      </section>
    </PageTransition>
  );
}
