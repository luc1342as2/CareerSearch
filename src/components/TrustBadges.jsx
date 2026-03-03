import './TrustBadges.css';

const badges = [
  { icon: '✓', label: 'GDPR compliance verified' },
  { icon: '🔒', label: 'Encrypted CV & message storage' },
  { icon: '🤖', label: 'AI matching tested with real data' },
  { icon: '📱', label: 'Mobile responsiveness tested' },
  { icon: '🔔', label: 'Push notifications active' },
  { icon: '🌐', label: 'Multi-language localization' },
  { icon: '💳', label: 'Payment system integrated' },
  { icon: '⚡', label: 'Performance load testing completed' },
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
              <span className="trust-badge-label">{badge.label}</span>
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
