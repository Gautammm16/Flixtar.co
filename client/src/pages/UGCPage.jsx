import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Zap, DollarSign, TrendingDown, Layers, ShoppingBag, Play, ArrowRight, X, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import CalendlyButton from '../components/CalendlyButton';

const css = `
/* ====== HERO ====== */
.uh{min-height:80vh;display:flex;align-items:center;padding-top:120px;padding-bottom:56px;position:relative;overflow:hidden}
.uh::before{content:'';position:absolute;top:0;left:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(0,194,255,0.07),transparent 70%);filter:blur(100px);animation:float 22s ease infinite}
.uh::after{content:'';position:absolute;bottom:-10%;right:-5%;width:400px;height:400px;background:radial-gradient(circle,rgba(139,92,246,0.06),transparent 70%);filter:blur(80px);animation:float 28s ease infinite;animation-delay:-12s}

.uh-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:56px;align-items:center;position:relative;z-index:1}
.uh-content{position:relative;z-index:1}
.uh-title{font-family:var(--font-display);font-size:clamp(2.4rem,6vw,4.6rem);font-weight:900;line-height:1.04;letter-spacing:-.04em;margin-bottom:20px}
.uh-sub{font-size:clamp(.94rem,1.4vw,1.04rem);color:var(--white-dim);line-height:1.75;margin-bottom:32px;max-width:480px}
.uh-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:32px}
.uh-stat{background:var(--bg-card);border:1px solid var(--line);border-radius:var(--r-md);padding:14px 18px;display:flex;align-items:center;gap:10px;transition:border-color .3s,transform .3s var(--ease)}.uh-stat:hover{border-color:var(--line-hover);transform:translateY(-2px)}
.uh-stat-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.uh-stat:nth-child(1) .uh-stat-icon{background:rgba(34,197,94,.08);color:#22C55E}
.uh-stat:nth-child(2) .uh-stat-icon{background:rgba(0,194,255,.08);color:var(--cyan)}
.uh-stat:nth-child(3) .uh-stat-icon{background:rgba(139,92,246,.08);color:var(--purple)}
.uh-stat:nth-child(4) .uh-stat-icon{background:rgba(255,138,61,.08);color:#FF8A3D}
.uh-stat-v{font-family:var(--font-display);font-size:1.1rem;font-weight:800}
.uh-stat-l{font-size:.68rem;color:var(--white-muted)}

/* ====== PHONE MOCKUPS ====== */
.uh-phones{display:flex;justify-content:center;gap:14px;perspective:1200px}
.uh-phone{
  width:170px;height:340px;
  border-radius:26px;overflow:hidden;
  border:2px solid rgba(255,255,255,.08);
  position:relative;
  background:var(--bg-card);
  box-shadow:0 28px 70px rgba(0,0,0,.5);
  transition:transform .5s var(--ease),box-shadow .5s;
  cursor:pointer
}
.uh-phone:nth-child(1){transform:rotate(-5deg) translateY(18px)}
.uh-phone:nth-child(2){transform:scale(1.07);z-index:2}
.uh-phone:nth-child(3){transform:rotate(5deg) translateY(18px)}
.uh-phone:hover{transform:scale(1.05) rotate(0deg) !important;box-shadow:0 36px 80px rgba(0,0,0,.6),0 0 0 1px rgba(0,194,255,.18)}
.uh-phone video{width:100%;height:100%;object-fit:cover}
.uh-phone-badge{
  position:absolute;bottom:10px;left:10px;right:10px;
  background:rgba(0,0,0,.7);backdrop-filter:blur(10px);
  border-radius:12px;padding:8px 12px;
  display:flex;align-items:center;justify-content:space-between;
  border:1px solid rgba(255,255,255,.06)
}
.uh-phone-badge .lbl{font-family:var(--font-mono);font-size:.6rem;text-transform:uppercase;letter-spacing:.06em;color:#22C55E}
.uh-phone-badge .val{font-family:var(--font-display);font-weight:800;font-size:.88rem}

/* ====== COMPARISON ====== */
.cmp-section{position:relative}
.cmp-grid{display:grid;grid-template-columns:1fr 60px 1fr;gap:0;margin-top:48px}
.cmp-card{
  background:var(--bg-card);
  border:1px solid var(--line);
  border-radius:var(--r-lg);
  padding:40px;
  transition:border-color .4s,transform .4s var(--ease)
}
.cmp-card.old{opacity:.6}
.cmp-card.new{border-color:rgba(0,194,255,.25);position:relative}
.cmp-card.new:hover{transform:translateY(-4px);box-shadow:0 24px 60px rgba(0,0,0,.4)}
.cmp-badge{
  position:absolute;top:-13px;left:28px;
  padding:4px 16px;
  background:var(--cyan);
  border-radius:50px;
  font-family:var(--font-mono);font-size:.62rem;letter-spacing:.1em;color:#000;font-weight:700;
  text-transform:uppercase
}
.cmp-card h3{font-family:var(--font-display);font-size:1.3rem;font-weight:800;margin-bottom:24px}
.cmp-list{list-style:none;display:flex;flex-direction:column;gap:14px}
.cmp-list li{display:flex;align-items:flex-start;gap:10px;font-size:.9rem;color:var(--white-dim);line-height:1.5}
.cmp-vs{display:flex;align-items:center;justify-content:center}
.cmp-vs span{
  width:54px;height:54px;border-radius:50%;
  background:var(--bg-card);border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--font-display);font-weight:800;font-size:.85rem;color:var(--white-muted)
}

/* ====== VIDEO GRIDS ====== */
.vid-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:32px}
.vid-card{position:relative;border-radius:var(--r-lg);overflow:hidden;aspect-ratio:9/16;cursor:pointer;background:var(--bg-card);transition:transform .5s var(--ease),box-shadow .5s}.vid-card:hover{transform:translateY(-4px);box-shadow:0 24px 60px rgba(0,0,0,.55)}.vid-card:active{transform:scale(.98)}
.vid-card video{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}.vid-card:hover video{transform:scale(1.04)}
.vid-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,6,11,.9) 0%,rgba(6,6,11,.1) 40%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(12px,2vw,18px);opacity:0;transition:opacity .35s}.vid-card:hover .vid-ov{opacity:1}
.vid-ov .cn{font-family:var(--font-mono);font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;color:var(--cyan);margin-bottom:3px}
.vid-ov h4{font-family:var(--font-display);font-weight:700;font-size:clamp(.78rem,1vw,.88rem);margin-bottom:2px}.vid-ov .cm{font-size:.76rem;color:#22C55E;font-weight:700}
.vid-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(.85);width:42px;height:42px;border-radius:50%;background:rgba(0,194,255,.85);display:flex;align-items:center;justify-content:center;opacity:0;transition:all .4s var(--ease);box-shadow:0 6px 22px rgba(0,194,255,.35)}.vid-card:hover .vid-play{opacity:1;transform:translate(-50%,-50%) scale(1)}
.vid-tag{position:absolute;top:10px;left:10px;padding:4px 10px;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);border-radius:50px;font-family:var(--font-mono);font-size:.6rem;text-transform:uppercase;letter-spacing:.06em;color:var(--cyan)}

/* ====== UGC CTA ====== */
.ugc-cta{background:var(--bg-card);border:1px solid var(--line-accent);border-radius:var(--r-xl);padding:clamp(36px,6vw,56px);text-align:center;position:relative;overflow:hidden}
.ugc-cta::before{content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:500px;height:250px;background:radial-gradient(ellipse,rgba(0,194,255,.08) 0%,transparent 70%);pointer-events:none}
.ugc-cta::after{content:'';position:absolute;inset:0;background:var(--grad-glow);opacity:.5;pointer-events:none}
.ugc-cta>*{position:relative;z-index:1}
.ugc-cta h2{font-family:var(--font-display);font-size:clamp(1.5rem,3.2vw,2.3rem);font-weight:800;margin-bottom:12px}
.ugc-cta p{color:var(--white-dim);max-width:440px;margin:0 auto 24px;line-height:1.75;font-size:clamp(.86rem,1.1vw,.92rem)}

/* ====== VIDEO POPUP ====== */
.vp-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.85);backdrop-filter:blur(12px);opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s}
.vp-overlay.open{opacity:1;visibility:visible}
.vp-container{position:relative;max-width:380px;width:90%;max-height:90vh;border-radius:20px;overflow:hidden;background:#000;box-shadow:0 40px 100px rgba(0,0,0,.8);transform:scale(.9) translateY(20px);transition:transform .4s cubic-bezier(.16,1,.3,1);border:1px solid rgba(255,255,255,.08)}
.vp-overlay.open .vp-container{transform:scale(1) translateY(0)}
.vp-container video{width:100%;display:block;max-height:85vh;object-fit:contain}
.vp-close{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:2;transition:background .3s,transform .3s}.vp-close:hover{background:rgba(255,255,255,.15);transform:scale(1.1)}
.vp-mute{position:absolute;bottom:14px;right:14px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:2;transition:background .3s,transform .3s}.vp-mute:hover{background:rgba(255,255,255,.15);transform:scale(1.1)}
.vp-info{position:absolute;bottom:14px;left:14px;z-index:2}
.vp-info .vp-client{font-family:var(--font-mono);font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;color:var(--cyan);margin-bottom:2px}
.vp-info .vp-title{font-family:var(--font-display);font-weight:700;font-size:.9rem}
.vp-info .vp-metric{font-size:.78rem;color:#22C55E;font-weight:700;margin-top:2px}

@media(max-width:968px){
  .uh-grid{grid-template-columns:1fr}
  .uh-phones{margin-top:40px}
  .cmp-grid{grid-template-columns:1fr;gap:16px}
  .cmp-vs{display:none}
  .vid-grid{grid-template-columns:repeat(2,1fr)}
  .uh-stats{grid-template-columns:1fr 1fr}
}
@media(max-width:600px){
  .uh-phone{width:130px;height:260px}
  .uh-stats{grid-template-columns:1fr}
  .vid-grid{grid-template-columns:repeat(2,1fr)}
  .ugc-cta{padding:32px 18px}
}
@media(max-width:480px){
  .uh-phone{width:110px;height:220px;border-radius:var(--r-lg)}
}
`;

