import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

let loaded = false;
function loadCalendly() {
  if (loaded) return;
  loaded = true;
  const link = document.createElement('link');
  link.href = 'https://assets.calendly.com/assets/external/widget.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  document.body.appendChild(script);
}

export default function CalendlyButton({
  className = 'btn-primary',
  text = 'Book a Free Strategy Call',
  url = 'https://calendly.com/info-flixtar/new-meeting'
}) {
  useEffect(() => {
    loadCalendly();
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <button className={className} onClick={openCalendly} type="button">
      <span>{text}</span>
      <ArrowUpRight size={17} style={{ position: 'relative', zIndex: 1 }} />
    </button>
  );
}
