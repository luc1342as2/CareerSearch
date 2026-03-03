import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './SignUp.css';

export default function SignUp() {
  const { signUp } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate', // 'candidate' | 'recruiter'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError(t('signup.errPasswordsMatch'));
      return;
    }
    if (formData.password.length < 6) {
      setError(t('signup.errPasswordLength'));
      return;
    }
    const result = signUp(formData.email.trim(), formData.password, formData.fullName.trim(), formData.role);
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.message || t('signup.errSignUpFailed'));
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-container card">
        <div className="signup-header">
          <h1>{t('signup.createAccount')}</h1>
          <p>{t('signup.joinTagline')}</p>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="signup-error">{error}</div>}
          <div className="form-group">
            <label>I am a</label>
            <div className="role-selector">
              <label className={`role-option ${formData.role === 'candidate' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={formData.role === 'candidate'}
                  onChange={(e) => setFormData((f) => ({ ...f, role: e.target.value }))}
                />
                <span>{t('signup.jobSeeker')}</span>
              </label>
              <label className={`role-option ${formData.role === 'recruiter' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={formData.role === 'recruiter'}
                  onChange={(e) => setFormData((f) => ({ ...f, role: e.target.value }))}
                />
                <span>{t('signup.recruiter')}</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>{formData.role === 'recruiter' ? 'Company Name' : 'Full Name'}</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData((f) => ({ ...f, fullName: e.target.value }))}
              placeholder={formData.role === 'recruiter' ? 'Your company' : 'Your name'}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('contact.email')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>{t('signup.password')}</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((f) => ({ ...f, password: e.target.value }))}
              placeholder={t('signup.min6Chars')}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData((f) => ({ ...f, confirmPassword: e.target.value }))}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="signup-btn">{t('signup.createAccountBtn')}</button>
        </form>
        <p className="signup-login">
          {t('signup.alreadyHave')} <Link to="/login">{t('signup.signIn')}</Link>
        </p>
      </div>
    </main>
  );
}
