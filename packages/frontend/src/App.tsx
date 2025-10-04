import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout'; 

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/features" element={<HomePage />} />
        <Route path="/how-it-works" element={<HomePage />} />
        <Route path="/success-stories" element={<HomePage />} />
        <Route path="/pricing" element={<HomePage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
         <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* We can add a placeholder settings page */}
          <Route path="/settings" element={<div><h1>Settings Page</h1></div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
