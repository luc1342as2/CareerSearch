import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Help.css';

const faqs = [
  {
    id: 1,
    category: 'Getting Started',
    q: 'How do I create an account?',
    a: 'Click Login and sign up with your email. You can create a candidate or recruiter account. Complete your profile to get better job matches.',
  },
  {
    id: 2,
    category: 'Getting Started',
    q: 'How does AI job matching work?',
    a: 'Our AI analyzes your skills, experience, and preferences to find jobs that match your profile. Match scores (0–100%) show how well each job fits your profile.',
  },
  {
    id: 3,
    category: 'Profile',
    q: 'How do I improve my match score?',
    a: 'Add a complete profile: upload your CV, add skills, experience, and education. A Video CV can increase visibility. Check your profile strength indicator for suggestions.',
  },
  {
    id: 4,
    category: 'Profile',
    q: 'Can I make my profile private?',
    a: 'Yes. Go to Account → Privacy Controls and set your profile to Private. Recruiters will only see your profile when you apply to their jobs.',
  },
  {
    id: 5,
    category: 'Jobs',
    q: 'How do I apply to jobs?',
    a: 'Browse jobs and click "Apply" on any listing. Your profile and CV will be sent to the recruiter. You can track applications in your dashboard.',
  },
  {
    id: 6,
    category: 'Jobs',
    q: 'What if I don\'t see jobs in my area?',
    a: 'Use filters to search by location, work type (Remote/Hybrid/On-site), and industry. Adjust your job preferences in the Profile section.',
  },
  {
    id: 7,
    category: 'Recruiters',
    q: 'How do I post a job?',
    a: 'Log in as a recruiter and click "Post New Job" in the Recruiter Dashboard. Fill in the job details and publish. Premium plans offer featured listings.',
  },
  {
    id: 8,
    category: 'Recruiters',
    q: 'How do I contact candidates?',
    a: 'Use the Messages feature to send direct messages. You can also invite candidates to interviews from the candidate preview card.',
  },
  {
    id: 9,
    category: 'Billing',
    q: 'How do I cancel my subscription?',
    a: 'Go to Account → Subscription Plan and click Cancel. You retain access until the end of your billing period.',
  },
  {
    id: 10,
    category: 'Billing',
    q: 'What payment methods do you accept?',
    a: 'We accept major credit cards and PayPal. Payment is processed securely through our payment system.',
  },
];

const categories = [...new Set(faqs.map((f) => f.category))];

export default function Help() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      !searchQuery ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="help-page">
      <div className="help-container">
        <Link to="/" className="help-back">← {t('legal.backToHome')}</Link>
        <header className="help-header">
          <h1>{t('legal.helpTitle')}</h1>
          <p>{t('help.findAnswers')}</p>
        </header>

        <div className="help-search card">
          <input
            type="text"
            placeholder={t('help.searchPlaceholder')}
            className="help-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="help-categories">
            <button
              className={`help-category-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              {t('help.all')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`help-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="help-faqs">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className={`help-faq-item card ${expandedId === faq.id ? 'expanded' : ''}`}
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            >
              <div className="help-faq-header">
                <span className="help-faq-category">{faq.category}</span>
                <h3>{faq.q}</h3>
                <span className="help-faq-toggle">{expandedId === faq.id ? '−' : '+'}</span>
              </div>
              {expandedId === faq.id && <p className="help-faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <p className="help-no-results">{t('help.noResults')} <Link to="/contact">{t('help.contactUs')}</Link>.</p>
        )}

        <div className="help-contact-cta card">
          <h3>{t('help.stillNeedHelp')}</h3>
          <p>{t('help.supportHere')}</p>
          <Link to="/contact" className="help-cta-btn">{t('help.contactSupport')}</Link>
        </div>
      </div>
    </main>
  );
}
