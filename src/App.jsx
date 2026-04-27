import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { NotFoundPage } from './pages/NotFoundPage';
const Home = lazy(() => import("./pages/Home.jsx").then(m => ({ default: m.Home })));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const PricingPage = lazy(() => import("./pages/PricingPage.jsx").then(m => ({ default: m.PricingPage })));
const LegalDocuments = lazy(() => import("./pages/LegalDocuments.jsx"));



function App() {


  return (
    <div className={`font-[Inter]`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal-documents/:docId?" element={<LegalDocuments />} />

          <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </div>
  )
}

export default App
