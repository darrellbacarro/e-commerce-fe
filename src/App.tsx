import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage,AdminPage } from './pages';
import { DashboardPage } from './pages/DashboardPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
