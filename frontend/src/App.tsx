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
import { UserProfile } from './components/UserProfile/UserProfile';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Footer } from './components/Footer/Footer';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';

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

                <Route
                  path="/admin"
                  element={<ProtectedRoute requiredRole="admin" />}
                >
                  <Route index element={<AdminDashboard />} />
                </Route>

                <Route path="/profile" element={<ProtectedRoute />}>
                  <Route index element={<UserProfile />} />
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
