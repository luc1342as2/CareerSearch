import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/blog">{t('footer.blog')}</Link>
          <span className="footer-divider">•</span>
          <Link to="/roadmap">{t('footer.roadmap')}</Link>
          <span className="footer-divider">•</span>
          <Link to="/pricing">{t('footer.pricing')}</Link>
          <span className="footer-divider">•</span>
          <Link to="/privacy">{t('footer.privacy')}</Link>
          <span className="footer-divider">•</span>
          <Link to="/terms">{t('footer.terms')}</Link>
          <span className="footer-divider">•</span>
          <Link to="/help">{t('footer.help')}</Link>
          <span className="footer-divider">•</span>
          <Link to="/contact">{t('footer.contact')}</Link>
        </div>
        <p className="footer-copyright">
          © 2024 All rights Reserved Lucas Ghigli
        </p>
      </div>
    </footer>
  );
}
