import { Link } from 'react-router-dom';
import './TrustBadges.css';

const badges = [
  { icon: '✓', label: 'GDPR compliance verified', id: '5' },
  { icon: '🔒', label: 'Encrypted CV & message storage', id: '6' },
  { icon: '🤖', label: 'AI matching tested with real data', id: '7' },
  { icon: '📱', label: 'Mobile responsiveness tested', id: '8' },
  { icon: '🔔', label: 'Push notifications active', id: '9' },
  { icon: '🌐', label: 'Multi-language localization', id: '10' },
  { icon: '💳', label: 'Payment system integrated', id: '11' },
  { icon: '⚡', label: 'Performance load testing completed', id: '12' },
];

export default function TrustBadges({ variant = 'footer' }) {
  if (variant === 'home') {
    return (
      <section className="trust-badges trust-badges--home">
        <div className="trust-badges-header">
          <h2 className="trust-badges-title">Platform Standards</h2>
          <p className="trust-badges-subtitle">Enterprise-grade security and reliability</p>
        </div>
        <div className="trust-badges-grid">
          {badges.map((badge) => (
            <div key={badge.label} className="trust-badge trust-badge--home">
              <div className="trust-badge-icon-wrap">
                <span className="trust-badge-icon">{badge.icon}</span>
              </div>
              <div className="trust-badge-content">
                <span className="trust-badge-label">{badge.label}</span>
                <Link to={`/blog/${badge.id}`} className="trust-badge-read-more">Read more</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className={`trust-badges trust-badges--${variant}`}>
      {badges.map((badge) => (
        <div key={badge.label} className="trust-badge">
          <span className="trust-badge-icon">{badge.icon}</span>
          <span className="trust-badge-label">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
