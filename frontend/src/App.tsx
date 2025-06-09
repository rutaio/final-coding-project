import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { ProductList } from './components/ProductList/ProductList';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { ContactsPage } from './pages/ContactPage/ContactPage';
import { Register } from './components/Forms/Register';
import { Login } from './components/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { UserProfile } from './components/UserProfile/UserProfile';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Footer } from './components/Footer/Footer';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { UserInterfaceProvider } from './contexts/UserInterfaceContext';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <UserInterfaceProvider>
            <div className="app">
              <ToastContainer />
              <Navigation />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<ProductList />} />
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
          </UserInterfaceProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
