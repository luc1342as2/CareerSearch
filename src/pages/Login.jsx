import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './Login.css';

export default function Login() {
  const { login, isAuthenticated } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email.trim(), password, role);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Invalid email or password');
    }
  };

  return (
    <main className="login-page">
      <motion.div
        className="login-container card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="login-header">
          <h1>{t('login.welcome')}</h1>
          <p>{t('login.signIn')}</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="form-group">
            <label>{t('login.iAm')}</label>
            <div className="role-selector">
              <label className={`role-option ${role === 'candidate' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={role === 'candidate'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span>{t('login.candidate')}</span>
              </label>
              <label className={`role-option ${role === 'recruiter' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === 'recruiter'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span>{t('login.recruiter')}</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>{t('login.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>{t('login.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn">{t('login.signInBtn')}</button>
        </form>
        <p className="login-signup">
          {t('login.noAccount')} <Link to="/signup">{t('login.createAccount')}</Link>
        </p>
        <div className="login-demo">
          <p>Demo credentials:</p>
          <p><strong>Candidate:</strong> alex.johnson@email.com / candidate123</p>
          <p><strong>Recruiter:</strong> recruiter@careersearch.com / recruiter123</p>
        </div>
      </motion.div>
    </main>
  );
}
