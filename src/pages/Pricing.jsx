import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './Pricing.css';

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const platformPillars = [
  { icon: '🤖', label: 'AI-driven' },
  { icon: '📈', label: 'Scalable' },
  { icon: '🔒', label: 'Secure' },
  { icon: '🌐', label: 'Multi-language' },
  { icon: '📱', label: 'Mobile-first' },
  { icon: '📊', label: 'Data-driven' },
  { icon: '💳', label: 'Subscription-based' },
];

export default function Pricing() {
  const { getUniversityPartnership, getCorporateHRPackage, createPaidJobPosting, createSponsoredListing } = useApp();
  const { t } = useLanguage();
  const [revenueToast, setRevenueToast] = useState(null);

  const handlePaidPosting = () => {
    const r = createPaidJobPosting({ title: 'Sample Job' }, 49);
    setRevenueToast(r.message);
    setTimeout(() => setRevenueToast(null), 3000);
  };

  const handleSponsored = () => {
    const r = createSponsoredListing('job-1', 7, 15);
    setRevenueToast(r.message);
    setTimeout(() => setRevenueToast(null), 3000);
  };

  const handleUniversity = () => {
    const r = getUniversityPartnership('uni-1');
    setRevenueToast('University partnership info: ' + JSON.stringify(r.partnership?.type));
    setTimeout(() => setRevenueToast(null), 3000);
  };

  const handleCorporate = () => {
    const r = getCorporateHRPackage('company-1', 'enterprise');
    setRevenueToast(`Corporate package: $${r.package?.price}/mo`);
    setTimeout(() => setRevenueToast(null), 3000);
  };

  return (
    <main className="pricing-page">
      <div className="pricing-container">
        <header className="pricing-header">
          <h1>{t('pricing.title')}</h1>
          <p className="pricing-tagline">{t('pricing.tagline')}</p>
        </header>

        <section className="platform-pillars card">
          <h2>{t('pricing.ourPlatform')}</h2>
          <div className="pillars-grid">
            {platformPillars.map((pillar) => (
              <div key={pillar.label} className="pillar-item">
                <span className="pillar-icon">{pillar.icon}</span>
                <span className="pillar-label">{pillar.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pricing-plans">
          <h2>{t('pricing.subscriptionPlans')}</h2>
          <div className="plans-grid">
            <div className="plan-card card plan-candidate">
              <div className="plan-badge">{t('pricing.forCandidates')}</div>
              <h3>{t('pricing.premium')}</h3>
              <p className="plan-desc">{t('pricing.accelerateSearch')}</p>
              <ul className="plan-features">
                <li>
                  <span>Advanced AI insights</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-ai-insights')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>Unlimited video CV</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-video-cv')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>See who viewed your profile</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-profile-viewers')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>Profile boost</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-profile-boost')}>{t('pricing.learnMore')}</button>
                </li>
              </ul>
              <Link to="/account" className="plan-cta">{t('pricing.upgradePremium')}</Link>
            </div>

            <div className="plan-card card plan-recruiter">
              <div className="plan-badge">{t('pricing.forRecruiters')}</div>
              <h3>{t('pricing.monthlySub')}</h3>
              <p className="plan-desc">{t('pricing.findTalent')}</p>
              <ul className="plan-features">
                <li>
                  <span>AI filtering tools</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-ai-filtering')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>Unlimited candidate access</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-unlimited-candidates')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>Featured job posts</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-featured-posts')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>Priority support</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-priority-support')}>{t('pricing.learnMore')}</button>
                </li>
              </ul>
              <Link to="/recruiter" className="plan-cta">{t('pricing.getRecruiterAccess')}</Link>
            </div>
          </div>
        </section>

        <section className="additional-revenue card">
          <h2>{t('pricing.additionalRevenue')}</h2>
          <div className="revenue-grid">
            <div className="revenue-item">
              <span className="revenue-icon">📋</span>
              <div className="revenue-item-content">
                <h4>Paid Job Postings</h4>
                <p>Boost visibility with featured listings — $49/job</p>
                <button className="revenue-learn-btn" onClick={() => scrollToSection('detail-paid-postings')}>{t('pricing.learnMore')}</button>
              </div>
              <button className="revenue-action-btn" onClick={handlePaidPosting} title={t('pricing.try')}>{t('pricing.try')}</button>
            </div>
            <div className="revenue-item">
              <span className="revenue-icon">🎓</span>
              <div className="revenue-item-content">
                <h4>University Partnerships</h4>
                <p>Connect graduates with employers</p>
                <button className="revenue-learn-btn" onClick={() => scrollToSection('detail-university')}>{t('pricing.learnMore')}</button>
              </div>
              <button className="revenue-action-btn" onClick={handleUniversity} title={t('pricing.try')}>{t('pricing.try')}</button>
            </div>
            <div className="revenue-item">
              <span className="revenue-icon">⭐</span>
              <div className="revenue-item-content">
                <h4>Sponsored Listings</h4>
                <p>Premium placement — $15/day</p>
                <button className="revenue-learn-btn" onClick={() => scrollToSection('detail-sponsored')}>{t('pricing.learnMore')}</button>
              </div>
              <button className="revenue-action-btn" onClick={handleSponsored} title={t('pricing.try')}>{t('pricing.try')}</button>
            </div>
            <div className="revenue-item">
              <span className="revenue-icon">🏢</span>
              <div className="revenue-item-content">
                <h4>Corporate HR Packages</h4>
                <p>Enterprise solutions from $299/mo</p>
                <button className="revenue-learn-btn" onClick={() => scrollToSection('detail-corporate')}>{t('pricing.learnMore')}</button>
              </div>
              <button className="revenue-action-btn" onClick={handleCorporate} title={t('pricing.try')}>{t('pricing.try')}</button>
            </div>
          </div>
          {revenueToast && (
            <div className="revenue-toast">{revenueToast}</div>
          )}
        </section>

        <section className="pricing-details">
          <h2>{t('pricing.learnMore')}</h2>
          <div className="details-grid">
            <article id="detail-paid-postings" className="detail-card card">
              <h3>📋 Paid Job Postings</h3>
              <p>Featured listings put your job at the top of search results and in the AI Recommended section. Each posting costs $49 and includes:</p>
              <ul>
                <li>30-day visibility</li>
                <li>Highlighted in candidate feeds</li>
                <li>Priority in AI matching</li>
              </ul>
            </article>
            <article id="detail-university" className="detail-card card">
              <h3>🎓 University Partnerships</h3>
              <p>Partner with universities to connect graduates with employers. We offer:</p>
              <ul>
                <li>Dedicated campus recruitment portals</li>
                <li>Career fair integration</li>
                <li>Graduate talent pools</li>
              </ul>
            </article>
            <article id="detail-sponsored" className="detail-card card">
              <h3>⭐ Sponsored Listings</h3>
              <p>Premium placement for your job posts. $15/day gets you:</p>
              <ul>
                <li>Top-of-page placement</li>
                <li>Extended visibility period</li>
                <li>Higher engagement metrics</li>
              </ul>
            </article>
            <article id="detail-corporate" className="detail-card card">
              <h3>🏢 Corporate HR Packages</h3>
              <p>Enterprise solutions from $299/mo. Includes:</p>
              <ul>
                <li>Unlimited job postings</li>
                <li>Dedicated account manager</li>
                <li>Bulk candidate access</li>
                <li>Custom integrations</li>
              </ul>
            </article>
            <article id="detail-ai-insights" className="detail-card card">
              <h3>🤖 Advanced AI Insights</h3>
              <p>Get personalized analysis of your job matches: skill gaps, salary benchmarks, interview likelihood, and competitor analysis.</p>
            </article>
            <article id="detail-video-cv" className="detail-card card">
              <h3>🎬 Unlimited Video CV</h3>
              <p>Upload multiple video introductions to stand out. Free plan allows 1 video; Premium unlocks unlimited uploads.</p>
            </article>
            <article id="detail-profile-viewers" className="detail-card card">
              <h3>👁️ See Who Viewed Your Profile</h3>
              <p>Discover which recruiters and companies have viewed your profile. Use this to follow up and prioritize applications.</p>
            </article>
            <article id="detail-profile-boost" className="detail-card card">
              <h3>📈 Profile Boost</h3>
              <p>Get your profile featured in recruiter searches for 7 days. Increases visibility and application chances.</p>
            </article>
            <article id="detail-ai-filtering" className="detail-card card">
              <h3>🔍 AI Filtering Tools</h3>
              <p>Use AI to filter candidates by skills, experience, and fit. Save time and find the best talent faster.</p>
            </article>
            <article id="detail-unlimited-candidates" className="detail-card card">
              <h3>👥 Unlimited Candidate Access</h3>
              <p>View and contact unlimited candidates. No per-profile fees or access caps.</p>
            </article>
            <article id="detail-featured-posts" className="detail-card card">
              <h3>📌 Featured Job Posts</h3>
              <p>Your job posts appear in featured sections and get higher placement in search results.</p>
            </article>
            <article id="detail-priority-support" className="detail-card card">
              <h3>⚡ Priority Support</h3>
              <p>Get faster responses from our support team. Dedicated channel for urgent issues.</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
