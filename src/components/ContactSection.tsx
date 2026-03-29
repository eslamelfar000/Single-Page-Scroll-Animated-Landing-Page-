import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned large heading that zooms
      gsap.fromTo(
        headingRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.contact-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = document.querySelector('.submit-btn') as HTMLButtonElement;
    if (btn) {
      gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    }
    setForm({ name: '', email: '', project: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-8 relative overflow-hidden"
      style={{ background: 'hsl(222 25% 4%)' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(185 100% 55% / 0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-label mb-6">Let's Connect</p>
          <h2
            ref={headingRef}
            className="display-text"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700,
              opacity: 0,
              lineHeight: '1',
            }}
          >
            Start your next<br />
            <span className="gradient-text">great project</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="contact-item" style={{ opacity: 0 }}>
              <p className="section-label mb-3">Email</p>
              <a
                href="mailto:hello@luminis.studio"
                className="text-lg hover:text-[hsl(var(--primary))] transition-colors duration-300 cursor-none"
              >
                hello@luminis.studio
              </a>
            </div>
            <div className="contact-item" style={{ opacity: 0 }}>
              <p className="section-label mb-3">Location</p>
              <p className="text-[hsl(var(--muted-foreground))]">London, United Kingdom<br />Working globally</p>
            </div>
            <div className="contact-item" style={{ opacity: 0 }}>
              <p className="section-label mb-3">Follow</p>
              <div className="flex gap-6">
                {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble'].map(social => (
                  <a
                    key={social}
                    href="#"
                    className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300 cursor-none"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative element */}
            <div
              className="contact-item hidden lg:block"
              style={{ opacity: 0 }}
            >
              <div
                className="h-40 w-full relative overflow-hidden"
                style={{ borderRadius: '4px', background: 'hsl(222 25% 7%)' }}
              >
                <div
                  className="absolute top-6 left-6 w-8 h-8 border border-[hsl(var(--primary)/0.3)]"
                  style={{ borderRadius: '2px' }}
                />
                <div
                  className="absolute bottom-6 right-6 w-6 h-6 rounded-full border border-[hsl(var(--accent)/0.3)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase text-center px-8">
                    "Design is not how it looks,<br />but how it works."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form className="contact-form space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="contact-item" style={{ opacity: 0 }}>
                  <label className="section-label block mb-3">Your Name</label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="form-input"
                    required
                  />
                </div>
                <div className="contact-item" style={{ opacity: 0 }}>
                  <label className="section-label block mb-3">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="contact-item" style={{ opacity: 0 }}>
                <label className="section-label block mb-3">Project Type</label>
                <select
                  value={form.project}
                  onChange={e => setForm(f => ({ ...f, project: e.target.value }))}
                  className="form-input"
                  style={{ background: 'transparent', cursor: 'none' }}
                >
                  <option value="" style={{ background: 'hsl(222 25% 5%)' }}>Select a service...</option>
                  <option style={{ background: 'hsl(222 25% 5%)' }}>Brand Identity</option>
                  <option style={{ background: 'hsl(222 25% 5%)' }}>Web Experience</option>
                  <option style={{ background: 'hsl(222 25% 5%)' }}>Motion Design</option>
                  <option style={{ background: 'hsl(222 25% 5%)' }}>Creative Direction</option>
                  <option style={{ background: 'hsl(222 25% 5%)' }}>Something else</option>
                </select>
              </div>

              <div className="contact-item" style={{ opacity: 0 }}>
                <label className="section-label block mb-3">Tell Us About Your Project</label>
                <textarea
                  placeholder="Describe your project, goals, timeline..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="form-input"
                  rows={4}
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="contact-item" style={{ opacity: 0 }}>
                <button type="submit" className="btn-primary submit-btn w-full justify-center py-4">
                  <span>Send Message</span>
                  <span className="text-lg">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
