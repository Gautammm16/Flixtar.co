import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const css = `
.vp-ov{position:fixed;inset:0;background:rgba(4,4,8,0.92);backdrop-filter:blur(20px);z-index:3000;display:flex;align-items:center;justify-content:center;padding:20px}
.vp-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:flex-end}
.vp-wrap.hz{max-width:900px}.vp-wrap.vt{max-width:380px}
.vp-close{color:#fff;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.2);padding:10px;border-radius:10px;transition:all .3s;margin-bottom:12px;cursor:pointer}
.vp-close:hover{background:rgba(139,92,246,0.2);transform:scale(1.05)}
.vp-box{width:100%;border-radius:var(--r-lg);overflow:hidden;background:#000;box-shadow:0 40px 100px rgba(0,0,0,0.6)}
.vp-box.hz{aspect-ratio:16/9}.vp-box.vt{aspect-ratio:9/16}
.vp-vid{width:100%;height:100%;object-fit:cover}
.vp-ph{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:var(--white-dim);background:linear-gradient(135deg,#0a0a12,#0e0e1a)}
.vp-ph h3{font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--white)}
.vp-ph p{font-size:.85rem;max-width:260px;text-align:center}
@media(max-width:768px){.vp-wrap.hz{max-width:100%}.vp-wrap.vt{max-width:85vw}}
`;

export default function VideoPopup({ isOpen, onClose, video }) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [isOpen, onClose]);

  const vert = video?.orientation === 'vertical';
  const hasUrl = video?.url;

  return (
    <AnimatePresence>
      {isOpen && video && (
        <motion.div className="vp-ov" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <style>{css}</style>
          <motion.div className={`vp-wrap ${vert ? 'vt' : 'hz'}`} onClick={e => e.stopPropagation()} initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .92, opacity: 0 }} transition={{ duration: .35, ease: [.16,1,.3,1] }}>
            <button className="vp-close" onClick={onClose} aria-label="Close"><X size={20}/></button>
            <div className={`vp-box ${vert ? 'vt' : 'hz'}`}>
              {hasUrl ? <video className="vp-vid" src={video.url} controls autoPlay playsInline /> : (
                <div className="vp-ph">
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--purple-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <h3>{video.title || 'Video Preview'}</h3>
                  <p>{video.client || 'Full video'}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
