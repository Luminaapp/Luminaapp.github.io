import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black-400">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 