import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './RequireLogin.css';

export default function RequireLogin({ children }) {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <main className="require-login-page">
        <div className="require-login-card card">
          <h2>Login Required</h2>
          <p>Please sign in to access this page</p>
          <button
            className="require-login-btn"
            onClick={() => navigate('/login', { state: { from: location } })}
          >
            Sign In
          </button>
        </div>
      </main>
    );
  }

  return children;
}