// const aiVideos = [
//   { id: 6, thumb: '/videos/UGC/2.mp4', client: '', title: '', metric: '', tag: 'AI Generated' },
//   { id: 4, thumb: '/videos/UGC/0.5.mp4', client: '', title: '', metric: '', tag: 'AI Generated' },
//   { id: 1, thumb: '/videos/UGC/0.1.mp4', client: '', title: '', metric: '', tag: 'AI Generated' },
//   { id: 3, thumb: '/videos/UGC/0.3.mp4', client: '', title: '', metric: '', tag: 'AI Generated' },
//   { id: 2, thumb: '/videos/UGC/AI 1.mp4', client: '', title: '', metric: '', tag: 'AI Generated' },
//   { id: 5, thumb: '/videos/UGC/AI 2.mp4', client: '', title: '', metric: '', tag: 'AI Generated' },
// ];

const aiVideos = [
  {
    id: 6,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878655/2_kz7ixt.mp4',
    client: '',
    title: '',
    metric: '',
    tag: 'AI Generated'
  },
  {
    id: 4,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878640/0.5_sdlbu7.mp4',
    client: '',
    title: '',
    metric: '',
    tag: 'AI Generated'
  },
  {
    id: 1,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878680/0.1_hh79pl.mp4',
    client: '',
    title: '',
    metric: '',
    tag: 'AI Generated'
  },
  {
    id: 3,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878687/0.3_hmfvrb.mp4',
    client: '',
    title: '',
    metric: '',
    tag: 'AI Generated'
  },
  {
    id: 2,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878564/AI_1_aahlis.mp4',
    client: '',
    title: '',
    metric: '',
    tag: 'AI Generated'
  },
  {
    id: 5,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878724/AI_2_vgj84a.mp4',
    client: '',
    title: '',
    metric: '',
    tag: 'AI Generated'
  },
];

