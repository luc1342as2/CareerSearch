import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './TrustBadges.css';

const badgeKeys = [
  { icon: '✓', key: 'gdpr', id: '5' },
  { icon: '🔒', key: 'encrypted', id: '6' },
  { icon: '🤖', key: 'aiMatching', id: '7' },
  { icon: '📱', key: 'mobile', id: '8' },
  { icon: '🔔', key: 'push', id: '9' },
  { icon: '🌐', key: 'multilang', id: '10' },
  { icon: '💳', key: 'payment', id: '11' },
  { icon: '⚡', key: 'performance', id: '12' },
];

export default function TrustBadges({ variant = 'footer' }) {
  const { t } = useLanguage();
  if (variant === 'home') {
    return (
      <section className="trust-badges trust-badges--home">
        <div className="trust-badges-header">
          <h2 className="trust-badges-title">{t('trustBadges.platformStandards')}</h2>
          <p className="trust-badges-subtitle">{t('trustBadges.enterpriseSecurity')}</p>
        </div>
        <div className="trust-badges-grid">
          {badgeKeys.map((badge) => (
            <div key={badge.key} className="trust-badge trust-badge--home">
              <div className="trust-badge-icon-wrap">
                <span className="trust-badge-icon">{badge.icon}</span>
              </div>
              <div className="trust-badge-content">
                <span className="trust-badge-label">{t(`trustBadges.${badge.key}`)}</span>
                <Link to={`/blog/${badge.id}`} className="trust-badge-read-more">{t('trustBadges.readMore')}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className={`trust-badges trust-badges--${variant}`}>
      {badgeKeys.map((badge) => (
        <div key={badge.key} className="trust-badge">
          <span className="trust-badge-icon">{badge.icon}</span>
          <span className="trust-badge-label">{t(`trustBadges.${badge.key}`)}</span>
        </div>
      ))}
    </div>
  );
}
