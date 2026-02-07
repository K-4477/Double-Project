import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Photography from './pages/Photography';
import Videography from './pages/Videography';
import Enquiries from './pages/Enquiries';
import MediaGallery from './pages/MediaGallery';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/photography" element={<Photography/>} />
        <Route path="/videography" element={<Videography/>}/>
        <Route path="/enquiries" element={<Enquiries/>}/>
        <Route path="/gallery" element={<MediaGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
