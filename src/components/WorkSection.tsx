import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'Aether Platform',
    category: 'Web Design & Development',
    year: '2026',
    color: 'hsl(185 40% 10%)',
    accent: 'hsl(185 100% 55%)',
    description: 'A next-generation SaaS platform with fluid micro-interactions and a design system built for scale.',
  },
  {
    id: '02',
    title: 'Solara Brand',
    category: 'Brand Identity & Motion',
    year: '2026',
    color: 'hsl(340 40% 10%)',
    accent: 'hsl(340 85% 62%)',
    description: 'Complete visual identity for a solar energy startup — from logo to full digital ecosystem.',
  },
  {
    id: '03',
    title: 'Nox Gallery',
    category: '3D Art & Experience',
    year: '2023',
    color: 'hsl(270 30% 12%)',
    accent: 'hsl(270 60% 60%)',
    description: 'An immersive 3D art gallery experience with WebGL rendering and custom shader effects.',
  },
  {
    id: '04',
    title: 'Pulse Analytics',
    category: 'UX Design & Strategy',
    year: '2023',
    color: 'hsl(150 30% 10%)',
    accent: 'hsl(150 60% 45%)',
    description: 'Redesigning how teams understand data — a human-centered approach to complex analytics.',
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
          delay: index * 0.1,
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="project-card group relative overflow-hidden"
      style={{ opacity: 0, borderRadius: '4px' }}
    >
      {/* Background */}
      <div
        className="aspect-[4/3] w-full relative overflow-hidden project-card-img"
        style={{ background: `linear-gradient(135deg, ${project.color} 0%, hsl(222 25% 5%) 100%)` }}
      >
        {/* Decorative shapes */}
        <div
          className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full opacity-30 project-card-img"
          style={{
            background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${project.accent}40 1px, transparent 1px), linear-gradient(90deg, ${project.accent}40 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Number */}
        <div
          className="absolute top-6 left-6 font-mono text-xs tracking-widest"
          style={{ color: `${project.accent}80` }}
        >
          {project.id}
        </div>

        {/* Animated accent line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
          style={{ background: project.accent }}
        />

        {/* Overlay */}
        <div className="project-card-overlay" />

        {/* Content on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: project.accent }}>
            {project.category}
          </p>
          <p className="text-sm text-[hsl(var(--foreground)/0.8)] leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div className="p-6 border border-[hsl(var(--border))] border-t-0">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono">{project.year}</span>
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{project.category}</p>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [labelRef.current, titleRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-32 px-8 max-w-7xl mx-auto">
      <div className="mb-20">
        <p ref={labelRef} className="section-label mb-4" style={{ opacity: 0 }}>Selected Work</p>
        <div className="flex items-end justify-between">
          <h2
            ref={titleRef}
            className="display-text"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, opacity: 0 }}
          >
            Our latest<br />
            <span className="gradient-text">projects</span>
          </h2>
          <button className="btn-outline hidden md:flex" onClick={() => {}}>
            <span>View All</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
