import React from 'react';
import { UserCheck, Award, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 blur-lg"></div>
            <div className="relative glass-panel p-8 rounded-xl border border-gray-800">
               <h3 className="text-2xl font-bold text-white mb-2">Abdur Rahman</h3>
               <p className="text-brand-primary font-mono text-sm mb-6">FOUNDER & CEO</p>
               <p className="text-gray-400 leading-relaxed mb-6">
                 A visionary leader in the tech space, Abdur Rahman established HACKORIA with a singular mission: to bridge the gap between innovative web development and impenetrable security. 
               </p>
               <p className="text-gray-400 leading-relaxed">
                 With deep expertise in ethical hacking and full-stack engineering, he ensures every project is built on a foundation of trust, speed, and resilience.
               </p>

               <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-800 pt-6">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-white">5+</h4>
                    <p className="text-xs text-gray-500 uppercase mt-1">Years Exp</p>
                  </div>
                  <div className="text-center border-l border-gray-800">
                    <h4 className="text-2xl font-bold text-white">100+</h4>
                    <p className="text-xs text-gray-500 uppercase mt-1">Projects</p>
                  </div>
                  <div className="text-center border-l border-gray-800">
                    <h4 className="text-2xl font-bold text-white">100%</h4>
                    <p className="text-xs text-gray-500 uppercase mt-1">Secure</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Defining the Standard of <span className="text-brand-secondary">Digital Excellence</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              At HACKORIA, we don't just write code; we engineer solutions. In an era where cyber threats are evolving daily, standard web development isn't enough. We integrate security protocols from the first line of code.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-brand-primary/10 p-3 rounded-lg">
                  <UserCheck className="w-6 h-6 text-brand-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white">Client-Centric Approach</h4>
                  <p className="text-gray-500 mt-2">Tailored strategies that align with your specific business goals and threat landscape.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-brand-secondary/10 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-brand-secondary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white">Scalable Architecture</h4>
                  <p className="text-gray-500 mt-2">Systems designed to grow with you, maintaining performance and security at scale.</p>
                </div>
              </div>

               <div className="flex items-start">
                <div className="flex-shrink-0 bg-brand-accent/10 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-brand-accent" />
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white">Certified Expertise</h4>
                  <p className="text-gray-500 mt-2">Our team holds industry-recognized certifications in development and security.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
