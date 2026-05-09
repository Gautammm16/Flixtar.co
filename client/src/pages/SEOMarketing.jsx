import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TrendingUp, PenTool, Film, BarChart3, Calendar, Target, Users, Mic, Play, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import CalendlyButton from '../components/CalendlyButton';
import VideoPopup from '../components/VideoPopup';

const css = `
.sh{min-height:80vh;display:flex;align-items:center;padding-top:120px;padding-bottom:60px;position:relative;overflow:hidden}
.sh::before{content:'';position:absolute;top:0;right:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(139,92,246,0.07),transparent 70%);filter:blur(100px);animation:float 20s ease infinite}
.sh-content{position:relative;z-index:1}
.sh-title{font-family:var(--font-display);font-size:clamp(2.4rem,6vw,4.8rem);font-weight:900;line-height:1.04;letter-spacing:-.04em;margin-bottom:22px}
.sh-sub{font-size:clamp(.94rem,1.4vw,1.06rem);color:var(--white-dim);max-width:540px;line-height:1.75;margin-bottom:36px}
.sh-stats{display:flex;gap:clamp(20px,4vw,40px);margin-top:44px;padding-top:32px;border-top:1px solid var(--line);flex-wrap:wrap}
.sh-met .v{font-family:var(--font-display);font-size:clamp(1.3rem,2.5vw,1.8rem);font-weight:800;background:var(--grad-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sh-met .l{font-size:.7rem;color:var(--white-muted);font-family:var(--font-mono);letter-spacing:.08em;text-transform:uppercase}

// .vsl-section{position:relative;padding-bottom:var(--section-pad)}
// .vsl-wrap{position:relative;overflow:hidden}
// .vsl-track{display:flex;transition:transform .6s var(--ease);will-change:transform}
// .vsl-slide{flex-shrink:0;width:100%;padding:0 clamp(16px,5vw,72px)}
// .vsl-inner{position:relative;border-radius:var(--r-xl);overflow:hidden;background:var(--bg-card);border:1px solid var(--line);cursor:pointer;transition:all .5s var(--ease);max-width:1060px;margin:0 auto}
// .vsl-inner:hover{border-color:var(--line-hover);box-shadow:0 32px 80px rgba(0,0,0,.5)}
// .vsl-vw{position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--bg-void)}
// .vsl-vw video{width:100%;height:100%;object-fit:cover}
// .vsl-play-btn{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:14px;z-index:2;pointer-events:none}
// .vsl-play-circle{width:clamp(52px,7vw,68px);height:clamp(52px,7vw,68px);border-radius:50%;background:var(--purple);display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(139,92,246,0.4);transition:all .4s var(--ease)}
// .vsl-inner:hover .vsl-play-circle{transform:scale(1.1);box-shadow:0 16px 48px rgba(139,92,246,0.5)}
// .vsl-play-text{font-family:var(--font-display);font-weight:700;font-size:clamp(.82rem,1.1vw,.95rem);color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.5)}
// .vsl-nav{position:absolute;top:50%;transform:translateY(-80%);z-index:10;width:clamp(42px,5vw,52px);height:clamp(42px,5vw,52px);border-radius:50%;background:rgba(6,6,11,.75);backdrop-filter:blur(12px);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--white);cursor:pointer;transition:all .35s var(--ease)}
// .vsl-nav:hover{background:var(--purple-glow);border-color:var(--purple);color:var(--purple);transform:translateY(-80%) scale(1.08)}
// .vsl-nav.disabled{opacity:.2;pointer-events:none}
// .vsl-nav-prev{left:clamp(8px,2vw,22px)}.vsl-nav-next{right:clamp(8px,2vw,22px)}
// .vsl-dots{display:flex;justify-content:center;gap:7px;margin-top:24px;align-items:center}
// .vsl-dot{width:8px;height:8px;border-radius:50%;background:var(--line);border:none;cursor:pointer;transition:all .35s var(--ease);padding:0}
// .vsl-dot.active{background:var(--purple);box-shadow:0 0 10px rgba(139,92,246,.4);width:28px;border-radius:4px}
// .vsl-counter{font-family:var(--font-mono);font-size:.7rem;color:var(--white-muted);margin-left:10px}

/* =========================
   VSL SECTION
========================= */

.vsl-section{
  position:relative;
  padding-bottom:var(--section-pad);
}

.vsl-wrap{
  position:relative;
  overflow:hidden;
}

/* SIDE FADE EFFECT */
.vsl-wrap::before,
.vsl-wrap::after{
  content:'';
  position:absolute;
  top:0;
  bottom:0;
  width:140px;
  z-index:5;
  pointer-events:none;
}

.vsl-wrap::before{
  left:0;
  background:linear-gradient(to right, rgba(0,0,0,.95), transparent);
}

.vsl-wrap::after{
  right:0;
  background:linear-gradient(to left, rgba(0,0,0,.95), transparent);
}


/* TRACK */
.vsl-track{
  display:flex;
  transition:transform .6s var(--ease);
  will-change:transform;
}

/* SLIDE */
.vsl-slide{
  flex-shrink:0;
  width:100%;
  padding:0 clamp(16px,5vw,72px);
}

/* CARD */
.vsl-inner{
  position:relative;
  border-radius:var(--r-xl);
  overflow:hidden;
  background:var(--bg-card);
  border:1px solid var(--line);
  cursor:pointer;
  transition:all .5s var(--ease);
  max-width:1060px;
  margin:0 auto;
}

.vsl-inner:hover{
  border-color:var(--line-hover);
  box-shadow:0 32px 80px rgba(0,0,0,.5);
  transform:translateY(-4px);
}

/* VIDEO WRAPPER */
.vsl-vw{
  position:relative;
  aspect-ratio:16/9;
  overflow:hidden;
  background:var(--bg-void);
}

.vsl-vw video{
  width:100%;
  height:100%;
  object-fit:cover;
}

/* PLAY BUTTON */
.vsl-play-btn{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  display:flex;
  align-items:center;
  gap:14px;
  z-index:2;
  pointer-events:none;
}

.vsl-play-circle{
  width:clamp(58px,7vw,76px);
  height:clamp(58px,7vw,76px);
  border-radius:50%;
  background:var(--purple);
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 12px 40px rgba(139,92,246,0.4);
  transition:all .4s var(--ease);
}

.vsl-inner:hover .vsl-play-circle{
  transform:scale(1.12);
  box-shadow:0 18px 60px rgba(139,92,246,.55);
}

.vsl-play-text{
  font-family:var(--font-display);
  font-weight:700;
  font-size:clamp(.82rem,1.1vw,.95rem);
  color:#fff;
  text-shadow:0 2px 10px rgba(0,0,0,.5);
}


/* =========================
   NAVIGATION BUTTONS
========================= */

.vsl-nav{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  z-index:20;

  width:64px;
  height:64px;
  border-radius:50%;

  background:rgba(139,92,246,.18);
  backdrop-filter:blur(14px);

  border:1px solid rgba(139,92,246,.35);

  display:flex;
  align-items:center;
  justify-content:center;

  color:#fff;
  cursor:pointer;

  transition:all .35s var(--ease);

  opacity:.95;

  box-shadow:0 10px 40px rgba(139,92,246,.18);
}

.vsl-nav svg{
  width:30px;
  height:30px;
}

.vsl-nav:hover{
  background:rgba(139,92,246,.32);
  border-color:var(--purple);
  color:#fff;

  transform:translateY(-50%) scale(1.12);

  box-shadow:0 16px 60px rgba(139,92,246,.35);
}

.vsl-nav.disabled{
  opacity:.25;
  pointer-events:none;
}

.vsl-nav-prev{
  left:28px;
}

.vsl-nav-next{
  right:28px;
}


/* =========================
   DOTS
========================= */

.vsl-dots{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:10px;
  margin-top:30px;
}

.vsl-dot{
  width:10px;
  height:10px;
  border-radius:999px;

  background:rgba(255,255,255,.2);

  border:none;
  cursor:pointer;

  transition:all .35s var(--ease);

  padding:0;
}

.vsl-dot:hover{
  background:rgba(255,255,255,.45);
  transform:scale(1.15);
}

.vsl-dot.active{
  width:42px;
  border-radius:999px;

  background:var(--purple);

  box-shadow:0 0 18px rgba(139,92,246,.55);
}

.vsl-counter{
  font-family:var(--font-mono);
  font-size:.78rem;
  color:var(--white-muted);
  margin-left:12px;
  opacity:.85;
}


/* =========================
   MOBILE
========================= */

@media(max-width:768px){

  .vsl-nav{
    width:48px;
    height:48px;
  }

  .vsl-nav svg{
    width:22px;
    height:22px;
  }

  .vsl-nav-prev{
    left:10px;
  }

  .vsl-nav-next{
    right:10px;
  }

  .vsl-wrap::before,
  .vsl-wrap::after{
    width:60px;
  }

  .vsl-play-text{
    display:none;
  }

  .vsl-slide{
    padding:0 10px;
  }
}

.ss-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(10px,1.4vw,14px);margin-top:40px}
.ss-card{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--r-md);padding:clamp(18px,2.2vw,28px);transition:all .4s var(--ease);position:relative;overflow:hidden}
.ss-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--grad-brand);transform:scaleX(0);transform-origin:left;transition:transform .4s var(--ease)}
.ss-card:hover{border-color:var(--line-hover);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.3)}.ss-card:hover::after{transform:scaleX(1)}
.ss-icon{width:42px;height:42px;border-radius:10px;background:var(--purple-glow);display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:var(--purple);transition:all .3s var(--ease-spring)}.ss-card:hover .ss-icon{transform:scale(1.12) rotate(-4deg)}
.ss-card h3{font-family:var(--font-display);font-size:clamp(.85rem,1vw,.95rem);font-weight:700;margin-bottom:6px}
.ss-card p{color:var(--white-dim);font-size:clamp(.76rem,.9vw,.82rem);line-height:1.65}

.sv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:clamp(10px,1.4vw,14px);margin-top:32px}
.sv-card{position:relative;border-radius:var(--r-lg);overflow:hidden;aspect-ratio:9/16;cursor:pointer;background:var(--bg-card);transition:transform .5s var(--ease),box-shadow .5s}
.sv-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,.55)}
.sv-card video{width:100%;height:100%;object-fit:cover}
.sv-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(.8);width:42px;height:42px;border-radius:50%;background:rgba(139,92,246,.9);display:flex;align-items:center;justify-content:center;opacity:0;transition:all .4s var(--ease);z-index:2}
.sv-card:hover .sv-play{opacity:1;transform:translate(-50%,-50%) scale(1)}

.seo-cta{background:var(--bg-card);border:1px solid var(--line-accent);border-radius:var(--r-xl);padding:clamp(36px,6vw,56px);text-align:center;position:relative;overflow:hidden}
.seo-cta::before{content:'';position:absolute;inset:0;background:var(--grad-glow);opacity:.5;pointer-events:none}
.seo-cta>*{position:relative;z-index:1}
.seo-cta h2{font-family:var(--font-display);font-size:clamp(1.5rem,3.5vw,2.4rem);font-weight:800;margin-bottom:12px}
.seo-cta p{color:var(--white-dim);max-width:440px;margin:0 auto 24px;line-height:1.75;font-size:clamp(.86rem,1.1vw,.92rem)}

@media(max-width:1200px){.ss-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:968px){.ss-grid{grid-template-columns:repeat(2,1fr)}.sh-stats{gap:20px}.vsl-play-text{display:none}}
@media(max-width:768px){.ss-grid{grid-template-columns:1fr 1fr}.sh-title{font-size:clamp(1.8rem,7vw,2.8rem)}.vsl-nav{width:38px;height:38px}}
@media(max-width:480px){.ss-grid{grid-template-columns:1fr}.sh-stats{flex-direction:column;gap:12px}.vsl-nav-prev{left:4px}.vsl-nav-next{right:4px}.vsl-slide{padding:0 10px}}
`;

