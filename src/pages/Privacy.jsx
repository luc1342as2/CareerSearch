import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Legal.css';

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← {t('legal.backToHome')}</Link>
        <header className="legal-header">
          <h1>{t('legal.privacyTitle')}</h1>
          <p className="legal-updated">Last updated: March 3, 2025</p>
        </header>

        <div className="legal-content card">
          <section>
            <h2>1. Introduction</h2>
            <p>CareerSearch ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered job matching platform.</p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Name, email address, phone number, and location</li>
              <li>CV/resume, video CV, and portfolio links</li>
              <li>Skills, work experience, education, and certifications</li>
              <li>Job preferences (salary range, work type, preferred locations)</li>
            </ul>
            <h3>Usage Data</h3>
            <ul>
              <li>Profile views, job applications, and saved jobs</li>
              <li>Match scores and AI interaction data</li>
              <li>Device information and IP address</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>AI job matching and personalized recommendations</li>
              <li>Connecting candidates with recruiters</li>
              <li>Improving our matching algorithms</li>
              <li>Sending notifications about job matches and applications</li>
              <li>Analytics and platform improvement</li>
              <li>Compliance with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>We implement industry-standard security measures including encryption for CV and message storage, GDPR compliance, and regular security audits. Your data is stored on secure servers with access controls.</p>
          </section>

          <section>
            <h2>5. Your Rights (GDPR)</h2>
            <p>If you are in the European Economic Area, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure ("right to be forgotten")</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
              <li>Withdraw consent</li>
            </ul>
            <p>Contact us at <a href="mailto:privacy@careersearch.com">privacy@careersearch.com</a> to exercise these rights.</p>
          </section>

          <section>
            <h2>6. Cookies and Tracking</h2>
            <p>We use essential cookies for authentication and session management. Optional analytics cookies help us improve the platform. You can manage cookie preferences in your account settings.</p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>For privacy-related inquiries: <a href="mailto:privacy@careersearch.com">privacy@careersearch.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
