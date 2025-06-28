import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import CreateClub from './pages/CreateClub';
import ClubMain from './pages/ClubMain';
import JoinSuccess from './pages/JoinSuccess';
import RecordPage from './pages/RecordPage';
import Schedule from './pages/Schedule';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/club/:id" element={<ClubMain />} />
        <Route path="/join-success" element={<JoinSuccess />} />
        <Route path="/record-page" element={<RecordPage />} />
        <Route path="/record-page/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}
