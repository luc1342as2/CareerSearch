import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Legal.css';

export default function Privacy() {
  const { t } = useLanguage();
  const privacyEmail = <a href="mailto:privacy@careersearch.com">privacy@careersearch.com</a>;
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← {t('legal.backToHome')}</Link>
        <header className="legal-header">
          <h1>{t('legal.privacyTitle')}</h1>
          <p className="legal-updated">{t('legal.lastUpdated')}: {t('legal.lastUpdatedDate')}</p>
        </header>

        <div className="legal-content card">
          <section>
            <h2>{t('legal.privacy.introTitle')}</h2>
            <p>{t('legal.privacy.introContent')}</p>
          </section>

          <section>
            <h2>{t('legal.privacy.collectTitle')}</h2>
            <h3>{t('legal.privacy.personalTitle')}</h3>
            <ul>
              <li>{t('legal.privacy.personal1')}</li>
              <li>{t('legal.privacy.personal2')}</li>
              <li>{t('legal.privacy.personal3')}</li>
              <li>{t('legal.privacy.personal4')}</li>
            </ul>
            <h3>{t('legal.privacy.usageTitle')}</h3>
            <ul>
              <li>{t('legal.privacy.usage1')}</li>
              <li>{t('legal.privacy.usage2')}</li>
              <li>{t('legal.privacy.usage3')}</li>
            </ul>
          </section>

          <section>
            <h2>{t('legal.privacy.useTitle')}</h2>
            <ul>
              <li>{t('legal.privacy.use1')}</li>
              <li>{t('legal.privacy.use2')}</li>
              <li>{t('legal.privacy.use3')}</li>
              <li>{t('legal.privacy.use4')}</li>
              <li>{t('legal.privacy.use5')}</li>
              <li>{t('legal.privacy.use6')}</li>
            </ul>
          </section>

          <section>
            <h2>{t('legal.privacy.securityTitle')}</h2>
            <p>{t('legal.privacy.securityContent')}</p>
          </section>

          <section>
            <h2>{t('legal.privacy.rightsTitle')}</h2>
            <p>{t('legal.privacy.rightsIntro')}</p>
            <ul>
              <li>{t('legal.privacy.rights1')}</li>
              <li>{t('legal.privacy.rights2')}</li>
              <li>{t('legal.privacy.rights3')}</li>
              <li>{t('legal.privacy.rights4')}</li>
              <li>{t('legal.privacy.rights5')}</li>
              <li>{t('legal.privacy.rights6')}</li>
              <li>{t('legal.privacy.rights7')}</li>
            </ul>
            <p>{t('legal.privacy.rightsContactBefore')} {privacyEmail} {t('legal.privacy.rightsContactAfter')}</p>
          </section>

          <section>
            <h2>{t('legal.privacy.cookiesTitle')}</h2>
            <p>{t('legal.privacy.cookiesContent')}</p>
          </section>

          <section>
            <h2>{t('legal.privacy.contactTitle')}</h2>
            <p>{t('legal.privacy.contactContent')} {privacyEmail}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
