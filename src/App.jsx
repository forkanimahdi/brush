import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GalleryTransitionProvider } from './context/GalleryTransitionContext.jsx';
import { ArtsProvider } from './context/ArtsContext.jsx';
import { Home } from './pages/Home.jsx';
import { GalleryDetail } from './pages/GalleryDetail.jsx';
import { AllArts } from './pages/AllArts.jsx';

function App() {
  return (
    <BrowserRouter>
      <GalleryTransitionProvider>
        <ArtsProvider>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/arts" element={<AllArts />} />
          </Routes>
        </ArtsProvider>
      </GalleryTransitionProvider>
    </BrowserRouter>
  );
}

export default App;
