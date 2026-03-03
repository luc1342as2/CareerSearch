import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './RequireLogin.css';

export default function RequireLogin({ children }) {
  const { isAuthenticated } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <main className="require-login-page">
        <div className="require-login-card card">
          <h2>{t('requireLogin.title')}</h2>
          <p>{t('requireLogin.signInToAccess')}</p>
          <button
            className="require-login-btn"
            onClick={() => navigate('/login', { state: { from: location } })}
          >
            {t('requireLogin.signIn')}
          </button>
        </div>
      </main>
    );
  }

  return children;
}
