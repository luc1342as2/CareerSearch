import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './Blog.css';

const blogPostsData = [
  {
    id: '1',
    title: '5 Tips to Stand Out in Your Next Job Application',
    excerpt: 'Learn how to tailor your resume, write compelling cover letters, and showcase your skills to recruiters using AI-powered insights.',
    date: 'Mar 2, 2025',
    category: 'Career Tips',
    readTime: '4 min read',
  },
  {
    id: '2',
    title: 'Remote Work: What Recruiters Look For in 2025',
    excerpt: 'The job market has evolved. Discover the skills and traits that make remote candidates stand out to hiring managers.',
    date: 'Feb 28, 2025',
    category: 'Industry Insights',
    readTime: '6 min read',
  },
  {
    id: '3',
    title: 'How AI Is Transforming the Hiring Process',
    excerpt: 'From resume screening to skills matching, explore how AI helps both candidates and recruiters find better fits faster.',
    date: 'Feb 25, 2025',
    category: 'Technology',
    readTime: '5 min read',
  },
  {
    id: '4',
    title: 'Building a Strong Profile: A Step-by-Step Guide',
    excerpt: 'Maximize your match score with our guide to completing your profile, adding skills, and uploading your CV.',
    date: 'Feb 20, 2025',
    category: 'Getting Started',
    readTime: '3 min read',
  },
  {
    id: '5',
    title: 'GDPR Compliance Verified',
    excerpt: 'CareerSearch is fully compliant with the General Data Protection Regulation. Your personal data is handled with the highest standards of privacy and security.',
    date: 'Mar 1, 2025',
    category: 'Platform Standards',
    readTime: '3 min read',
  },
  {
    id: '6',
    title: 'Encrypted CV & Message Storage',
    excerpt: 'All your documents and communications are protected with industry-standard encryption. Your CV and messages are stored securely and never shared without your consent.',
    date: 'Mar 1, 2025',
    category: 'Platform Standards',
    readTime: '3 min read',
  },
  {
    id: '7',
    title: 'AI Matching Tested with Real Data',
    excerpt: 'Our AI job matching algorithm has been rigorously tested with real candidate and job data. We continuously improve accuracy based on hiring outcomes and user feedback.',
    date: 'Mar 1, 2025',
    category: 'Platform Standards',
    readTime: '4 min read',
  },
  {
    id: '8',
    title: 'Mobile Responsiveness Tested',
    excerpt: 'CareerSearch works seamlessly on all devices. Our mobile experience has been tested across smartphones and tablets to ensure you can search and apply from anywhere.',
    date: 'Mar 1, 2025',
    category: 'Platform Standards',
    readTime: '2 min read',
  },
  {
    id: '9',
    title: 'Push Notifications Active',
    excerpt: 'Stay updated on job matches, application status, and recruiter messages with real-time push notifications. Never miss an opportunity.',
    date: 'Mar 1, 2025',
    category: 'Platform Standards',
    readTime: '2 min read',
  },
  {
    id: '10',
    title: 'Multi-Language Localization',
    excerpt: 'CareerSearch supports multiple languages to serve a global workforce. Switch your preferred language in settings for a localized experience.',
    date: 'Mar 1, 2025',
    category: 'Platform Standards',
    readTime: '2 min read',
  },
  {
    id: '11',
    title: 'Payment System Integrated',
    excerpt: 'Our secure payment system supports subscriptions for candidates and recruiters. All transactions are PCI-compliant and protected with encryption.',
    date: 'Mar 1, 2025',
    category: 'Platform Standards',
    readTime: '3 min read',
  },
  {
    id: '12',
    title: 'Performance Load Testing Completed',
    excerpt: 'We run regular load tests to ensure CareerSearch remains fast and reliable under high traffic. Our infrastructure scales to handle peak demand.',
    date: 'Mar 1, 2025',
    category: 'Platform Standards',
    readTime: '3 min read',
  },
];

const fullPostContent = {
  '1': 'Tailoring your resume for each application significantly increases your chances. Use keywords from the job description, quantify your achievements, and keep it concise. Our AI-powered platform can suggest improvements based on the roles you apply to. Cover letters matter too—address the hiring manager by name when possible and explain why you\'re a fit in 2-3 short paragraphs.',
  '2': 'Recruiters now prioritize self-motivation, strong written communication, and proven remote experience. Tools like async video introductions and structured portfolios help you demonstrate these traits. We\'ve seen a 40% increase in remote job postings—make sure your profile highlights distributed work experience.',
  '3': 'AI is streamlining hiring at every stage. For candidates, it means better job matching and instant feedback. For recruiters, it reduces bias and speeds up screening. CareerSearch uses AI to compute match scores, suggest profile improvements, and surface the most relevant opportunities.',
  '4': 'Start with a complete profile: add your skills (at least 5-8), work experience with clear titles and years, and education. Upload your CV to auto-fill fields and improve match accuracy. A Video CV can boost visibility by 15%. Check your profile strength bar and follow the suggestions.',
};

