import { m } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import ContactCTA from '../components/sections/ContactCTA';
import PageHeroBanner from '../components/ui/PageHeroBanner';
import { fadeUp, slideInLeft, staggerContainer } from '../utils/animations';

const team = [
  { name: 'Aryan Mehta', role: 'Founder & CEO' },
  { name: 'Kavya Rao', role: 'Lead Designer' },
  { name: 'Rohan Das', role: 'Full Stack Lead' },
  { name: 'Divya Krishnan', role: 'Marketing Head' },
];

const values = [
  { icon: Target, title: 'Mission', content: 'Our mission is to empower businesses and individuals through innovative technology solutions, industry-focused training, and practical learning experiences. We strive to bridge the gap between education and industry by nurturing future-ready professionals while helping organizations achieve sustainable growth through digital innovation and AI-driven transformation.' },
  { icon: Eye, title: 'Vision', content: 'Our vision is to become a leading technology and innovation company recognized for delivering impactful digital solutions, fostering talent, and creating opportunities that inspire growth, creativity, and technological advancement across industries and communities.' },
  { icon: Heart, title: 'Values', content: 'Integrity in every interaction. Excellence in every deliverable.' },
];

export default function AboutPage() {
  useLenis();

  return (
    <PageTransition>
      <PageHeroBanner className="pt-24 pb-24 bg-white">
        <div className="container-pad">
          <div className="max-w-3xl">
            <m.div variants={slideInLeft} initial="hidden" animate="visible">
              <span className="text-xs font-semibold text-teal-primary uppercase tracking-widest mb-4 block">About</span>
              <h1 className="font-display font-bold text-5xl md:text-6xl text-gray-900 leading-tight mb-8">
                We are Arkevion<br />
                <span className="text-gradient">Technology</span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                At Arkevion Technology, we believe that technology has the power to transform ideas into reality. Driven by innovation and excellence, we provide cutting-edge solutions in AI Automation, Software Development, Web Technologies, and Digital Transformation. By combining creativity, technical expertise, and a passion for continuous learning, we help businesses grow, individuals develop valuable skills, and ideas evolve into impactful digital solutions — Beyond Limits.
              </p>
            </m.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-100">
            {[
              { value: '150+', label: 'Projects' },
              { value: '50+', label: 'Clients' },
              { value: '5+', label: 'Years' },
              { value: '10+', label: 'Countries' },
            ].map(({ value, label }, i) => (
              <m.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <div className="font-display font-bold text-4xl text-gray-900 mb-1">{value}</div>
                <p className="text-sm text-gray-400">{label}</p>
              </m.div>
            ))}
          </div>
        </div>
      </PageHeroBanner>

      <section className="section-pad bg-gray-50/40">
        <div className="container-pad">
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, content }, i) => (
              <m.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-teal-primary" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{content}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="mb-14">
            <span className="text-xs font-semibold text-teal-primary uppercase tracking-widest mb-3 block">Team</span>
            <h2 className="font-display font-bold text-4xl text-gray-900">The people behind the work</h2>
          </div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {team.map(({ name, role }, i) => (
              <m.div
                key={name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-teal-50 group-hover:border-teal-100 transition-all duration-300">
                  <span className="font-display font-bold text-4xl text-gray-200 group-hover:text-teal-200 transition-colors duration-300">
                    {name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{role}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