const ugcVideos = [
  {
    id: 7,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878598/3_hook_2_lqdf3k.mp4',
    client: 'GlowUp',
    title: 'UGC Review Ad',
    metric: '$127K Revenue',
    tag: 'UGC'
  },
  {
    id: 8,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878627/5_alpha_touch_bwptoe.mp4',
    client: 'StyleHouse',
    title: 'UGC Unboxing',
    metric: '$89K/mo',
    tag: 'UGC'
  },
  {
    id: 9,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878582/ADHD_rqp1gq.mp4',
    client: 'TechVibe',
    title: 'UGC Tech Review',
    metric: '3.4x ROAS',
    tag: 'UGC'
  },
  {
    id: 10,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878734/BJ-UGC-SilentReflux-V2-FINAL_ysjpah.mp4',
    client: 'CodeCraft',
    title: 'UGC EdTech Ad',
    metric: '280 Leads/mo',
    tag: 'UGC'
  },
  {
    id: 11,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878735/Dental_11-02_v2_o501nu.mp4',
    client: 'Urban Eats',
    title: 'UGC Food Review',
    metric: '$210K Sales',
    tag: 'UGC'
  },
  {
    id: 12,
    thumb: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878687/Momufuku_2_dfvlwu.mp4',
    client: 'FitLife',
    title: 'UGC Fitness',
    metric: '4.6x ROAS',
    tag: 'UGC'
  },
];

