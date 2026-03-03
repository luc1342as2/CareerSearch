import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Legal.css';

export default function Terms() {
  const { t } = useLanguage();
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← {t('legal.backToHome')}</Link>
        <header className="legal-header">
          <h1>{t('legal.termsTitle')}</h1>
          <p className="legal-updated">Last updated: March 3, 2025</p>
        </header>

        <div className="legal-content card">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using CareerSearch, you agree to be bound by these Terms of Service. If you do not agree, do not use our platform.</p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>CareerSearch provides an AI-powered job matching platform that connects job seekers with employers. We offer candidate profiles, job listings, recruiter tools, messaging, and subscription plans.</p>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <p>You must create an account to use our services. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. You must provide accurate information and keep your profile up to date.</p>
          </section>

          <section>
            <h2>4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Post false, misleading, or fraudulent information</li>
              <li>Impersonate others or misrepresent your identity</li>
              <li>Harass, discriminate, or violate others' rights</li>
              <li>Scrape, copy, or misuse platform data</li>
              <li>Circumvent security measures or access restrictions</li>
            </ul>
          </section>

          <section>
            <h2>5. Subscription and Payments</h2>
            <p>Premium and Recruiter subscriptions are billed monthly. You may cancel at any time. Refunds are handled per our Refund Policy. We reserve the right to change pricing with 30 days' notice.</p>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>CareerSearch and its content, features, and functionality are owned by us. You retain ownership of your CV, profile content, and messages. By posting content, you grant us a license to use it for platform operations.</p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>CareerSearch is provided "as is." We do not guarantee job placement or specific outcomes. We are not liable for indirect, incidental, or consequential damages arising from your use of the platform.</p>
          </section>

          <section>
            <h2>8. Termination</h2>
            <p>We may suspend or terminate your account for violations of these terms. You may delete your account at any time through Account Settings.</p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>Questions about these terms: <a href="mailto:legal@careersearch.com">legal@careersearch.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
