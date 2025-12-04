import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuoteForm from './components/QuoteForm';
import Footer from './components/Footer';

import Services from './components/Services';

import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';

import content from './data/siteContent.json';

function App() {
  // Apply theme colors from content
  React.useEffect(() => {
    if (content.theme) {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', content.theme.primary);
      root.style.setProperty('--color-accent', content.theme.accent);
      root.style.setProperty('--color-accent-soft', content.theme.accentSoft);
      root.style.setProperty('--color-bg-light', content.theme.bgLight);
      root.style.setProperty('--color-text', content.theme.text);
    }
  }, []);

  return (
    <HelmetProvider>
      <div className="app">
        <SEO
          title="Fletes y Mudanzas en Chile"
          description="Servicios profesionales de fletes, mudanzas y transporte de carga en todo Chile. Cotiza tu flete online. Camiones modernos y personal calificado."
          keywords="fletes, mudanzas, transporte de carga, fletes chile, mudanzas santiago, transporte empresarial, fletes matcris"
        />
        <Header />
        <main>
          <Hero />
          <Services />
          <QuoteForm />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
