import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, ResumeAnalyzer, ResumeBuilder , MainPage } from './components';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyzer" element={<ResumeAnalyzer />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/mainpage" element={< MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
