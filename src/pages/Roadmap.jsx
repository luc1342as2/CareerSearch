import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Roadmap.css';

export default function Roadmap() {
  const { t } = useLanguage();

  return (
    <motion.main
      className="roadmap-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="roadmap-container">
        <Link to="/" className="roadmap-back">← {t('legal.backToHome')}</Link>

        <header className="roadmap-header">
          <h1>{t('roadmap.title')}</h1>
          <p>{t('roadmap.tagline')}</p>
        </header>

        <section className="roadmap-phase card">
          <div className="roadmap-phase-badge">💬 {t('roadmap.phase7')}</div>
          <h2>{t('roadmap.realtimeMessaging')}</h2>
          <div className="roadmap-options">
            <div className="roadmap-option">
              <span className="roadmap-option-label">{t('roadmap.option')} 1:</span>
              <strong>{t('roadmap.firebase')}</strong>
              <span className="roadmap-option-tag">{t('roadmap.easy')}</span>
            </div>
            <div className="roadmap-option">
              <span className="roadmap-option-label">{t('roadmap.option')} 2:</span>
              <strong>Socket.io</strong>
              <span className="roadmap-option-tag professional">{t('roadmap.professional')}</span>
            </div>
          </div>
          <ul className="roadmap-features">
            <li>{t('roadmap.featureChat')}</li>
            <li>{t('roadmap.featureReadReceipts')}</li>
            <li>{t('roadmap.featureNotificationBadge')}</li>
          </ul>
        </section>

        <section className="roadmap-phase card">
          <div className="roadmap-phase-badge">☁️ {t('roadmap.phase8')}</div>
          <h2>{t('roadmap.deployment')}</h2>
          <div className="roadmap-deploy-grid">
            <div className="roadmap-deploy-block">
              <h3>{t('roadmap.frontend')}</h3>
              <p>{t('roadmap.deployTo')}</p>
              <ul>
                <li><span className="roadmap-recommended">👉</span> Vercel <span className="roadmap-badge">{t('roadmap.recommended')}</span></li>
              </ul>
            </div>
            <div className="roadmap-deploy-block">
              <h3>{t('roadmap.backend')}</h3>
              <p>{t('roadmap.deployTo')}</p>
              <ul>
                <li>{t('roadmap.render')}</li>
                <li>{t('roadmap.railway')}</li>
                <li>{t('roadmap.awsEc2')}</li>
              </ul>
            </div>
            <div className="roadmap-deploy-block">
              <h3>{t('roadmap.database')}</h3>
              <p>{t('roadmap.deployTo')}</p>
              <ul>
                <li>{t('roadmap.supabase')}</li>
                <li>{t('roadmap.railway')}</li>
                <li>{t('roadmap.awsRds')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="roadmap-phase card">
          <div className="roadmap-phase-badge">🔥 {t('roadmap.phase10')}</div>
          <h2>{t('roadmap.realStartup')}</h2>
          <ul className="roadmap-features">
            <li>{t('roadmap.featureDarkMode')}</li>
            <li>{t('roadmap.featureLandingPage')}</li>
            <li>{t('roadmap.featurePricingPage')}</li>
            <li>{t('roadmap.featureTestimonials')}</li>
            <li>{t('roadmap.featureComparison')}</li>
            <li>{t('roadmap.featureAdminPanel')}</li>
          </ul>
        </section>
      </div>
    </motion.main>
  );
}