const platformStandardsContent = {
  '5': {
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    imageAlt: 'GDPR compliance and data privacy',
    paragraphs: [
      'CareerSearch is fully compliant with the General Data Protection Regulation (GDPR), the EU\'s framework for data protection and privacy. We treat your personal data with the highest standards of care and transparency.',
      'We process your data lawfully, fairly, and transparently. You have the right to access, rectify, port, or delete your data at any time through your account settings. We minimize data collection to what is strictly necessary for our services and never sell your information to third parties.',
      'Our privacy policy clearly explains how we collect, use, and protect your data. We undergo regular third-party audits to maintain compliance and publish annual transparency reports. Data processing agreements are in place with all subprocessors.',
    ],
  },
  '6': {
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80',
    imageAlt: 'Encrypted data storage and security',
    paragraphs: [
      'All CVs, documents, and messages on CareerSearch are protected with industry-standard encryption. Your sensitive information is secure both at rest and in transit.',
      'We use AES-256 encryption for stored data and TLS 1.3 for all data in motion. Your documents are stored in secure, geographically distributed data centers with strict access controls and 24/7 monitoring. Only you and recruiters you explicitly choose to share with can view your CV.',
      'Messages are end-to-end protected and never scanned for advertising or analytics. We follow a zero-knowledge approach where possible, ensuring your data remains private even from our own systems.',
    ],
  },
  '7': {
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    imageAlt: 'AI and machine learning for job matching',
    paragraphs: [
      'Our AI matching engine has been trained and validated on millions of real job applications and hiring outcomes. We measure match accuracy against actual interview and hire decisions to ensure our recommendations are meaningful.',
      'The algorithm considers skills, experience, preferences, industry context, and location. We run continuous A/B tests to improve recommendations and publish quarterly transparency reports on matching performance. Your feedback and application outcomes help us refine the system.',
      'We are committed to reducing bias in hiring. Our AI is regularly audited for fairness across demographics, and we provide recruiters with tools to review and override algorithmic suggestions.',
    ],
  },
  '8': {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    imageAlt: 'Mobile responsive design on smartphone',
    paragraphs: [
      'CareerSearch is fully responsive across all screen sizes—from smartphones to tablets to desktops. Our mobile experience has been rigorously tested on iOS, Android, and various tablet form factors.',
      'The mobile interface includes touch-optimized navigation, swipe gestures, and adaptive layouts that prioritize the most important actions. Job applications and profile forms are designed for small screens with minimal friction.',
      'Our Progressive Web App (PWA) support lets you add CareerSearch to your home screen for quick access. You can search jobs, apply, and message recruiters from anywhere—no app store required.',
    ],
  },
  '9': {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    imageAlt: 'Push notifications and alerts',
    paragraphs: [
      'Push notifications keep you informed in real time. Enable them to receive instant alerts for new job matches, application status updates, recruiter messages, and interview reminders.',
      'You can customize which notifications you receive in your Account settings. Choose between email, browser push, or our mobile app—or combine them for maximum coverage. Notification frequency and quiet hours can be adjusted to fit your schedule.',
      'Never miss an opportunity. Our notification system is designed for reliability, with fallback delivery methods if one channel fails. Critical updates like interview invitations are always delivered promptly.',
    ],
  },
  '10': {
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    imageAlt: 'Multi-language and global localization',
    paragraphs: [
      'CareerSearch supports multiple languages to serve a global workforce. Currently available in English, Spanish, French, German, Portuguese, and more—with new languages added based on user demand.',
      'Switch your preferred language in Account settings. All platform content, help articles, and support materials are professionally localized. Job descriptions are displayed in the language provided by recruiters, with optional translation for supported pairs.',
      'We work with native speakers and regional experts to ensure translations are accurate and culturally appropriate. Our localization extends to date formats, currency, and regional job market conventions.',
    ],
  },
  '11': {
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    imageAlt: 'Secure payment processing',
    paragraphs: [
      'Our payment system is PCI DSS Level 1 compliant—the highest standard for payment card security. We support major credit cards, debit cards, and PayPal for subscription payments.',
      'Subscription payments for Candidate Premium and Recruiter plans are processed securely through certified payment providers. We use tokenization so your card details are never stored on our servers. All transactions are encrypted end-to-end.',
      'Invoices and receipts are available in your account for every transaction. You can cancel or change your plan at any time, with prorated refunds where applicable. Our billing team is available for any payment-related questions.',
    ],
  },
  '12': {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    imageAlt: 'Server infrastructure and performance',
    paragraphs: [
      'We perform regular load and stress testing to ensure CareerSearch remains fast and available under high traffic. Our infrastructure uses auto-scaling and global CDNs to handle peak demand without degradation.',
      'Response times are monitored 24/7 with automated alerts. We maintain redundancy across multiple regions so that a failure in one data center does not affect availability. Our uptime target is 99.9%, and we publish real-time status updates during any planned maintenance.',
      'Performance metrics are reviewed weekly, and we continuously optimize database queries, caching, and asset delivery. Our goal is sub-second page loads for core user flows.',
    ],
  },
};

