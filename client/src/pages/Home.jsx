

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Play, Star, Zap, TrendingUp, DollarSign, Users, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import CalendlyButton from '../components/CalendlyButton';
import VideoPopup from '../components/VideoPopup';

const css = `
/* ═══ HERO ═══ */
.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding-top:72px}
.hero-bg{position:absolute;inset:0;z-index:0;overflow:hidden}
.hero-orb{position:absolute;border-radius:50%;filter:blur(100px);will-change:transform;animation:float 20s ease-in-out infinite}
.hero-orb-1{width:500px;height:500px;background:rgba(107,47,160,0.12);top:-15%;right:-8%;animation-duration:18s}
.hero-orb-2{width:350px;height:350px;background:rgba(0,194,255,0.08);bottom:5%;left:-5%;animation-duration:24s;animation-delay:-6s}
.hero-orb-3{width:240px;height:240px;background:rgba(139,92,246,0.1);top:50%;left:45%;animation-duration:22s;animation-delay:-12s}
.hero-mesh{position:absolute;inset:-20px;background-image:linear-gradient(rgba(139,92,246,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.025) 1px,transparent 1px);background-size:72px 72px;animation:meshDrift 30s linear infinite}
@keyframes meshDrift{0%{transform:translate(0,0)}100%{transform:translate(72px,72px)}}
.hero-content{position:relative;z-index:1;max-width:760px}
.hero-tag{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.15);border-radius:50px;font-family:var(--font-mono);font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;color:var(--purple);margin-bottom:28px}
.hero-tag svg{color:var(--cyan)}
.hero-h1{font-family:var(--font-display);font-size:clamp(2.8rem,7vw,5.6rem);font-weight:900;line-height:.98;letter-spacing:-.045em;margin-bottom:28px}
.hero-h1 .line{display:block;overflow:hidden}.hero-h1 .line span{display:inline-block;animation:slideUp .8s var(--ease) both}
.hero-h1 .line:nth-child(1) span{animation-delay:.15s}.hero-h1 .line:nth-child(2) span{animation-delay:.3s}
.hero-h1 .line:nth-child(3) span{animation-delay:.45s}
.hero-h1 .accent{background:var(--grad-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(.95rem,1.4vw,1.08rem);color:var(--white-dim);max-width:480px;line-height:1.75;margin-bottom:36px;font-weight:400}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap}
.hero-line{position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--grad-line)}
/* ═══ CLIENTS ═══ */
.clients{padding:56px 0;overflow:hidden}

/* 🔥 FIXED TITLE */
.clients-label{
  text-align:center;
  font-family:var(--font-mono);
  font-size:.82rem; /* increased */
  letter-spacing:.28em;
  text-transform:uppercase;
  color:var(--white-dim); /* more visible */
  margin-bottom:36px;
  font-weight:600;
}

.clients-track{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 0;width:100%;animation:none}
.client-item.dup{display:none}
.client-item{
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:0 36px;
  text-decoration:none;
  transition:all .4s var(--ease);
  opacity:1; /* 🔥 always visible */
}

/* 🔥 always visible */
.client-item:hover{opacity:1;transform:translateY(-4px)}

.client-logo-wrap{
  width:120px; /* bigger */
  height:120px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  border:1px solid var(--line);
  transition:all .4s var(--ease);
}

/* 🔥 LOGO FIX */
.client-logo-wrap.logo{
  background:#fff;
}
.client-logo-wrap.logo img{
  width:75%;
  height:75%;
  object-fit:contain;
  transform:scale(1.15); /* zoom */
}

/* 🔥 PERSON FIX */
.client-logo-wrap.person img{
  width:100%;
  height:100%;
  object-fit:cover;
  transform:scale(1.25); /* zoom into face */
}

/* highlight */
.client-item:hover .client-logo-wrap{
  border-color:var(--line-accent);
  box-shadow:0 12px 36px rgba(139,92,246,0.2);
}

.client-name{
  margin-top:12px;
  font-size:.8rem;
  color:var(--white-muted);
  font-weight:500;
  text-align:center;
  transition:color .3s;
}
.client-item:hover .client-name{color:var(--white)}

/* ═══ SERVICES ═══ */
.svc-head{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end;margin-bottom:48px}
.svc-desc{color:var(--white-dim);font-size:.94rem;line-height:1.75;max-width:440px;text-align:right;margin-left:auto}
.svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.svc-card{position:relative;border-radius:var(--r-xl);overflow:hidden;background:var(--bg-card);border:1px solid var(--line);padding:40px 32px;display:flex;flex-direction:column;min-height:420px;transition:all .5s var(--ease);cursor:pointer;text-decoration:none;color:inherit}
.svc-card::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .5s;pointer-events:none}
.svc-card.seo::before{background:linear-gradient(135deg,rgba(139,92,246,0.08),transparent 60%)}
.svc-card.ugc::before{background:linear-gradient(135deg,rgba(0,194,255,0.08),transparent 60%)}
.svc-card:hover{border-color:var(--line-hover);transform:translateY(-6px);box-shadow:0 28px 72px rgba(0,0,0,0.5)}
.svc-card:hover::before{opacity:1}
.svc-card>*{position:relative;z-index:1}
.svc-num{font-family:var(--font-mono);font-size:.62rem;color:var(--white-muted);letter-spacing:.15em;margin-bottom:24px}
.svc-icon{width:52px;height:52px;border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;margin-bottom:28px;transition:transform .4s var(--ease-spring)}
.svc-card:hover .svc-icon{transform:scale(1.1) rotate(-4deg)}
.svc-card.seo .svc-icon{background:rgba(139,92,246,0.08);color:var(--purple)}
.svc-card.ugc .svc-icon{background:rgba(0,194,255,0.08);color:var(--cyan)}
.svc-card h3{font-family:var(--font-display);font-size:1.5rem;font-weight:800;margin-bottom:14px;line-height:1.15;letter-spacing:-.02em}
.svc-card p{color:var(--white-dim);line-height:1.75;margin-bottom:24px;flex:1;font-size:.9rem}
.svc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:28px}
.svc-tag{padding:4px 12px;background:rgba(139,92,246,0.04);border:1px solid var(--line);border-radius:50px;font-size:.68rem;color:var(--white-dim);font-family:var(--font-mono);transition:all .3s}
.svc-card:hover .svc-tag{border-color:var(--line-hover);color:var(--white)}
.svc-link{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-weight:700;font-size:.9rem;transition:gap .35s var(--ease)}
.svc-card.seo .svc-link{color:var(--purple)}.svc-card.ugc .svc-link{color:var(--cyan)}
.svc-card:hover .svc-link{gap:14px}
.results-custom{
  margin-top:40px;
  display:flex;
  flex-direction:column;
  gap:28px;
}

.results-row{
  display:grid;
  gap:20px;
}

.row-3{
  grid-template-columns:repeat(3,1fr);
}

.row-2{
  grid-template-columns:repeat(2,1fr);
  justify-content:center;
}

.result-box{
  position:relative;
  border-radius:18px;
  overflow:hidden;
  cursor:pointer;
  background:var(--bg-card);
  border:1px solid var(--line);
  transition:all .4s ease;
}

.result-box:hover{
  transform:translateY(-6px);
  box-shadow:0 20px 50px rgba(0,0,0,.4);
}

.result-box img{
  width:100%;
  height:100%;
  object-fit:cover;
}

/* UPDATED */
.result-box.large{
  height:auto; /* remove fixed huge height */
  aspect-ratio:16/9; /* keeps proper proportion */
  padding:12px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#111;
}

.result-box.large img{
  width:100%;
  height:100%;
  object-fit:contain; /* prevents crop */
  transform:scale(0.96); /* subtle zoom out */
}

/* REMOVE THIS COMPLETELY */
/*
.result-box.zoomed-out{
  height: 320px;
  overflow: hidden;
  border-radius: 20px;
  background: #111;
  display:flex;
  align-items:center;
  justify-content:center;
}

.result-box.zoomed-out img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: scale(0.92);
}
*/

.result-title{
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  padding:16px;
  background:linear-gradient(to top, rgba(0,0,0,.8), transparent);
  color:#fff;
  font-weight:700;
  font-size:14px;
}

@media(max-width:768px){
  .row-3{
    grid-template-columns:1fr;
  }

  .row-2{
    grid-template-columns:1fr;
  }

  .result-box.large{
    height:auto;
  }
}

/* ═══ PROOF LIGHTBOX ═══ */
.lb-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92);backdrop-filter:blur(16px);opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s}
.lb-overlay.open{opacity:1;visibility:visible}
.lb-content{position:relative;max-width:90vw;max-height:90vh;display:flex;align-items:center;justify-content:center;transform:scale(.92);transition:transform .4s cubic-bezier(.16,1,.3,1)}
.lb-overlay.open .lb-content{transform:scale(1)}
.lb-content img{max-width:100%;max-height:85vh;border-radius:var(--r-lg);object-fit:contain;box-shadow:0 40px 100px rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.06)}
.lb-close{position:fixed;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:background .3s,transform .3s}.lb-close:hover{background:rgba(255,255,255,.18);transform:scale(1.1)}
.lb-nav{position:fixed;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:background .3s,transform .3s}.lb-nav:hover{background:rgba(255,255,255,.18);transform:translateY(-50%) scale(1.1)}
.lb-prev{left:20px}
.lb-next{right:20px}
.lb-counter{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);font-family:var(--font-mono);font-size:.72rem;letter-spacing:.1em;color:rgba(255,255,255,.5);z-index:10}

/* ═══ RESULTS ═══ */
.results-section{position:relative;overflow:hidden}
.results-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(139,92,246,0.04),transparent 70%)}
.results-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:40px}
.result-card{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--r-lg);padding:32px;text-align:center;transition:all .45s var(--ease)}
.result-card:hover{border-color:var(--line-accent);transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,.35)}
.result-icon{width:44px;height:44px;border-radius:12px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center}
.result-card:nth-child(1) .result-icon{background:rgba(139,92,246,.08);color:var(--purple)}
.result-card:nth-child(2) .result-icon{background:rgba(0,194,255,.08);color:var(--cyan)}
.result-card:nth-child(3) .result-icon{background:rgba(34,197,94,.08);color:#22C55E}
.result-card:nth-child(4) .result-icon{background:rgba(139,92,246,.08);color:var(--purple)}
.result-num{font-family:var(--font-display);font-size:2rem;font-weight:800;background:var(--grad-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px}
.result-card h4{font-family:var(--font-display);font-weight:700;font-size:.88rem;margin-bottom:3px}
.result-card p{color:var(--white-muted);font-size:.76rem}

/* ═══ TESTIMONIALS ═══ */
.test-wrap{padding:28px 0;overflow:visible}
.test-track{display:flex;gap:16px;padding:0 clamp(16px,4vw,40px);justify-content:center}
.test-card{flex:1 1 0;min-width:0;max-width:230px;border-radius:var(--r-lg);overflow:hidden;background:var(--bg-card);border:1px solid var(--line);transition:all .45s var(--ease)}
.test-card:hover{transform:translateY(-8px);border-color:var(--line-accent);box-shadow:0 28px 72px rgba(0,0,0,.5)}
.test-img{width:100%;aspect-ratio:9/16;position:relative;overflow:hidden}
.test-video{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
.test-card:hover .test-video{transform:scale(1.04)}
.video-gradient{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,6,11,0.9),transparent 50%);pointer-events:none}
.video-name{position:absolute;bottom:14px;left:14px;color:#fff;font-size:13px;font-weight:600;z-index:2}
.test-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;border-radius:50%;background:rgba(139,92,246,0.9);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 32px rgba(139,92,246,0.35);transition:.35s var(--ease);z-index:3;opacity:0}
.test-card:hover .test-play{opacity:1;transform:translate(-50%,-50%) scale(1.05)}
.test-body{padding:14px 16px}
.test-stars{display:flex;gap:2px;margin-bottom:6px;color:#FBBF24}
.test-name{font-family:var(--font-display);font-weight:700;font-size:.78rem}
.test-role{font-size:.68rem;color:var(--white-muted)}

/* ═══ CTA ═══ */
.cta-section{position:relative;text-align:center;overflow:hidden}
.cta-section::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:500px;background:radial-gradient(circle,rgba(139,92,246,0.06),transparent 70%);border-radius:50%;filter:blur(80px)}
.cta-content{position:relative;z-index:1}
.cta-title{font-family:var(--font-display);font-size:clamp(2rem,5vw,3.8rem);font-weight:800;letter-spacing:-.03em;line-height:1.06;margin-bottom:16px}
.cta-sub{color:var(--white-dim);font-size:1rem;max-width:440px;margin:0 auto 32px;font-weight:400;line-height:1.75}
.cta-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}

/* ═══ RESPONSIVE ═══ */
@media(max-width:968px){
  .results-grid{grid-template-columns:1fr 1fr}
  .svc-grid{grid-template-columns:1fr}.svc-card{min-height:auto;padding:32px 24px}
  .svc-head{grid-template-columns:1fr;gap:12px}.svc-desc{text-align:left;margin-left:0}
  .test-card{max-width:180px}
  .proof-bento{grid-template-columns:repeat(2,1fr);grid-auto-rows:120px}
  .proof-item:nth-child(1){grid-column:span 1;grid-row:span 3}
  .proof-item:nth-child(2){grid-column:span 1;grid-row:span 3}
  .proof-item:nth-child(3){grid-column:span 2;grid-row:span 2}
  .proof-item:nth-child(4){grid-column:span 2;grid-row:span 2}
  .proof-item:nth-child(5){grid-column:span 1;grid-row:span 2}
  .proof-item:nth-child(6){grid-column:span 1;grid-row:span 2}
  .proof-item:nth-child(7){grid-column:span 2;grid-row:span 2}
}
@media(max-width:768px){
  .hero-h1{font-size:clamp(2.2rem,9vw,3.5rem)}
  .test-track{flex-direction:column!important;width:100%!important;padding:0 20px!important;gap:14px!important}
  .test-card{width:100%!important;max-width:320px!important;margin:0 auto;flex:none!important}
  .test-img{aspect-ratio:9/14!important}
  .test-wrap{overflow-x:hidden!important}
  .clients-track{flex-wrap:nowrap;width:max-content;animation:marquee 25s linear infinite;justify-content:flex-start}
  .client-item.dup{display:flex}
  .client-logo-wrap{width:80px;height:80px}
  .client-item{margin:0 24px}
  .lb-prev{left:10px}.lb-next{right:10px}
}
@media(max-width:480px){
  .hero-actions{flex-direction:column}
  .results-grid{grid-template-columns:1fr}
  .test-card{max-width:100%!important}
  .client-logo-wrap{width:68px;height:68px}
  .client-item{margin:0 18px}
  .proof-bento{grid-template-columns:1fr;grid-auto-rows:auto}
  .proof-item:nth-child(1),.proof-item:nth-child(2),.proof-item:nth-child(3),
  .proof-item:nth-child(4),.proof-item:nth-child(5),.proof-item:nth-child(6),
  .proof-item:nth-child(7){grid-column:span 1;grid-row:span 1}
  .proof-item img{height:auto}
}
`;

