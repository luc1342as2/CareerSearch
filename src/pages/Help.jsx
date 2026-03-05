import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Help.css';

const faqCategoryKeys = {
  'Getting Started': 'categoryGettingStarted',
  'Profile': 'categoryProfile',
  'Jobs': 'categoryJobs',
  'Recruiters': 'categoryRecruiters',
  'Billing': 'categoryBilling',
};

const faqs = [
  { id: 1, category: 'Getting Started' },
  { id: 2, category: 'Getting Started' },
  { id: 3, category: 'Profile' },
  { id: 4, category: 'Profile' },
  { id: 5, category: 'Jobs' },
  { id: 6, category: 'Jobs' },
  { id: 7, category: 'Recruiters' },
  { id: 8, category: 'Recruiters' },
  { id: 9, category: 'Billing' },
  { id: 10, category: 'Billing' },
];

const categories = [...new Set(faqs.map((f) => f.category))];

export default function Help() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredFaqs = faqs.filter((faq) => {
    const q = t(`help.faq${faq.id}q`);
    const a = t(`help.faq${faq.id}a`);
    const matchesSearch =
      !searchQuery ||
      q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.toLowerCase().includes(searchQuery.toLowerCase());
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
                {t(`help.${faqCategoryKeys[cat]}`)}
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
                <span className="help-faq-category">{t(`help.${faqCategoryKeys[faq.category]}`)}</span>
                <h3>{t(`help.faq${faq.id}q`)}</h3>
                <span className="help-faq-toggle">{expandedId === faq.id ? '−' : '+'}</span>
              </div>
              {expandedId === faq.id && <p className="help-faq-answer">{t(`help.faq${faq.id}a`)}</p>}
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
