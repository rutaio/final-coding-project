import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductList } from './components/ProductList/ProductList';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { ContactsPage } from './pages/ContactPage/ContactPage';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { AuthProvider } from './contexts/AuthContext';
import { Profile } from './components/Profile/Profile';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/collection" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/contact" element={<ContactsPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
