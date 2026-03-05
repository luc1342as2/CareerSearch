import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Legal.css';

export default function Terms() {
  const { t } = useLanguage();
  const legalEmail = <a href="mailto:legal@careersearch.com">legal@careersearch.com</a>;
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← {t('legal.backToHome')}</Link>
        <header className="legal-header">
          <h1>{t('legal.termsTitle')}</h1>
          <p className="legal-updated">{t('legal.lastUpdated')}: {t('legal.lastUpdatedDate')}</p>
        </header>

        <div className="legal-content card">
          <section>
            <h2>{t('legal.terms.acceptTitle')}</h2>
            <p>{t('legal.terms.acceptContent')}</p>
          </section>

          <section>
            <h2>{t('legal.terms.serviceTitle')}</h2>
            <p>{t('legal.terms.serviceContent')}</p>
          </section>

          <section>
            <h2>{t('legal.terms.accountsTitle')}</h2>
            <p>{t('legal.terms.accountsContent')}</p>
          </section>

          <section>
            <h2>{t('legal.terms.conductTitle')}</h2>
            <p>{t('legal.terms.conductIntro')}</p>
            <ul>
              <li>{t('legal.terms.conduct1')}</li>
              <li>{t('legal.terms.conduct2')}</li>
              <li>{t('legal.terms.conduct3')}</li>
              <li>{t('legal.terms.conduct4')}</li>
              <li>{t('legal.terms.conduct5')}</li>
            </ul>
          </section>

          <section>
            <h2>{t('legal.terms.paymentsTitle')}</h2>
            <p>{t('legal.terms.paymentsContent')}</p>
          </section>

          <section>
            <h2>{t('legal.terms.ipTitle')}</h2>
            <p>{t('legal.terms.ipContent')}</p>
          </section>

          <section>
            <h2>{t('legal.terms.liabilityTitle')}</h2>
            <p>{t('legal.terms.liabilityContent')}</p>
          </section>

          <section>
            <h2>{t('legal.terms.terminationTitle')}</h2>
            <p>{t('legal.terms.terminationContent')}</p>
          </section>

          <section>
            <h2>{t('legal.terms.contactTitle')}</h2>
            <p>{t('legal.terms.contactContent')} {legalEmail}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
