import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage,AdminPage } from './pages';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