const services = [
  { icon: <Target size={20}/>, title: 'Content Strategy', desc: 'Data-driven roadmaps.' },
  { icon: <PenTool size={20}/>, title: 'Script Writing', desc: 'Hooks that retain.' },
  { icon: <Film size={20}/>, title: 'Post Production', desc: 'Cinema-grade editing.' },
  { icon: <Calendar size={20}/>, title: 'Content Calendar', desc: 'Algorithm-optimized.' },
  { icon: <BarChart3 size={20}/>, title: 'Analytics & SEO', desc: 'Deep keyword optimization.' },
  { icon: <Users size={20}/>, title: 'Community Growth', desc: 'Build loyal audiences.' },
  { icon: <Mic size={20}/>, title: 'Podcast Production', desc: 'End-to-end management.' },
  { icon: <TrendingUp size={20}/>, title: 'Brand Identity', desc: 'Visual consistency.' },
];

const vslSlides = [
  {
    id: 5,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777877685/LLMWare_X_Intel_iaz9a9.mp4'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777884897/Saamir_mithwani_wnsum2.mp4'
  },
  {
    id: 1,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777877616/intro_vhslhv.mp4'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777877708/VSL_wp1jzj.mp4'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777877688/1_editing_course_g9eyxc.mp4'
  },
];