const clients = [
  { name: "Ilmware", logo: "https://res.cloudinary.com/dgtc1q3ae/image/upload/v1749464744/82b53084794726b60ec28283bac7_ytm2uf.png", link: "https://www.youtube.com/@llmware/featured", type: "logo" },
  { name: "Intel", logo: "https://res.cloudinary.com/dgtc1q3ae/image/upload/v1749464745/intel_yoyfi7.png", link: "https://llmware.ai/intel", type: "logo" },
  { name: "Shopify", logo: "https://res.cloudinary.com/dgtc1q3ae/image/upload/v1749464744/SHOPIFY_gvndfu.png", link: "https://www.instagram.com/shopify/", type: "logo" },
  { name: "222 Agency", logo: "https://res.cloudinary.com/dgtc1q3ae/image/upload/v1749464744/222_agencyt_jxs10h.png", link: "https://www.222agency.co/", type: "logo" },
  { name: "Rooter", logo: "https://res.cloudinary.com/dgtc1q3ae/image/upload/v1749464744/rooter_nffh5d.png", link: "https://www.instagram.com/rooter.gg/", type: "logo" },
  { name: "Saamir Mithwani", logo: "https://res.cloudinary.com/dgtc1q3ae/image/upload/v1749464748/saamir_dxvi0u.png", link: "https://www.instagram.com/saamirir/", type: "person" },
  { name: "Ankit Arora", logo: "https://res.cloudinary.com/dgtc1q3ae/image/upload/v1749464745/ai_ankit_ox37to.png", link: "https://www.instagram.com/ai_ankitarora/", type: "person" },
];

