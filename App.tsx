import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Globe, Zap, Cpu, Layout, Layers, Menu, X, ArrowRight, ChevronLeft, ChevronRight, Brain, Sparkles, Target } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ProjectCard';
import { Project } from './types';

// Portfolio Data
const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Synthia AI', 
    category: 'Generative UI', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    strategy: 'To bridge the gap between complex AI parameters and creative intuition through adaptive, real-time interface generation.',
    description: 'Synthia is a generative design tool that learns from user preferences to suggest layout and color systems dynamically.',
    process: [
      { phase: 'Discovery', details: 'Interviewed 50+ designers to identify friction points in traditional design software.' },
      { phase: 'Strategy', details: 'Developed a "Human-in-the-loop" framework where AI acts as a co-pilot rather than a replacement.' },
      { phase: 'Prototyping', details: 'Built high-fidelity interactive prototypes using React and custom LLM hooks.' },
      { phase: 'Validation', details: 'Conducted A/B testing showing a 40% increase in design iteration speed.' }
    ]
  },
  { 
    id: '2', 
    title: 'Nexus OS', 
    category: 'AI-Native OS', 
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop',
    strategy: 'Reimagining the operating system as a proactive assistant that anticipates user needs based on contextual data.',
    description: 'Nexus OS removes the concept of applications, replacing them with intent-based "actions" powered by a central AI core.',
    process: [
      { phase: 'Research', details: 'Analyzed cognitive load in multi-tasking environments.' },
      { phase: 'Concept', details: 'Shifted from app-centric to task-centric architecture.' },
      { phase: 'Design', details: 'Created a fluid, non-linear navigation system using motion-driven interfaces.' },
      { phase: 'Impact', details: 'Reduced time-to-task by 60% in early beta testing.' }
    ]
  },
  { 
    id: '3', 
    title: 'Aura Health', 
    category: 'Predictive Wellness', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    strategy: 'Leveraging biometric data to provide empathetic, predictive health interventions before symptoms arise.',
    description: 'Aura uses machine learning to analyze sleep, activity, and stress patterns to offer personalized wellness coaching.',
    process: [
      { phase: 'Empathy Mapping', details: 'Deep dives into the emotional journey of chronic stress management.' },
      { phase: 'Data Strategy', details: 'Collaborated with data scientists to define ethical data collection boundaries.' },
      { phase: 'UX Design', details: 'Designed a "calm tech" interface that minimizes notification fatigue.' },
      { phase: 'Result', details: 'Achieved a 85% user retention rate over a 6-month pilot program.' }
    ]
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Handle keyboard navigation for project modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PROJECTS.length;
    } else {
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    }
    setSelectedProject(PROJECTS[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden bg-[#050505]">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">ERIC.AI</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.2em] uppercase">
          {['Projects', 'Process', 'About'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:inline-block border border-white/20 px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 text-white cursor-pointer bg-transparent rounded-full backdrop-blur-sm"
          data-hover="true"
        >
          Let's Talk
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {['Projects', 'Process', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-5xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-8 border border-white px-12 py-5 text-sm font-bold tracking-widest uppercase bg-white text-black rounded-full"
            >
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#4fb7b3] border border-[#4fb7b3]/30 px-4 py-2 rounded-full backdrop-blur-sm">
              AI Product Designer
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-heading font-bold leading-[0.9] tracking-tighter mb-8">
            <GradientText text="DESIGNING" className="block" />
            <span className="block text-white">INTELLIGENT</span>
            <GradientText text="FUTURES" className="block" />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-sm md:text-lg text-white/60 max-w-2xl font-light leading-relaxed tracking-wide"
          >
            I bridge the gap between human intuition and machine intelligence, 
            crafting seamless AI-driven experiences that feel natural, ethical, and empowering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex flex-col md:flex-row gap-6"
          >
            <button 
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#a8fbd3] transition-all duration-300"
              data-hover="true"
            >
              View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </header>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 bg-black border-t border-white/10">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-8 md:p-20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between sticky top-0 md:h-screen">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-6">SELECTED<br/>WORKS</h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                A curated selection of projects focusing on AI integration, generative systems, and proactive UX.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">01 — 03</div>
              <div className="w-full h-[1px] bg-white/10">
                <motion.div 
                  className="h-full bg-[#4fb7b3]" 
                  style={{ scaleX: scrollYProgress }} 
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            {PROJECTS.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-24 md:py-40 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter mb-8">THE AI DESIGN<br/>STRATEGY</h2>
            <p className="text-white/50 text-lg max-w-2xl font-light">
              Designing for AI requires a shift from deterministic flows to probabilistic systems. 
              My process focuses on trust, transparency, and human agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Brain />, title: 'Cognitive Mapping', desc: 'Understanding how users mentally model AI behavior to reduce friction and build trust.' },
              { icon: <Target />, title: 'Intent Strategy', desc: 'Defining the proactive capabilities of the system to ensure it adds value without being intrusive.' },
              { icon: <Sparkles />, title: 'Generative UX', desc: 'Creating fluid interfaces that adapt in real-time to user needs and contextual data.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm hover:border-[#4fb7b3]/50 transition-colors group"
              >
                <div className="text-[#4fb7b3] mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-40 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
              alt="image 4: Designer Portrait" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#4fb7b3] mb-2">Based in</div>
              <div className="text-2xl font-heading font-bold">SAN FRANCISCO</div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-10">PHILOSOPHY</h2>
            <div className="space-y-8 text-white/70 text-lg font-light leading-relaxed">
              <p>
                I believe that the best AI is invisible. It shouldn't feel like a tool you use, 
                but an extension of your own capabilities.
              </p>
              <p>
                With over 8 years of experience in product design and a deep focus on machine learning 
                interfaces, I help companies build products that are not only intelligent but also 
                deeply human-centric.
              </p>
              <div className="pt-10 flex flex-wrap gap-4">
                {['Product Strategy', 'AI/ML UX', 'Design Systems', 'Prototyping', 'User Research'].map(skill => (
                  <span key={skill} className="text-[10px] font-bold tracking-widest uppercase border border-white/20 px-4 py-2 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="py-20 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter mb-4">READY TO BUILD<br/>THE FUTURE?</h2>
            <a href="mailto:hello@eric.ai" className="text-[#4fb7b3] text-xl md:text-2xl font-light hover:text-white transition-colors">hello@eric.ai</a>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] text-white/20 uppercase">
          <p>© 2026 ERIC.AI — ALL RIGHTS RESERVED</p>
          <p>BUILT WITH INTELLIGENCE</p>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] rounded-3xl overflow-hidden flex flex-col md:flex-row border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left: Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={`image ${selectedProject.id}: ${selectedProject.title} Detail`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right: Content */}
              <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar">
                <div className="text-xs font-bold tracking-[0.3em] text-[#4fb7b3] uppercase mb-4">{selectedProject.category}</div>
                <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-8 uppercase">{selectedProject.title}</h2>
                
                <div className="mb-12">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-4 flex items-center gap-2">
                    <Target className="w-3 h-3" /> Strategy
                  </h4>
                  <p className="text-lg font-light text-white/80 leading-relaxed italic">
                    "{selectedProject.strategy}"
                  </p>
                </div>

                <div className="mb-12">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6">Design Process</h4>
                  <div className="space-y-8">
                    {selectedProject.process.map((step, i) => (
                      <div key={i} className="flex gap-6">
                        <div className="text-[10px] font-mono text-[#4fb7b3] mt-1">0{i+1}</div>
                        <div>
                          <div className="text-sm font-bold uppercase tracking-widest mb-2">{step.phase}</div>
                          <div className="text-sm text-white/50 leading-relaxed">{step.details}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-white/10">
                  <button 
                    onClick={() => navigateProject('prev')}
                    className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase hover:text-[#4fb7b3] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button 
                    onClick={() => navigateProject('next')}
                    className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase hover:text-[#4fb7b3] transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
