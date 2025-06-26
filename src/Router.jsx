import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import CreateClub from './pages/CreateClub'
import ClubMain from './pages/ClubMain';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/club/:id" element={<ClubMain />} />
      </Routes>
    </BrowserRouter>
  );
}
