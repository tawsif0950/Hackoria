import React from 'react';
import { Globe, ShieldAlert, Code2, Server, Lock, Search } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Web Development",
    description: "High-performance, responsive websites built with React, Next.js, and modern frameworks tailored to your brand identity.",
    icon: <Globe className="w-8 h-8 text-brand-secondary" />
  },
  {
    title: "Cyber Security Audits",
    description: "Comprehensive vulnerability assessments to identify weak points in your infrastructure before attackers do.",
    icon: <ShieldAlert className="w-8 h-8 text-brand-primary" />
  },
  {
    title: "Penetration Testing",
    description: "Ethical hacking simulations to stress-test your defenses against real-world attack vectors.",
    icon: <Lock className="w-8 h-8 text-brand-accent" />
  },
  {
    title: "Custom Software",
    description: "Bespoke software solutions designed to streamline your business operations and increase efficiency.",
    icon: <Code2 className="w-8 h-8 text-brand-secondary" />
  },
  {
    title: "Secure Cloud Setup",
    description: "Hardened cloud infrastructure configuration for AWS, Azure, and Google Cloud to ensure data integrity.",
    icon: <Server className="w-8 h-8 text-brand-primary" />
  },
  {
    title: "Threat Analysis",
    description: "Proactive monitoring and threat intelligence to keep your digital assets safe from emerging risks.",
    icon: <Search className="w-8 h-8 text-brand-accent" />
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-10 left-0 w-full overflow-hidden leading-none select-none pointer-events-none opacity-[0.03]">
        <span className="text-[20vw] font-black text-white whitespace-nowrap">SERVICES</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase mb-2">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Engineering <span className="text-gray-500">Trust & Performance</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-brand-primary/50 hover:bg-gray-900 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 p-4 bg-black rounded-lg inline-block border border-gray-800 group-hover:border-brand-primary/30 transition-colors">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">{service.title}</h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
