import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendlyButton from './CalendlyButton';

const css = `
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;transition:all .5s var(--ease)}
.nav-glass{background:rgba(6,6,11,0.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--line)}
.nav-in{max-width:var(--max-w);margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 clamp(20px,5vw,56px)}
.nav-logo{font-family:var(--font-display);font-size:1.35rem;font-weight:800;letter-spacing:-.02em;display:flex;align-items:center;gap:2px;transition:opacity .3s;background:var(--grad-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.nav-logo:hover{opacity:.8}
.nav-links{display:flex;align-items:center;gap:32px;list-style:none}
.nav-links a{font-family:var(--font-body);font-size:.84rem;font-weight:500;color:var(--white-dim);transition:color .3s;position:relative}
.nav-links a:hover,.nav-links a.on{color:var(--white)}
.nav-links a.on::after{content:'';position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:16px;height:2px;background:var(--purple);border-radius:1px}
.nav-cta .btn-primary{padding:9px 20px!important;font-size:.8rem!important;border-radius:10px!important}
.mob-btn{display:none;color:var(--white);padding:8px;border-radius:var(--r-sm);transition:background .3s}
.mob-btn:hover{background:rgba(139,92,246,.08)}
.mob-ov{position:fixed;inset:0;background:rgba(4,4,8,.97);backdrop-filter:blur(24px);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px}
.mob-ov a{font-family:var(--font-display);font-size:1.6rem;font-weight:700;color:var(--white);transition:color .3s}
.mob-ov a:hover{color:var(--purple)}
@media(max-width:968px){.nav-links{display:none}.mob-btn{display:block}}
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { setOpen(false); }, [loc]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const is = (p) => loc.pathname === p ? 'on' : '';

  return (<><style>{css}</style>
    <motion.nav className={`nav ${scrolled ? 'nav-glass' : ''}`} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [.16,1,.3,1] }}>
      <div className="nav-in">
        <Link to="/" className="nav-logo">FLIXTAR</Link>
        <ul className="nav-links">
          <li><Link to="/" className={is('/')}>Home</Link></li>
          <li><Link to="/content-growth" className={is('/contnet-growth')}>Content Growth</Link></li>
          <li><Link to="/ai-ugc" className={is('/ai-ugc')}>AI UGC Ads</Link></li>
          <li><Link to="/case-studies" className={is('/case-studies')}>Case Studies</Link></li>
          <li className="nav-cta"><CalendlyButton text="Book a Call" /></li>
        </ul>
        <button className="mob-btn" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={24}/> : <Menu size={24}/>}</button>
      </div>
    </motion.nav>
    <AnimatePresence>
      {open && (
        <motion.div className="mob-ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
          {['/','/content-growth','/ai-ugc','/case-studies'].map((p, i) => (
            <motion.div key={p} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * .08, duration: .4 }}>
              <Link to={p} onClick={() => setOpen(false)}>{p === '/' ? 'Home' : p === '/contnet-growth' ? 'Content Growth' : p === '/ai-ugc' ? 'AI UGC' : 'Case Studies'}</Link>
            </motion.div>
          ))}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .35 }}><CalendlyButton text="Book a Call" /></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>);
}
