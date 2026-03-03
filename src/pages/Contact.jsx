import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${formData.category}] ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:ghiglilucas@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <div className="contact-container">
        <Link to="/" className="contact-back">← {t('contact.backToHome')}</Link>
        <header className="contact-header">
          <h1>{t('contact.contactUs')}</h1>
          <p>{t('contact.getInTouch')}</p>
        </header>

        <div className="contact-layout">
          <div className="contact-form-wrapper card">
            <h3>{t('contact.sendMessage')}</h3>
            {submitted ? (
              <div className="contact-success">
                <p>{t('contact.thankYou')}</p>
                <button onClick={() => setSubmitted(false)} className="contact-reset-btn">{t('contact.sendAnother')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('contact.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.yourName')}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('contact.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('contact.category')}</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="general">{t('contact.generalInquiry')}</option>
                    <option value="support">{t('contact.technicalSupport')}</option>
                    <option value="billing">{t('contact.billing')}</option>
                    <option value="recruiter">{t('contact.recruiterSupport')}</option>
                    <option value="partnership">{t('contact.partnership')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('contact.subject')}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.briefSubject')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('contact.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t('contact.howCanWeHelp')}
                  />
                </div>
                <button type="submit" className="contact-submit-btn">{t('contact.sendMsg')}</button>
              </form>
            )}
          </div>

          <div className="contact-info card">
            <h3>{t('contact.getInTouch')}</h3>
            <div className="contact-detail">
              <span className="contact-icon">📧</span>
              <div>
                <strong>{t('contact.email')}</strong>
                <p>support@careersearch.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-icon">📧</span>
              <div>
                <strong>{t('contact.recruiters')}</strong>
                <p>recruiters@careersearch.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-icon">📧</span>
              <div>
                <strong>{t('contact.privacyLegal')}</strong>
                <p>privacy@careersearch.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-icon">📍</span>
              <div>
                <strong>{t('contact.office')}</strong>
                <p>123 Career Street, San Francisco, CA 94102</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-icon">🕐</span>
              <div>
                <strong>{t('contact.supportHours')}</strong>
                <p>Mon–Fri: 9am–6pm PST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
