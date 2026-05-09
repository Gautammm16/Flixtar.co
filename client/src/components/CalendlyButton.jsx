import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

let loaded = false;

function loadCalendly() {
  if (loaded) return;
  loaded = true;

  /* PRECONNECT */
  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://assets.calendly.com';
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://calendly.com';
  document.head.appendChild(preconnect2);

  /* LOAD CSS EARLY */
  const link = document.createElement('link');
  link.href = 'https://assets.calendly.com/assets/external/widget.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  /* LOAD SCRIPT EARLY */
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;

  script.onload = () => {
    console.log('Calendly loaded');
  };

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

    /* INSTANT POPUP IF READY */
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return;
    }

    /* FALLBACK */
    window.open(url, '_blank');
  };

  return (
    <button
      className={className}
      onClick={openCalendly}
      onMouseEnter={loadCalendly} /* preload on hover */
      type="button"
    >
      <span>{text}</span>

      <ArrowUpRight
        size={17}
        style={{
          position: 'relative',
          zIndex: 1
        }}
      />
    </button>
  );
}