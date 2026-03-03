import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/blog">Blog</Link>
          <span className="footer-divider">•</span>
          <Link to="/pricing">Pricing</Link>
          <span className="footer-divider">•</span>
          <Link to="/privacy">Privacy Policy</Link>
          <span className="footer-divider">•</span>
          <Link to="/terms">Terms</Link>
          <span className="footer-divider">•</span>
          <Link to="/help">Help Center</Link>
          <span className="footer-divider">•</span>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} CareerSearch. Smart Job Match.
        </p>
      </div>
    </footer>
  );
}
