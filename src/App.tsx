import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="mesh-bg" />
      <div className="grid-overlay" />
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/faq"      element={<FAQ />} />
        <Route path="/privacy"  element={<Privacy />} />
      </Routes>
      <Footer />
    </Router>
  );
}
