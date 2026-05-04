// import React, { useEffect } from 'react';
// import { TrendingUp, Users, Eye, DollarSign, ArrowRight, FileText } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useInView } from '../hooks/useInView';
// import CalendlyButton from '../components/CalendlyButton';

// const css = `
// .cs-hero{min-height:50vh;display:flex;align-items:center;padding-top:110px;padding-bottom:40px;position:relative;overflow:hidden;text-align:center}
// .cs-hero::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(139,92,246,0.06),transparent 70%);filter:blur(80px)}
// .cs-hero-content{position:relative;z-index:1;max-width:680px;margin:0 auto}
// .cs-hero h1{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,4rem);font-weight:900;line-height:1.08;letter-spacing:-.04em;margin-bottom:16px}
// .cs-hero p{font-size:1rem;color:var(--white-dim);line-height:1.7;max-width:520px;margin:0 auto}
// .cs-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px;max-width:720px;margin-left:auto;margin-right:auto}
// .cs-stat{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--r-lg);padding:22px;text-align:center;transition:all .4s var(--ease)}
// .cs-stat:hover{border-color:var(--line-accent);transform:translateY(-3px)}
// .cs-stat-icon{width:40px;height:40px;border-radius:12px;margin:0 auto 10px;display:flex;align-items:center;justify-content:center}
// .cs-stat:nth-child(1) .cs-stat-icon{background:var(--purple-glow);color:var(--purple)}.cs-stat:nth-child(2) .cs-stat-icon{background:var(--cyan-glow);color:var(--cyan)}.cs-stat:nth-child(3) .cs-stat-icon{background:rgba(34,197,94,.08);color:#22C55E}.cs-stat:nth-child(4) .cs-stat-icon{background:var(--purple-glow);color:var(--purple)}
// .cs-stat-num{font-family:var(--font-display);font-size:1.5rem;font-weight:800;background:var(--grad-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:2px}
// .cs-stat h4{font-family:var(--font-display);font-weight:700;font-size:.82rem}

// .cs-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
// .cs-card{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--r-xl);overflow:hidden;transition:all .5s var(--ease);text-decoration:none;color:inherit;display:flex;flex-direction:column}
// .cs-card:hover{border-color:var(--line-accent);transform:translateY(-6px);box-shadow:0 28px 72px rgba(0,0,0,.45)}
// .cs-card-img{aspect-ratio:16/10;overflow:hidden;position:relative}
// .cs-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}.cs-card:hover .cs-card-img img{transform:scale(1.04)}
// .cs-card-cat{position:absolute;top:14px;left:14px;padding:5px 14px;background:rgba(0,0,0,.55);backdrop-filter:blur(10px);border-radius:50px;font-family:var(--font-mono);font-size:.66rem;text-transform:uppercase;letter-spacing:.08em;color:var(--purple);border:1px solid rgba(139,92,246,.15)}
// .cs-card-body{padding:24px;flex:1;display:flex;flex-direction:column}
// .cs-card-client{font-family:var(--font-mono);font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--purple);margin-bottom:8px}
// .cs-card-body h3{font-family:var(--font-display);font-weight:700;font-size:1.1rem;line-height:1.2;margin-bottom:10px}
// .cs-card-body p{color:var(--white-dim);font-size:.85rem;line-height:1.65;flex:1;margin-bottom:16px}
// .cs-card-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}
// .cs-card-metric{padding:10px 12px;background:rgba(139,92,246,.03);border:1px solid var(--line);border-radius:10px}
// .cs-card-metric-label{font-family:var(--font-mono);font-size:.58rem;text-transform:uppercase;letter-spacing:.08em;color:var(--white-muted);margin-bottom:4px}
// .cs-card-metric-val{font-family:var(--font-display);font-weight:700;font-size:.95rem;color:#22C55E}
// .cs-card-link{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-weight:700;font-size:.88rem;color:var(--purple);transition:gap .3s var(--ease)}
// .cs-card:hover .cs-card-link{gap:14px}

// .cs-cta{background:var(--bg-card);border:1px solid var(--line-accent);border-radius:var(--r-xl);padding:56px;text-align:center;position:relative;overflow:hidden}
// .cs-cta::before{content:'';position:absolute;inset:0;background:var(--grad-glow);opacity:.5;pointer-events:none}
// .cs-cta>*{position:relative;z-index:1}
// .cs-cta h2{font-family:var(--font-display);font-size:clamp(1.4rem,3vw,2.2rem);font-weight:800;margin-bottom:12px}
// .cs-cta p{color:var(--white-dim);max-width:440px;margin:0 auto 24px;font-size:.9rem;line-height:1.7}

