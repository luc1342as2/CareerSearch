import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, currentUser, logout } = useApp();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
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
      <li><NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end onClick={() => setMobileOpen(false)}>{t('nav.home')}</NavLink></li>
      <li><NavLink to="/jobs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.jobs')}</NavLink></li>
      <li><NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.profile')}</NavLink></li>
      <li><NavLink to="/messages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.messages')}</NavLink></li>
      {isRecruiter && <li><NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.recruiter')}</NavLink></li>}
      <li><NavLink to="/blog" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.blog')}</NavLink></li>
      <li><NavLink to="/pricing" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.pricing')}</NavLink></li>
      <li><NavLink to="/account" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.account')}</NavLink></li>
      {isAuthenticated ? (
        <li><button className="nav-link nav-logout" onClick={handleLogout}>{t('nav.logout')}</button></li>
      ) : (
        <>
          <li><NavLink to="/signup" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.signUp')}</NavLink></li>
          <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>{t('nav.login')}</NavLink></li>
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

        <div className="navbar-controls">
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="ar">العربية</option>
            <option value="ru">Русский</option>
          </select>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={t('theme.switchTo')}
            title={t('theme.switchTo')}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

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