const proofImages = [
  { src: '/images/proof/1.png', alt: 'Saamir Mithwani — Follower Growth' },
  { src: '/images/proof/2.png', alt: 'Section 8 Karim — Instagram Growth' },
  { src: '/images/proof/3.png', alt: 'Client Brand — Channel Growth' },
  { src: '/images/proof/4.jpg', alt: 'Analytics — Engagement Trends' },
  { src: '/images/proof/5.png', alt: 'YouTube Analytics — 97K Views' },
  { src: '/images/proof/6.png', alt: 'Instagram — Product Research Reel' },
  { src: '/images/proof/7.png', alt: 'YouTube Analytics — Millions of Views' },
  { src: '/images/proof/8.png', alt: 'Viral Views' },
];

const results = [
  { icon: <Users size={20}/>, n: '150+', h: 'Brands Scaled', p: 'Across 20+ industries' },
  { icon: <Eye size={20}/>, n: '500M+', h: 'Views Generated', p: 'YouTube + Instagram' },
  { icon: <DollarSign size={20}/>, n: '$12M+', h: 'Revenue Driven', p: 'For our clients' },
  { icon: <TrendingUp size={20}/>, n: '4.2x', h: 'Avg. ROAS', p: 'On Meta campaigns' },
];


const testimonials = [
  {
    name: 'Darren',
    title: 'EX Vice President HCL Technologies',
    video: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777878822/darren_bpd1vp.mp4',
    orientation: 'vertical'
  },
  {
    name: 'Isuru Warakagoda',
    title: 'Founder Exyme Media',
    video: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777878823/exyme_kzdirt.mp4',
    orientation: 'vertical'
  },
  {
    name: 'Saamir Mithwani',
    title: 'Ecom Dropshipper',
    video: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777878835/saamir_n9hmmj.mp4',
    orientation: 'vertical'
  },
  {
    name: 'Alex',
    title: 'Amazon Expert',
    video: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777878792/alex_ssrl7s.mp4',
    orientation: 'vertical'
  },
  {
    name: 'Namee',
    title: 'CEO LLMWARE',
    video: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/v1777878807/namee_zn0abh.mp4',
    orientation: 'vertical'
  },
];