const shortVids = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878856/2_1_q4jkda.mp4'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878842/2_l0r0fu.mp4'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878854/3_iuvlqb.mp4'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878866/Anime_vt6kmb.mp4'
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878853/Finallll_abumf3.mp4'
  },
];

function VslCard({ v, onClick }) {
  const ref = useRef(null);
  return (
    <div className="vsl-slide">
      <div className="vsl-inner" onClick={onClick} onMouseEnter={() => ref.current?.play()} onMouseLeave={() => { ref.current?.pause(); if (ref.current) ref.current.currentTime = 0; }}>
        <div className="vsl-vw">
          <video ref={ref} src={v.url} muted loop playsInline preload="metadata" />
          <div className="vsl-play-btn"><div className="vsl-play-circle"><Play size={28} fill="#fff" color="#fff"/></div><span className="vsl-play-text">Watch Video</span></div>
        </div>
      </div>
    </div>
  );
}

function ShortCard({ v, onClick }) {
  const ref = useRef(null);
  return (
    <article className="sv-card" onClick={onClick} onMouseEnter={() => ref.current?.play()} onMouseLeave={() => { ref.current?.pause(); if (ref.current) ref.current.currentTime = 0; }}>
      <video ref={ref} src={v.url} muted loop playsInline preload="metadata" />
      <div className="sv-play"><Play size={16} fill="#fff" color="#fff"/></div>
    </article>
  );
}

