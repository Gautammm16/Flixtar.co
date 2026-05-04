import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

const css = `
.ft{background:var(--bg-void);border-top:1px solid var(--line);padding:64px 0 28px}
.ft-top{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:40px;margin-bottom:48px}
.ft-brand{font-family:var(--font-display);font-size:1.5rem;font-weight:800;background:var(--grad-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:14px}
.ft-brand-desc{color:var(--white-dim);font-size:.85rem;line-height:1.7;max-width:260px}
.ft-col h4{font-family:var(--font-display);font-weight:700;font-size:.85rem;margin-bottom:16px;color:var(--white)}
.ft-col ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.ft-col a{color:var(--white-dim);font-size:.84rem;transition:color .3s;display:inline-flex;align-items:center;gap:4px}
.ft-col a:hover{color:var(--purple)}
.ft-contact{display:flex;align-items:flex-start;gap:10px;color:var(--white-dim);font-size:.84rem;margin-bottom:12px}
.ft-contact svg{color:var(--purple);flex-shrink:0;margin-top:2px}
.ft-bot{border-top:1px solid var(--line);padding-top:20px;display:flex;justify-content:space-between;color:var(--white-muted);font-size:.76rem}
@media(max-width:968px){.ft-top{grid-template-columns:1fr 1fr;gap:28px}}
@media(max-width:600px){.ft-top{grid-template-columns:1fr;gap:24px}.ft-bot{flex-direction:column;gap:8px;text-align:center}}
`;

export default function Footer() {
  return (<><style>{css}</style>
    <footer className="ft"><div className="container">
      <div className="ft-top">
        <div><div className="ft-brand">FLIXTAR</div><p className="ft-brand-desc">We turn content into conversions. AI-powered distribution for brands and creators who refuse to blend in.</p></div>
        <nav className="ft-col"><h4>Services</h4><ul>
          <li><Link to="/content-growth">Content Growth <ArrowUpRight size={11}/></Link></li>
          <li><Link to="/ai-ugc">AI UGC Content <ArrowUpRight size={11}/></Link></li>
          <li><Link to="/case-studies">Case Studies <ArrowUpRight size={11}/></Link></li>
        </ul></nav>
        <nav className="ft-col"><h4>Company</h4><ul>
          <li><a href="#">About</a></li><li><a href="#">Blog</a></li><li><a href="#">Careers</a></li>
        </ul></nav>
        <div className="ft-col"><h4>Contact</h4>
          <div className="ft-contact"><Mail size={14}/><span>info.flixtar@gmail.com</span></div>
          <div className="ft-contact"><MapPin size={14}/><span>Remote-first, Global</span></div>
        </div>
      </div>
      <div className="ft-bot "><span >&copy; {new Date().getFullYear()} Flixtar Agency</span></div>
    </div></footer>
  </>);
}