/* ═══ PROOF LIGHTBOX ═══ */
function ProofLightbox({ isOpen, onClose, images, activeIndex, setActiveIndex }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + images.length) % images.length);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, setActiveIndex, images.length]);

  if (!isOpen) return null;

  return (
    <div className={`lb-overlay${isOpen ? ' open' : ''}`} onClick={onClose}>
      <button className="lb-close" onClick={onClose}><X size={18} color="#fff" /></button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); setActiveIndex(i => (i - 1 + images.length) % images.length); }}>
        <ChevronLeft size={20} color="#fff" />
      </button>
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        <img src={images[activeIndex].src} alt={images[activeIndex].alt} />
      </div>
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); setActiveIndex(i => (i + 1) % images.length); }}>
        <ChevronRight size={20} color="#fff" />
      </button>
      <div className="lb-counter">{activeIndex + 1} / {images.length}</div>
    </div>
  );
}

function TestimonialCard({ t, onClick }) {
  const videoRef = useRef(null);
  return (
    <article className="test-card">
      <div className="test-img"
        onMouseEnter={() => { setTimeout(() => videoRef.current?.play(), 120); }}
        onMouseLeave={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; }}
        onClick={onClick}>
        <video ref={videoRef} src={t.video} className="test-video" muted loop playsInline preload="metadata" />
        <div className="video-gradient" />
        <div className="video-name">{t.name}</div>
        <div className="test-play"><Play size={18} fill="#fff" /></div>
      </div>
      <div className="test-body">
        <div className="test-stars">{[...Array(5)].map((_, j) => <Star key={j} size={11} fill="currentColor" strokeWidth={0} />)}</div>
        <div className="test-name">{t.name}</div>
        <div className="test-role">{t.title}</div>
      </div>
    </article>
  );
}

