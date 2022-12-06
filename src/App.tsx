import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiscountTable from './components/tables/DiscountTable';
import { LoginPage, AdminPage } from './pages';

// import './App.css';
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/discounts" element={<DiscountTable />} />
      </Routes>
    </Router>
  );
}