const fade = (d = 0) => ({ initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: .7, delay: d, ease: [.16,1,.3,1] } });

export default function SEOMarketing() {
  const [vid, setVid] = useState(null);
  const [current, setCurrent] = useState(0);
  const [servRef, servIn] = useInView();
  const [svRef, svIn] = useInView();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const total = vslSlides.length;
  const goPrev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const goNext = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);
  useEffect(() => { const h = (e) => { if (e.key === 'ArrowLeft') goPrev(); if (e.key === 'ArrowRight') goNext(); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [goPrev, goNext]);

  return (<><style>{css}</style>
    <section className="sh">
      <div className="container"><header className="sh-content">
        <motion.div {...fade(.1)}><div className="label" style={{ marginBottom: 22 }}><TrendingUp size={13} /> SEO Marketing & Social Growth</div></motion.div>
        <motion.h1 className="sh-title" {...fade(.2)}>We Handle Your<br /><span className="gradient-text">Entire Content Engine.</span></motion.h1>
        <motion.p className="sh-sub" {...fade(.35)}>From content strategy and script writing to post-production and analytics  we manage your YouTube and Instagram so you can focus on building your brand.</motion.p>
        <motion.div {...fade(.5)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}><CalendlyButton text="Get Your Growth Plan" /><Link to="/case-studies" className="btn-ghost">See Results <ArrowRight size={16} /></Link></motion.div>
        {/* <motion.div className="sh-stats" {...fade(.65)}>{[{ v: '180K+', l: 'Avg Sub Growth' }, { v: '500%', l: 'Engagement' }, { v: '14M+', l: 'Views' }, { v: '90d', l: 'To Monetize' }].map((m, i) => (<div key={i} className="sh-met"><span className="v">{m.v}</span><span className="l">{m.l}</span></div>))}</motion.div> */}
      
      </header></div>
    </section>

    <section className="vsl-section section-pad">
      <div className="container" style={{ marginBottom: 36 }}><div className="label">Client Work</div><h2 className="section-title">VSL & Deep-Dive <span className="gradient-text">Videos</span></h2><p className="subhead">Full breakdowns of how we grew each client.</p></div>
      <div className="vsl-wrap">
        <button className={`vsl-nav vsl-nav-prev ${current === 0 ? 'disabled' : ''}`} onClick={goPrev}><ChevronLeft size={24} /></button>
        <div className="vsl-track" style={{ transform: `translateX(-${current * 100}%)` }}>{vslSlides.map(v => <VslCard key={v.id} v={v} onClick={() => setVid({ url: v.url, orientation: 'horizontal' })} />)}</div>
        <button className={`vsl-nav vsl-nav-next ${current === total - 1 ? 'disabled' : ''}`} onClick={goNext}><ChevronRight size={24} /></button>
      </div>
      <div className="vsl-dots">{vslSlides.map((_, i) => <button key={i} className={`vsl-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />)}<span className="vsl-counter">{current + 1}/{total}</span></div>
    </section>

    <section className="section-pad" ref={servRef}>
      <div className="container"><div className="label">What We Do</div><h2 className="section-title">Full-Service <span className="gradient-text">Content Management</span></h2><p className="subhead">We become your content team. End to end.</p>
        <div className="ss-grid" style={{ opacity: servIn ? 1 : 0, transform: servIn ? 'translateY(0)' : 'translateY(28px)', transition: 'all .7s var(--ease)' }}>{services.map((s, i) => (<article key={i} className="ss-card"><div className="ss-icon">{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p></article>))}</div>
      </div>
    </section>

    <section className="section-pad" ref={svRef}>
      <div className="container"><div className="label">Short-Form Content</div><h2 className="section-title">Reels & Shorts That <span className="gradient-text">Go Viral</span></h2>
        <div className="sv-grid" style={{ opacity: svIn ? 1 : 0, transform: svIn ? 'translateY(0)' : 'translateY(28px)', transition: 'all .7s var(--ease)' }}>{shortVids.map(v => <ShortCard key={v.id} v={v} onClick={() => setVid({ url: v.url, orientation: 'vertical' })} />)}</div>
      </div>
    </section>

    <section className="section-pad"><div className="container"><div className="seo-cta"><div className="label" style={{ justifyContent: 'center' }}>Let's Talk Growth</div><h2>Ready to Own Your <span className="gradient-text">Niche?</span></h2><p>Get a custom content strategy for your brand.</p><CalendlyButton text="Book Your Free Strategy Call" /></div></div></section>

    <VideoPopup isOpen={!!vid} onClose={() => setVid(null)} video={vid} />
  </>);
}
