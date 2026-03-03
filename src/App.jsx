import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import RequireLogin from './components/RequireLogin';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Account from './pages/Account';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Notifications from './pages/Notifications';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Placeholder from './pages/Placeholder';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
      <AppProvider>
        <BrowserRouter basename="/CareerSearch">
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/profile" element={<RequireLogin><Profile /></RequireLogin>} />
              <Route path="/messages" element={<RequireLogin><Messages /></RequireLogin>} />
              <Route path="/account" element={<RequireLogin><Account /></RequireLogin>} />
              <Route path="/recruiter" element={<ProtectedRoute requireRecruiter><RecruiterDashboard /></ProtectedRoute>} />
              <Route path="/notifications" element={<RequireLogin><Notifications /></RequireLogin>} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/help" element={<Help />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/:page" element={<Placeholder />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
    </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