// const ugcVideos = [
//   { id: 7, thumb: '/videos/UGC/3 hook 2.mp4', client: 'GlowUp', title: 'UGC Review Ad', metric: '$127K Revenue', tag: 'UGC' },
//   { id: 8, thumb: '/videos/UGC/5 alpha touch.mp4', client: 'StyleHouse', title: 'UGC Unboxing', metric: '$89K/mo', tag: 'UGC' },
//   { id: 9, thumb: '/videos/UGC/ADHD.mp4', client: 'TechVibe', title: 'UGC Tech Review', metric: '3.4x ROAS', tag: 'UGC' },
//   { id: 10, thumb: '/videos/UGC/BJ-UGC-SilentReflux-V2-FINAL.mp4', client: 'CodeCraft', title: 'UGC EdTech Ad', metric: '280 Leads/mo', tag: 'UGC' },
//   { id: 11, thumb: '/videos/UGC/Dental 11-02 v2.mp4', client: 'Urban Eats', title: 'UGC Food Review', metric: '$210K Sales', tag: 'UGC' },
//   { id: 12, thumb: '/videos/UGC/Momufuku 2.mp4', client: 'FitLife', title: 'UGC Fitness', metric: '4.6x ROAS', tag: 'UGC' },
// ];

/* ====== VIDEO POPUP COMPONENT ====== */
function VideoPopupInline({ isOpen, onClose, video }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setMuted(false);
      videoRef.current.play().catch(() => {
        // If autoplay with sound fails (browser policy), fallback to muted then unmute
        videoRef.current.muted = true;
        setMuted(true);
        videoRef.current.play().catch(() => {});
      });
    }
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  if (!video) return null;

  return (
    <div className={`vp-overlay${isOpen ? ' open' : ''}`} onClick={onClose}>
      <div className="vp-container" onClick={(e) => e.stopPropagation()}>
        <button className="vp-close" onClick={onClose}><X size={16} color="#fff" /></button>
        <video
          ref={videoRef}
          src={video.src}
          loop
          playsInline
          preload="auto"
        />
        <button className="vp-mute" onClick={toggleMute}>
          {muted ? <VolumeX size={16} color="#fff" /> : <Volume2 size={16} color="#fff" />}
        </button>
        <div className="vp-info">
          <div className="vp-client">{video.client}</div>
          <div className="vp-title">{video.title}</div>
          <div className="vp-metric">{video.metric}</div>
        </div>
      </div>
    </div>
  );
}