// @media(max-width:968px){.cs-cards{grid-template-columns:1fr;max-width:520px;margin:0 auto}.cs-stats{grid-template-columns:1fr 1fr}}
// @media(max-width:600px){.cs-stats{grid-template-columns:1fr}.cs-cta{padding:36px 20px}}
// `;

// const cases = [
//   { client: 'LLMWare', category: 'YouTube & Enterprise Content', pdf: '/case-studies/LLMWare.pdf', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&h=400&fit=crop&q=75', title: 'Content to Client Conversions — YouTube & Media Strategy', desc: 'Transformed YouTube from 385 to 2.64K subs, secured Intel partnership through enterprise-level video content.', h1: { label: 'Subscribers', val: '385 → 2.64K' }, h2: { label: 'Partnership', val: 'Intel' } },
//   { client: 'Saamir Mithwani', category: 'Personal Branding', pdf: '/case-studies/Saamir.pdf', img: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=640&h=400&fit=crop&q=75', title: 'From Dropshipper to Industry Authority', desc: 'Built personal brand from 3.4K to 179K Instagram, 408 to 23.7K YouTube. Launched the Brandify mentorship program.', h1: { label: 'Instagram', val: '3.4K → 179K' }, h2: { label: 'YouTube', val: '408 → 23.7K' } },
//   { client: 'Section 8 Karim', category: 'Real Estate Brand Scaling', pdf: '/case-studies/Section-8-Karim.pdf', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=640&h=400&fit=crop&q=75', title: 'Scaling a Real Estate Brand — 300K+ Followers', desc: 'Scaled Instagram to 537K followers with millions of views. Partnership with Exyme Media x Flixtar.', h1: { label: 'Instagram', val: '537K' }, h2: { label: 'Views', val: 'Millions' } },
// ];

// const fade = (d = 0) => ({ initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: .7, delay: d, ease: [.16,1,.3,1] } });

// export default function CaseStudies() {
//   const [ctaRef, ctaIn] = useInView();
//   useEffect(() => { window.scrollTo(0, 0); }, []);
//   return (<><style>{css}</style>
//     <section className="cs-hero"><div className="container"><div className="cs-hero-content">
//       <motion.div {...fade(.1)}><div className="label" style={{ justifyContent: 'center' }}>Case Studies</div></motion.div>
//       <motion.h1 {...fade(.2)}>Real Brands.<br /><span className="gradient-text">Real Growth.</span></motion.h1>
//       <motion.p {...fade(.35)}>Every number is verified. Every result is documented. Click any case study to read the full report.</motion.p>
//       <motion.div className="cs-stats" {...fade(.5)}>{[{ icon: <Users size={18}/>, n: '150+', h: 'Clients' }, { icon: <Eye size={18}/>, n: '500M+', h: 'Views' }, { icon: <DollarSign size={18}/>, n: '$12M+', h: 'Revenue' }, { icon: <TrendingUp size={18}/>, n: '4.2x', h: 'Avg ROAS' }].map((s, i) => (<div key={i} className="cs-stat"><div className="cs-stat-icon">{s.icon}</div><div className="cs-stat-num">{s.n}</div><h4>{s.h}</h4></div>))}</motion.div>
//     </div></div></section>

//     <section className="section-pad"><div className="container"><div className="cs-cards">{cases.map((cs, i) => (
//       <a key={i} href={cs.pdf} target="_blank" rel="noopener noreferrer" className="cs-card">
//         <div className="cs-card-img"><img src={cs.img} alt={cs.client} loading="lazy" decoding="async" /><div className="cs-card-cat">{cs.category}</div></div>
//         <div className="cs-card-body">
//           <div className="cs-card-client">{cs.client}</div><h3>{cs.title}</h3><p>{cs.desc}</p>
//           <div className="cs-card-metrics"><div className="cs-card-metric"><div className="cs-card-metric-label">{cs.h1.label}</div><div className="cs-card-metric-val">{cs.h1.val}</div></div><div className="cs-card-metric"><div className="cs-card-metric-label">{cs.h2.label}</div><div className="cs-card-metric-val">{cs.h2.val}</div></div></div>
//           <div className="cs-card-link"><FileText size={16} /> Read Full Case Study <ArrowRight size={14} /></div>
//         </div>
//       </a>
//     ))}</div></div></section>

//     <section className="section-pad" ref={ctaRef}><div className="container"><div className="cs-cta" style={{ opacity: ctaIn ? 1 : 0, transform: ctaIn ? 'translateY(0)' : 'translateY(24px)', transition: 'all .7s var(--ease)' }}><div className="label" style={{ justifyContent: 'center' }}>Your Turn</div><h2>Ready to Be Our Next <span className="gradient-text">Success Story?</span></h2><p>Book a free strategy call and get your custom growth roadmap.</p><CalendlyButton text="Book Your Free Strategy Call" /></div></div></section>
//   </>);
// }