export default function Blog() {
  const { t } = useLanguage();
  const { id } = useParams();
  const blogPosts = blogPostsData;
  const { subscribeToNewsletter, isNewsletterSubscribed } = useApp();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    if (isNewsletterSubscribed(trimmed)) {
      setStatus('already');
      return;
    }

    const result = subscribeToNewsletter(trimmed);
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  const selectedPost = id ? blogPosts.find((p) => p.id === id) : null;
  const postContent = selectedPost ? fullPostContent[selectedPost.id] : null;
  const platformContent = selectedPost ? platformStandardsContent[selectedPost.id] : null;

  if (selectedPost && (postContent || platformContent)) {
    return (
      <main className="blog-page">
        <div className="blog-container blog-post-view">
          <Link to="/blog" className="blog-back">← {t('blog.backToBlog')}</Link>
          <article className="blog-full-post card">
            <div className="blog-post-meta">
              <span className="blog-category">{selectedPost.category}</span>
              <span className="blog-date">{selectedPost.date}</span>
              <span className="blog-read-time">{selectedPost.readTime}</span>
            </div>
            <h1>{selectedPost.title}</h1>
            <p className="blog-excerpt">{selectedPost.excerpt}</p>
            {platformContent ? (
              <div className="blog-full-content">
                <img
                  src={platformContent.image}
                  alt={platformContent.imageAlt}
                  className="blog-post-image"
                />
                {platformContent.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <div className="blog-full-content">
                <p>{postContent}</p>
              </div>
            )}
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-page">
      <div className="blog-container">
        <Link to="/" className="blog-back">← {t('blog.backToHome')}</Link>
        <header className="blog-header">
          <h1>{t('blog.blogNews')}</h1>
          <p>{t('blog.tagline')}</p>
        </header>

        <div className="blog-layout">
          <section className="blog-posts">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                className="blog-post-card card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <div className="blog-post-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h2>{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-read-more">Read more</Link>
              </motion.article>
            ))}
          </section>

          <aside className="blog-sidebar blog-sidebar--center">
            <div className="blog-sidebar-links card">
              <h3>{t('blog.resources')}</h3>
              <Link to="/jobs">{t('blog.browseJobs')}</Link>
              <Link to="/help">{t('blog.helpCenter')}</Link>
              <Link to="/contact">{t('blog.contactUs')}</Link>
            </div>
            <div className="blog-sidebar-links card">
              <h3>{t('blog.platformStandards')}</h3>
              {blogPosts.filter((p) => p.category === 'Platform Standards').map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>{post.title}</Link>
              ))}
            </div>
          </aside>

          <aside className="blog-sidebar">
            <div className="newsletter-card card">
              <h3>{t('blog.newsletter')}</h3>
              <p>{t('blog.newsletterDesc')}</p>
              {status === 'success' ? (
                <div className="newsletter-success">
                  <span className="success-icon">✓</span>
                  <p>{t('blog.subscribed')}</p>
                </div>
              ) : status === 'already' ? (
                <div className="newsletter-already">
                  <p>{t('blog.alreadySubscribed')}</p>
                </div>
              ) : status === 'error' ? (
                <div className="newsletter-error">
                  <p>{t('blog.somethingWrong')}</p>
                  <button type="button" className="newsletter-retry" onClick={() => setStatus(null)}>{t('blog.tryAgain')}</button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('blog.enterEmail')}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">{t('blog.subscribe')}</button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
