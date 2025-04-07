import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutPage } from './pages/AboutPage/AboutPage';
// import { ProductList } from './components/ProductList/ProductList';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { ContactsPage } from './pages/ContactPage/ContactPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { CollectionPage } from './pages/CollectionPage/CollectionPage';

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactsPage />} />
              {/* todo: hide navigation, when Login page loads..*/}
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