import React, { useEffect } from 'react';
import { TrendingUp, Users, Eye, DollarSign, ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import CalendlyButton from '../components/CalendlyButton';

const css = `
.cs-hero{min-height:50vh;display:flex;align-items:center;padding-top:110px;padding-bottom:40px;position:relative;overflow:hidden;text-align:center}
.cs-hero::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(139,92,246,0.06),transparent 70%);filter:blur(80px)}
.cs-hero-content{position:relative;z-index:1;max-width:680px;margin:0 auto}
.cs-hero h1{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,4rem);font-weight:900;line-height:1.08;letter-spacing:-.04em;margin-bottom:16px}
.cs-hero p{font-size:1rem;color:var(--white-dim);line-height:1.7;max-width:520px;margin:0 auto}
.cs-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px;max-width:720px;margin-left:auto;margin-right:auto}
.cs-stat{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--r-lg);padding:22px;text-align:center;transition:all .4s var(--ease)}
.cs-stat:hover{border-color:var(--line-accent);transform:translateY(-3px)}
.cs-stat-icon{width:40px;height:40px;border-radius:12px;margin:0 auto 10px;display:flex;align-items:center;justify-content:center}
.cs-stat:nth-child(1) .cs-stat-icon{background:var(--purple-glow);color:var(--purple)}.cs-stat:nth-child(2) .cs-stat-icon{background:var(--cyan-glow);color:var(--cyan)}.cs-stat:nth-child(3) .cs-stat-icon{background:rgba(34,197,94,.08);color:#22C55E}.cs-stat:nth-child(4) .cs-stat-icon{background:var(--purple-glow);color:var(--purple)}
.cs-stat-num{font-family:var(--font-display);font-size:1.5rem;font-weight:800;background:var(--grad-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:2px}
.cs-stat h4{font-family:var(--font-display);font-weight:700;font-size:.82rem}

.cs-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.cs-card{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--r-xl);overflow:hidden;transition:all .5s var(--ease);text-decoration:none;color:inherit;display:flex;flex-direction:column}
.cs-card:hover{border-color:var(--line-accent);transform:translateY(-6px);box-shadow:0 28px 72px rgba(0,0,0,.45)}
.cs-card-img{aspect-ratio:16/10;overflow:hidden;position:relative}
.cs-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}.cs-card:hover .cs-card-img img{transform:scale(1.04)}
.cs-card-cat{position:absolute;top:14px;left:14px;padding:5px 14px;background:rgba(0,0,0,.55);backdrop-filter:blur(10px);border-radius:50px;font-family:var(--font-mono);font-size:.66rem;text-transform:uppercase;letter-spacing:.08em;color:var(--purple);border:1px solid rgba(139,92,246,.15)}
.cs-card-body{padding:24px;flex:1;display:flex;flex-direction:column}
.cs-card-client{font-family:var(--font-mono);font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--purple);margin-bottom:8px}
.cs-card-body h3{font-family:var(--font-display);font-weight:700;font-size:1.1rem;line-height:1.2;margin-bottom:10px}
.cs-card-body p{color:var(--white-dim);font-size:.85rem;line-height:1.65;flex:1;margin-bottom:16px}
.cs-card-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}
.cs-card-metric{padding:10px 12px;background:rgba(139,92,246,.03);border:1px solid var(--line);border-radius:10px}
.cs-card-metric-label{font-family:var(--font-mono);font-size:.58rem;text-transform:uppercase;letter-spacing:.08em;color:var(--white-muted);margin-bottom:4px}
.cs-card-metric-val{font-family:var(--font-display);font-weight:700;font-size:.95rem;color:#22C55E}
.cs-card-link{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-weight:700;font-size:.88rem;color:var(--purple);transition:gap .3s var(--ease)}
.cs-card:hover .cs-card-link{gap:14px}

.cs-cta{background:var(--bg-card);border:1px solid var(--line-accent);border-radius:var(--r-xl);padding:56px;text-align:center;position:relative;overflow:hidden}
.cs-cta::before{content:'';position:absolute;inset:0;background:var(--grad-glow);opacity:.5;pointer-events:none}
.cs-cta>*{position:relative;z-index:1}
.cs-cta h2{font-family:var(--font-display);font-size:clamp(1.4rem,3vw,2.2rem);font-weight:800;margin-bottom:12px}
.cs-cta p{color:var(--white-dim);max-width:440px;margin:0 auto 24px;font-size:.9rem;line-height:1.7}

@media(max-width:968px){.cs-cards{grid-template-columns:1fr;max-width:520px;margin:0 auto}.cs-stats{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.cs-stats{grid-template-columns:1fr}.cs-cta{padding:36px 20px}}
`;

const cases = [
  { client: 'LLMWare', category: 'YouTube & Enterprise Content', pdf: '/case-studies/LLMWare.pdf', img: '/case-studies/Flixtar x LLMWARE.png', title: 'Content to Client Conversions — YouTube & Media Strategy', desc: 'Transformed YouTube from 385 to 2.64K subs, secured Intel partnership through enterprise-level video content.', h1: { label: 'Subscribers', val: '385 → 2.64K' }, h2: { label: 'Partnership', val: 'Intel' } },
  { client: 'Saamir Mithwani', category: 'Personal Branding', pdf: '/case-studies/Saamir.pdf', img: '/case-studies/Flixtar x Saamir.png', title: 'From Dropshipper to Industry Authority', desc: 'Built personal brand from 3.4K to 179K Instagram, 408 to 23.7K YouTube. Launched the Brandify mentorship program.', h1: { label: 'Instagram', val: '3.4K → 179K' }, h2: { label: 'YouTube', val: '408 → 23.7K' } },
  { client: 'Section 8 Karim', category: 'Real Estate Brand Scaling', pdf: '/case-studies/Section-8-Karim.pdf', img: '/case-studies/Flixtar x section9karim.png', title: 'Scaling a Real Estate Brand — 300K+ Followers', desc: 'Scaled Instagram to 537K followers with millions of views. Partnership with Exyme Media x Flixtar.', h1: { label: 'Instagram', val: '537K' }, h2: { label: 'Views', val: 'Millions' } },
];

const fade = (d = 0) => ({ initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: .7, delay: d, ease: [.16,1,.3,1] } });

