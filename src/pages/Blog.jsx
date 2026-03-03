import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
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
  '5': 'CareerSearch is fully compliant with the General Data Protection Regulation (GDPR). We process your personal data lawfully, fairly, and transparently. You have the right to access, rectify, or delete your data at any time. We minimize data collection to what is necessary for our services and never sell your information to third parties. Our privacy policy clearly explains how we handle your data, and we undergo regular audits to maintain compliance.',
  '6': 'All CVs and messages on CareerSearch are encrypted at rest and in transit. We use AES-256 encryption for stored data and TLS 1.3 for data in motion. Your documents are stored in secure, geographically distributed data centers with strict access controls. Only you and recruiters you choose to share with can view your CV. Messages are end-to-end protected and never scanned for advertising purposes.',
  '7': 'Our AI matching engine has been trained and validated on millions of real job applications and hiring outcomes. We measure match accuracy against actual interview and hire decisions. The algorithm considers skills, experience, preferences, and industry context. We run A/B tests to improve recommendations and publish transparency reports on matching performance. Your feedback helps us refine the system continuously.',
  '8': 'CareerSearch is fully responsive across all screen sizes. We test on iOS, Android, and various tablet form factors. The mobile experience includes touch-optimized navigation, swipe gestures, and adaptive layouts. Forms and job applications are designed for small screens, and our PWA support lets you add CareerSearch to your home screen for quick access.',
  '9': 'Push notifications keep you informed in real time. Enable them to receive alerts for new job matches, application updates, recruiter messages, and interview reminders. You can customize which notifications you receive in your account settings. Notifications are delivered through your browser or our mobile app, so you never miss an important update.',
  '10': 'CareerSearch supports multiple languages including English, Spanish, French, German, and more. You can switch your preferred language in Account settings. All platform content, job descriptions (when provided by recruiters), and support materials are localized. We continuously add new languages based on user demand and regional expansion.',
  '11': 'Our payment system is PCI DSS compliant and supports major credit cards and PayPal. Subscription payments for Candidate Premium and Recruiter plans are processed securely. We use tokenization so your card details are never stored on our servers. Invoices and receipts are available in your account, and you can cancel or change your plan at any time.',
  '12': 'We perform regular load and stress testing to ensure CareerSearch remains fast and available under high traffic. Our infrastructure uses auto-scaling and CDNs to handle peak demand. Response times are monitored 24/7, and we have redundancy across multiple regions. Our uptime target is 99.9%, and we publish status updates during any planned maintenance.',
};

export default function Blog() {
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

  if (selectedPost && postContent) {
    return (
      <main className="blog-page">
        <div className="blog-container blog-post-view">
          <Link to="/blog" className="blog-back">← Back to Blog</Link>
          <article className="blog-full-post card">
            <div className="blog-post-meta">
              <span className="blog-category">{selectedPost.category}</span>
              <span className="blog-date">{selectedPost.date}</span>
              <span className="blog-read-time">{selectedPost.readTime}</span>
            </div>
            <h1>{selectedPost.title}</h1>
            <p className="blog-excerpt">{selectedPost.excerpt}</p>
            <div className="blog-full-content">
              <p>{postContent}</p>
            </div>
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-page">
      <div className="blog-container">
        <Link to="/" className="blog-back">← Back to Home</Link>
        <header className="blog-header">
          <h1>Blog & News</h1>
          <p>Career insights, industry trends, and tips to advance your job search</p>
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
              <h3>Resources</h3>
              <Link to="/jobs">Browse Jobs</Link>
              <Link to="/help">Help Center</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="blog-sidebar-links card">
              <h3>Platform Standards</h3>
              {blogPosts.filter((p) => p.category === 'Platform Standards').map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>{post.title}</Link>
              ))}
            </div>
          </aside>

          <aside className="blog-sidebar">
            <div className="newsletter-card card">
              <h3>Newsletter</h3>
              <p>Get career tips, job market insights, and platform updates delivered to your inbox.</p>
              {status === 'success' ? (
                <div className="newsletter-success">
                  <span className="success-icon">✓</span>
                  <p>You're subscribed! Check your inbox for our next update.</p>
                </div>
              ) : status === 'already' ? (
                <div className="newsletter-already">
                  <p>This email is already subscribed. Thanks for being with us!</p>
                </div>
              ) : status === 'error' ? (
                <div className="newsletter-error">
                  <p>Something went wrong. Please try again.</p>
                  <button type="button" className="newsletter-retry" onClick={() => setStatus(null)}>Try again</button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">Subscribe</button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
