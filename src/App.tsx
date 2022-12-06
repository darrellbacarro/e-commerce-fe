import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, ProductPage, ProductDetails } from './pages';
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}