export default function CaseStudies() {
  const [ctaRef, ctaIn] = useInView();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (<><style>{css}</style>
    <section className="cs-hero"><div className="container"><div className="cs-hero-content">
      <motion.div {...fade(.1)}><div className="label" style={{ justifyContent: 'center' }}>Case Studies</div></motion.div>
      <motion.h1 {...fade(.2)}>Real Brands.<br /><span className="gradient-text">Real Growth.</span></motion.h1>
      <motion.p {...fade(.35)}>Every number is verified. Every result is documented. Click any case study to read the full report.</motion.p>
      <motion.div className="cs-stats" {...fade(.5)}>{[{ icon: <Users size={18}/>, n: '150+', h: 'Clients' }, { icon: <Eye size={18}/>, n: '500M+', h: 'Views' }, { icon: <DollarSign size={18}/>, n: '$12M+', h: 'Revenue' }, { icon: <TrendingUp size={18}/>, n: '4.2x', h: 'Avg ROAS' }].map((s, i) => (<div key={i} className="cs-stat"><div className="cs-stat-icon">{s.icon}</div><div className="cs-stat-num">{s.n}</div><h4>{s.h}</h4></div>))}</motion.div>
    </div></div></section>

    <section className="section-pad"><div className="container"><div className="cs-cards">{cases.map((cs, i) => (
      <a key={i} href={cs.pdf} target="_blank" rel="noopener noreferrer" className="cs-card">
        <div className="cs-card-img"><img src={cs.img} alt={cs.client} loading="lazy" decoding="async" /><div className="cs-card-cat">{cs.category}</div></div>
        <div className="cs-card-body">
          <div className="cs-card-client">{cs.client}</div><h3>{cs.title}</h3><p>{cs.desc}</p>
          <div className="cs-card-metrics"><div className="cs-card-metric"><div className="cs-card-metric-label">{cs.h1.label}</div><div className="cs-card-metric-val">{cs.h1.val}</div></div><div className="cs-card-metric"><div className="cs-card-metric-label">{cs.h2.label}</div><div className="cs-card-metric-val">{cs.h2.val}</div></div></div>
          <div className="cs-card-link"><FileText size={16} /> Read Full Case Study <ArrowRight size={14} /></div>
        </div>
      </a>
    ))}</div></div></section>

    <section className="section-pad" ref={ctaRef}><div className="container"><div className="cs-cta" style={{ opacity: ctaIn ? 1 : 0, transform: ctaIn ? 'translateY(0)' : 'translateY(24px)', transition: 'all .7s var(--ease)' }}><div className="label" style={{ justifyContent: 'center' }}>Your Turn</div><h2>Ready to Be Our Next <span className="gradient-text">Success Story?</span></h2><p>Book a free strategy call and get your custom growth roadmap.</p><CalendlyButton text="Book Your Free Strategy Call" /></div></div></section>
  </>);
}