const fade = (d = 0) => ({ initial: { y: 32, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: .7, delay: d, ease: [.16,1,.3,1] } });

export default function Home() {
  const [vid, setVid] = useState(null);
  const [resRef, resIn] = useInView();
  const [ctaRef, ctaIn] = useInView();
  const [proofRef, proofIn] = useInView();
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openLightbox = useCallback((index) => {
    setLbIndex(index);
    setLbOpen(true);
  }, []);

  return (<><style>{css}</style>
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-mesh" />
        <div className="hero-orb hero-orb-1" /><div className="hero-orb hero-orb-2" /><div className="hero-orb hero-orb-3" />
      </div>
      <div className="container">
        <header className="hero-content">
          <motion.div {...fade(.1)}><div className="hero-tag"><Zap size={13} /> Content, Distribution & AI System</div></motion.div>
          <motion.h1 className="hero-h1" {...fade(.2)}>
            <span className="line"><span>Content Creates Attention.</span></span>
            <span className="line"><span>AI + Distribution</span></span>
            <span className="line"><span className="accent">Turn It Into Revenue.</span></span>
          </motion.h1>
          <motion.p className="hero-sub" {...fade(.4)}>From viral social media strategies to AI-powered UGC ads  we help brands and creators build audiences that buy, not just scroll.</motion.p>
          <motion.div className="hero-actions" {...fade(.55)}>
            <CalendlyButton />
            <Link to="/case-studies" className="btn-ghost"><span>See Case Studies</span> <ArrowRight size={16} /></Link>
          </motion.div>
        </header>
      </div>
      <div className="hero-line" />
    </section>

    <div className="clients">
      <div className="clients-label">Trusted by brands worldwide</div>
      <div className="clients-track">
        {[...clients, ...clients].map((c, i) => (
          <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className={`client-item${i >= clients.length ? ' dup' : ''}`}>
            <div className={`client-logo-wrap ${c.type}`}><img src={c.logo} alt={c.name} loading="lazy" decoding="async" /></div>
            <div className="client-name">{c.name}</div>
          </a>
        ))}
      </div>
    </div>

    <section className="section-pad">
      <div className="container">
        <div className="svc-head">
          <div><div className="label">What We Do</div><h2 className="section-title">Two Engines.<br /><span className="gradient-text">One Mission: Growth.</span></h2></div>
          <p className="svc-desc">Choose your growth path  organic authority or scalable performance advertising. We execute both with relentless precision.</p>
        </div>
        <div className="svc-grid">
          <Link to="/content-growth" className="svc-card seo">
            <div className="svc-num">01</div>
            <div className="svc-icon"><TrendingUp size={26} /></div>
            <h3>Content Growth &<br />Social Growth</h3>
            <p>We become your brand's content engine. Strategy, scripting, editing, posting  everything to dominate YouTube and Instagram.</p>
            <div className="svc-tags">{['Content Strategy','Script Writing','Post Production','YouTube SEO','Instagram Growth','Analytics'].map(t => <span key={t} className="svc-tag">{t}</span>)}</div>
            <div className="svc-link">Explore Content Growth <ArrowUpRight size={18} /></div>
          </Link>
          <Link to="/ai-ugc" className="svc-card ugc">
            <div className="svc-num">02</div>
            <div className="svc-icon"><Zap size={26} /></div>
            <h3>AI UGC Content &<br />Meta Ads</h3>
            <p>AI-generated UGC that converts. Scroll-stopping ad creatives at a fraction of the cost — scaled across Meta platforms.</p>
            <div className="svc-tags">{['AI UGC Videos','Meta Campaigns','Creative Testing','Performance','Cost Optimization','Scaling'].map(t => <span key={t} className="svc-tag">{t}</span>)}</div>
            <div className="svc-link">Explore AI UGC <ArrowUpRight size={18} /></div>
          </Link>
        </div>
      </div>
    </section>

    <section className="section-pad" ref={proofRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
          <div className="label" style={{ justifyContent: 'center' }}>Proof</div>
          <h2 className="section-title">Real Results, <span className="gradient-text">Real Screenshots</span></h2>
          <p className="subhead" style={{ margin: '12px auto 0' }}>Direct from our analytics dashboards.</p>
        </div>
     <div className="results-custom">

  {/* ROW 1 */}
  <div className="results-row row-3">
    {proofImages.slice(0, 3).map((img, i) => (
      <div key={i} className="result-box" onClick={() => openLightbox(i)}>
        <img src={img.src} alt={img.alt} />
        <div className="result-title">{img.alt}</div>
      </div>
    ))}
  </div>

{/* ROW 2 */}
<div className="results-row row-2">
  {proofImages.slice(3, 5).map((img, i) => (
    <div
      key={i}
      className="result-box large"
      onClick={() => openLightbox(i + 3)}
    >
      <img src={img.src} alt={img.alt} />
    </div>
  ))}
</div>

  {/* ROW 3 */}
  <div className="results-row row-3">
    {proofImages.slice(5, 8).map((img, i) => (
      <div key={i} className="result-box" onClick={() => openLightbox(i + 5)}>
        <img src={img.src} alt={img.alt} />
      </div>
    ))}
  </div>

</div>
      </div>
    </section>

    <section className="section-pad results-section" ref={resRef}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <div className="label" style={{ justifyContent: 'center' }}>Results</div>
          <h2 className="section-title">Numbers Don't <span className="gradient-text">Lie</span></h2>
        </div>
        <div className="results-grid">
          {results.map((r, i) => (
            <div key={i} className="result-card" style={{ opacity: resIn ? 1 : 0, transform: resIn ? 'translateY(0)' : 'translateY(24px)', transition: `all .6s var(--ease) ${i * .1}s` }}>
              <div className="result-icon">{r.icon}</div>
              <div className="result-num">{r.n}</div>
              <h4>{r.h}</h4><p>{r.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad">
      <div className="container" style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="label" style={{ justifyContent: 'center' }}>Testimonials</div>
        <h2 className="section-title">What Our Clients <span className="gradient-text">Say</span></h2>
      </div>
      <div className="test-wrap">
        <div className="test-track">
          {testimonials.map((t, i) => <TestimonialCard key={i} t={t} onClick={() => setVid({ url: t.video, title: t.name, orientation: 'vertical' })} />)}
        </div>
      </div>
    </section>

    <section className="cta-section section-pad" ref={ctaRef}>
      <div className="container">
        <div className="cta-content" style={{ opacity: ctaIn ? 1 : 0, transform: ctaIn ? 'translateY(0)' : 'translateY(28px)', transition: 'all .7s var(--ease)' }}>
          <div className="label" style={{ justifyContent: 'center' }}>Ready to Scale?</div>
          <h2 className="cta-title">Stop Scrolling.<br /><span className="gradient-text">Start Scaling.</span></h2>
          <p className="cta-sub">Join 150+ brands that chose growth over guesswork.</p>
          <div className="cta-actions"><CalendlyButton text="Book Your Free Call Now" /></div>
        </div>
      </div>
    </section>

    <VideoPopup isOpen={!!vid} onClose={() => setVid(null)} video={vid} />
    <ProofLightbox isOpen={lbOpen} onClose={() => setLbOpen(false)} images={proofImages} activeIndex={lbIndex} setActiveIndex={setLbIndex} />
  </>);
}
