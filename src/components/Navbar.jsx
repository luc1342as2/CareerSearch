import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, currentUser, logout } = useApp();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isRecruiter = currentUser?.role === 'recruiter';
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end onClick={() => setMobileOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/jobs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Jobs</NavLink></li>
      <li><NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Profile</NavLink></li>
      <li><NavLink to="/messages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Messages</NavLink></li>
      {isRecruiter && <li><NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Recruiter</NavLink></li>}
      <li><NavLink to="/blog" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Blog</NavLink></li>
      <li><NavLink to="/pricing" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Pricing</NavLink></li>
      <li><NavLink to="/account" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Account</NavLink></li>
      {isAuthenticated ? (
        <li><button className="nav-link nav-logout" onClick={handleLogout}>Logout</button></li>
      ) : (
        <>
          <li><NavLink to="/signup" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Sign Up</NavLink></li>
          <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>Login</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
          <span className="logo-icon">💼</span>
          <span className="logo-text">CareerSearch</span>
        </NavLink>

        <ul className="navbar-links navbar-links-desktop">{navLinks}</ul>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <motion.button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`} />
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
        {mobileOpen && (
          <motion.ul
            className="navbar-links navbar-links-mobile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            {navLinks}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
