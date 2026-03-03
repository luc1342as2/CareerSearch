import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

export default function Contact() {
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
        <Link to="/" className="contact-back">← Back to Home</Link>
        <header className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </header>

        <div className="contact-layout">
          <div className="contact-form-wrapper card">
            <h3>Send a Message</h3>
            {submitted ? (
              <div className="contact-success">
                <p>Thank you for your message! We'll get back to you within 24–48 hours.</p>
                <button onClick={() => setSubmitted(false)} className="contact-reset-btn">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
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
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing</option>
                    <option value="recruiter">Recruiter Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief subject"
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can we help?"
                  />
                </div>
                <button type="submit" className="contact-submit-btn">Send Message</button>
              </form>
            )}
          </div>

          <div className="contact-info card">
            <h3>Get in Touch</h3>
            <div className="contact-detail">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>support@careersearch.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Recruiters</strong>
                <p>recruiters@careersearch.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Privacy & Legal</strong>
                <p>privacy@careersearch.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Office</strong>
                <p>123 Career Street, San Francisco, CA 94102</p>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-icon">🕐</span>
              <div>
                <strong>Support Hours</strong>
                <p>Mon–Fri: 9am–6pm PST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
