import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SEOMarketing from './pages/SEOMarketing';
import UGCPage from './pages/UGCPage';
import CaseStudies from './pages/CaseStudies';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="noise-overlay" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content-growth" element={<SEOMarketing />} />
        <Route path="/ai-ugc" element={<UGCPage />} />
        <Route path="/case-studies" element={<CaseStudies />} />
      </Routes>
      <Footer />
    </Router>
  );
}