/* ====== VIDEO GRID COMPONENT ====== */
const VGrid = ({ videos, setVid }) => (
  <div className="vid-grid">{videos.map(v => (
    <article key={v.id} className="vid-card" onClick={() => setVid({ title: v.title, client: v.client, metric: v.metric, src: v.thumb })}>
      <video src={v.thumb} muted autoPlay loop playsInline preload="metadata" />
      <div className="vid-play"><Play size={16} fill="#fff" color="#fff" /></div>
      <div className="vid-tag">{v.tag}</div>
      <div className="vid-ov"><span className="cn">{v.client}</span><h4>{v.title}</h4><span className="cm">{v.metric}</span></div>
    </article>
  ))}</div>
);

const fade = (d = 0) => ({ initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: .7, delay: d, ease: [.16, 1, .3, 1] } });

export default function UGCPage() {
  const [vid, setVid] = useState(null);
  const [compRef, compIn] = useInView();
  const [aiRef, aiIn] = useInView();
  const [ugcRef, ugcIn] = useInView();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleClose = useCallback(() => setVid(null), []);

  return (<><style>{css}</style>

    {/* HERO */}
    <section className="uh">
      <div className="container">
        <div className="uh-grid">

          {/* Left: copy + stats */}
          <header className="uh-content">
            <motion.div {...fade(.1)}>
              <div className="label" style={{ marginBottom: 20 }}><Zap size={13} /> AI-Powered UGC & Meta Ads</div>
            </motion.div>
            <motion.h1 className="uh-title" {...fade(.2)}>
              AI UGC That<br /><span className="gradient-text">Sells, Not Just Scrolls.</span>
            </motion.h1>
            <motion.p className="uh-sub" {...fade(.35)}>
              We produce AI-generated UGC ads that slash creative costs by 70% and scale your Meta campaigns with creatives that convert.
            </motion.p>
            <motion.div {...fade(.5)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <CalendlyButton text="Get a Free Ad Audit" />
              <Link to="/case-studies" className="btn-ghost">See Results <ArrowRight size={16} /></Link>
            </motion.div>
            <motion.div className="uh-stats" {...fade(.65)}>
              <div className="uh-stat"><div className="uh-stat-icon"><DollarSign size={18} /></div><div><div className="uh-stat-v">4.2x</div><div className="uh-stat-l">Avg. ROAS</div></div></div>
              <div className="uh-stat"><div className="uh-stat-icon"><TrendingDown size={18} /></div><div><div className="uh-stat-v">-68%</div><div className="uh-stat-l">CPA Reduction</div></div></div>
              <div className="uh-stat"><div className="uh-stat-icon"><Layers size={18} /></div><div><div className="uh-stat-v">10x</div><div className="uh-stat-l">Creative Volume</div></div></div>
              <div className="uh-stat"><div className="uh-stat-icon"><ShoppingBag size={18} /></div><div><div className="uh-stat-v">$2M+</div><div className="uh-stat-l">Revenue Driven</div></div></div>
            </motion.div>
          </header>

          {/* Right: phone mockups */}
          <motion.div className="uh-phones" {...fade(.8)}>
            {[
  {
    src: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878585/P_ehj3cm.mp4',
    lbl: 'ROAS',
    val: '4.2x',
    client: 'NovaSkin'
  },
  {
    src: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878726/v2_ab2hcs.mp4',
    lbl: 'CPA',
    val: '-68%',
    client: 'PeakFit'
  },
  {
    src: 'https://res.cloudinary.com/dtlyv4qxu/video/upload/f_auto,q_auto/v1777878740/Video_1_ohixgb.mp4',
    lbl: 'Sales',
    val: '$210K',
    client: 'ZenWear'
  },
].map((p, i) => (
              <div key={i} className="uh-phone" onClick={() => setVid({ title: p.client, client: p.client, metric: p.val, src: p.src })}>
                <video src={p.src} muted autoPlay loop playsInline preload="metadata" />
                <div className="uh-phone-badge">
                  <span className="lbl">{p.lbl}</span>
                  <span className="val">{p.val}</span>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>

    {/* COMPARISON */}
    <section className="section-pad cmp-section" ref={compRef}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="label">Why AI UGC?</div>
          <h2 className="section-title">Traditional vs <span className="gradient-text">AI UGC</span></h2>
        </div>
        <div
          className="cmp-grid"
          style={{ opacity: compIn ? 1 : 0, transform: compIn ? 'translateY(0)' : 'translateY(28px)', transition: 'all .7s var(--ease)' }}
        >
          <div className="cmp-card old">
            <h3>Traditional UGC</h3>
            <ul className="cmp-list">
              {['$200–500 per creator', '1–2 weeks turnaround', 'Limited variations', 'Inconsistent quality', 'Hard to scale', 'Scheduling headaches'].map((t, i) => (
                <li key={i}><span style={{ color: '#ef4444', fontWeight: 700 }}>✕</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="cmp-vs"><span>VS</span></div>
          <div className="cmp-card new">
            <div className="cmp-badge">RECOMMENDED</div>
            <h3>Flixtar AI UGC</h3>
            <ul className="cmp-list">
              {['70–80% lower costs', '48-hour turnaround', 'Unlimited variations', 'Consistent quality', '100+ creatives/month', 'Zero logistics'].map((t, i) => (
                <li key={i}><span style={{ color: '#22C55E', fontWeight: 700 }}>✓</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* AI VIDEOS */}
    <section className="section-pad" ref={aiRef}>
      <div className="container">
        <div className="label">AI-Generated Ads</div>
        <h2 className="section-title">AI Videos That <span className="gradient-text">Convert</span></h2>
        <p className="subhead">Hyper-realistic AI creatives performing at scale.</p>
        <div style={{ opacity: aiIn ? 1 : 0, transform: aiIn ? 'translateY(0)' : 'translateY(24px)', transition: 'all .7s var(--ease)' }}>
          <VGrid videos={aiVideos} setVid={setVid} />
        </div>
      </div>
    </section>

    {/* UGC VIDEOS */}
    <section className="section-pad" ref={ugcRef}>
      <div className="container">
        <div className="label">UGC Creatives</div>
        <h2 className="section-title">UGC Videos That <span className="gradient-text">Drive Sales</span></h2>
        <p className="subhead">Authentic creator-style content for Meta ads.</p>
        <div style={{ opacity: ugcIn ? 1 : 0, transform: ugcIn ? 'translateY(0)' : 'translateY(24px)', transition: 'all .7s var(--ease)' }}>
          <VGrid videos={ugcVideos} setVid={setVid} />
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-pad">
      <div className="container">
        <div className="ugc-cta">
          <div className="label" style={{ justifyContent: 'center' }}>Scale Your Ads</div>
          <h2>Ready to Cut Costs & <span className="gradient-text">Scale Revenue?</span></h2>
          <p>Get a free ad audit and see how AI UGC can transform your campaigns.</p>
          <CalendlyButton text="Book Your Free Ad Audit" />
        </div>
      </div>
    </section>

    <VideoPopupInline isOpen={!!vid} onClose={handleClose} video={vid} />
  </>);
}
