import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { GalleryDetail } from './pages/GalleryDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery/:id" element={<GalleryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
