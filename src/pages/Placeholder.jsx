import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Placeholder.css';

export default function Placeholder() {
  const { t } = useLanguage();
  const { page } = useParams();
  const pageTitleMap = {
    privacy: t('legal.privacyTitle'),
    terms: t('legal.termsTitle'),
    help: t('legal.helpTitle'),
    contact: t('contact.contactUs'),
  };
  const title = pageTitleMap[page] || t('placeholder.page');

  return (
    <main className="placeholder-page">
      <h1>{title}</h1>
      <p>{t('placeholder.comingSoon')}</p>
      <Link to="/" className="back-link">← {t('legal.backToHome')}</Link>
    </main>
  );
}
