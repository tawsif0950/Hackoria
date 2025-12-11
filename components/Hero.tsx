import React from 'react';
import { ArrowRight, Fingerprint, Users, Eye } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-36">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-brand-black to-black opacity-90"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary mb-8 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
          <span className="text-xs font-mono uppercase tracking-widest">Human Intelligence Secured</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Architects of the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
            Digital Human Experience
          </span>
        </h1>

        <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
          <span className="font-bold text-white">HACKORIA</span> combines human creativity with military-grade security. 
          We protect your people and your future.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-black bg-brand-primary rounded-sm overflow-hidden transition-all hover:bg-white hover:scale-105 focus:outline-none ring-offset-2 focus:ring-2 ring-brand-primary"
          >
            <span className="mr-2">Talk to an Expert</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#services"
            className="group inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border border-gray-700 rounded-sm hover:border-brand-primary hover:text-brand-primary transition-all bg-black/50 backdrop-blur-sm"
          >
            <Users className="mr-2 w-5 h-5" />
            Our Expertise
          </a>
        </div>

        {/* Floating Icons decoration - Human Biometrics */}
        <div className="absolute top-1/4 left-10 md:left-20 opacity-20 animate-bounce duration-[3000ms]">
           <Fingerprint size={48} className="text-brand-secondary" />
        </div>
         <div className="absolute bottom-1/4 right-10 md:right-20 opacity-20 animate-bounce duration-[4000ms]">
           <Eye size={48} className="text-brand-primary" />
        </div>

      </div>
    </section>
  );
};

export default Hero;