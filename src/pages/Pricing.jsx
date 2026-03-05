import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './Pricing.css';

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const platformPillars = [
  { icon: '🤖', key: 'aiDriven' },
  { icon: '📈', key: 'scalable' },
  { icon: '🔒', key: 'secure' },
  { icon: '🌐', key: 'multilang' },
  { icon: '📱', key: 'mobileFirst' },
  { icon: '📊', key: 'dataDriven' },
  { icon: '💳', key: 'subscriptionBased' },
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
              <div key={pillar.key} className="pillar-item">
                <span className="pillar-icon">{pillar.icon}</span>
                <span className="pillar-label">{t(`pricing.${pillar.key}`)}</span>
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
                  <span>{t('pricing.candidateSeeViewers')}</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-profile-viewers')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>{t('pricing.candidateBoostProfile')}</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-profile-boost')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>{t('pricing.candidateUnlimitedApps')}</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-unlimited-apps')}>{t('pricing.learnMore')}</button>
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
                  <span>{t('pricing.recruiterAiFilters')}</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-ai-filtering')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>{t('pricing.recruiterFeaturedPosts')}</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-featured-posts')}>{t('pricing.learnMore')}</button>
                </li>
                <li>
                  <span>{t('pricing.recruiterAdvancedAnalytics')}</span>
                  <button type="button" className="feature-learn-btn" onClick={() => scrollToSection('detail-advanced-analytics')}>{t('pricing.learnMore')}</button>
                </li>
              </ul>
              <Link to="/recruiter" className="plan-cta">{t('pricing.getRecruiterAccess')}</Link>
            </div>
          </div>
        </section>

        <section className="stripe-integration card">
          <h2>{t('pricing.stripeIntegration')}</h2>
          <div className="stripe-content">
            <span className="stripe-icon">💳</span>
            <p>{t('pricing.stripeDescription')}</p>
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
                <h4>{t('pricing.universityPartnerships')}</h4>
                <p>{t('pricing.universityPartnershipsDesc')}</p>
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
                <h4>{t('pricing.corporateHRPackages')}</h4>
                <p>{t('pricing.corporateHRPackagesDesc')}</p>
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
              <h3>📋 {t('pricing.detailPaidTitle')}</h3>
              <p>{t('pricing.detailPaidIntro')}</p>
              <ul>
                <li>{t('pricing.detailPaid1')}</li>
                <li>{t('pricing.detailPaid2')}</li>
                <li>{t('pricing.detailPaid3')}</li>
              </ul>
            </article>
            <article id="detail-university" className="detail-card card">
              <h3>🎓 {t('pricing.detailUniTitle')}</h3>
              <p>{t('pricing.detailUniIntro')}</p>
              <ul>
                <li>{t('pricing.detailUni1')}</li>
                <li>{t('pricing.detailUni2')}</li>
                <li>{t('pricing.detailUni3')}</li>
              </ul>
            </article>
            <article id="detail-sponsored" className="detail-card card">
              <h3>⭐ {t('pricing.detailSponsoredTitle')}</h3>
              <p>{t('pricing.detailSponsoredIntro')}</p>
              <ul>
                <li>{t('pricing.detailSponsored1')}</li>
                <li>{t('pricing.detailSponsored2')}</li>
                <li>{t('pricing.detailSponsored3')}</li>
              </ul>
            </article>
            <article id="detail-corporate" className="detail-card card">
              <h3>🏢 {t('pricing.detailCorporateTitle')}</h3>
              <p>{t('pricing.detailCorporateIntro')}</p>
              <ul>
                <li>{t('pricing.detailCorporate1')}</li>
                <li>{t('pricing.detailCorporate2')}</li>
                <li>{t('pricing.detailCorporate3')}</li>
                <li>{t('pricing.detailCorporate4')}</li>
              </ul>
            </article>
            <article id="detail-ai-insights" className="detail-card card">
              <h3>🤖 {t('pricing.detailAiInsightsTitle')}</h3>
              <p>{t('pricing.detailAiInsights')}</p>
            </article>
            <article id="detail-video-cv" className="detail-card card">
              <h3>🎬 {t('pricing.detailVideoCvTitle')}</h3>
              <p>{t('pricing.detailVideoCv')}</p>
            </article>
            <article id="detail-profile-viewers" className="detail-card card">
              <h3>👁️ {t('pricing.detailProfileViewersTitle')}</h3>
              <p>{t('pricing.detailProfileViewers')}</p>
            </article>
            <article id="detail-profile-boost" className="detail-card card">
              <h3>📈 {t('pricing.detailProfileBoostTitle')}</h3>
              <p>{t('pricing.detailProfileBoost')}</p>
            </article>
            <article id="detail-ai-filtering" className="detail-card card">
              <h3>🔍 {t('pricing.detailAiFilteringTitle')}</h3>
              <p>{t('pricing.detailAiFiltering')}</p>
            </article>
            <article id="detail-unlimited-candidates" className="detail-card card">
              <h3>👥 {t('pricing.detailUnlimitedCandidatesTitle')}</h3>
              <p>{t('pricing.detailUnlimitedCandidates')}</p>
            </article>
            <article id="detail-featured-posts" className="detail-card card">
              <h3>📌 {t('pricing.detailFeaturedPostsTitle')}</h3>
              <p>{t('pricing.detailFeaturedPosts')}</p>
            </article>
            <article id="detail-priority-support" className="detail-card card">
              <h3>⚡ {t('pricing.detailPrioritySupportTitle')}</h3>
              <p>{t('pricing.detailPrioritySupport')}</p>
            </article>
            <article id="detail-unlimited-apps" className="detail-card card">
              <h3>📤 {t('pricing.detailUnlimitedAppsTitle')}</h3>
              <p>{t('pricing.detailUnlimitedApps')}</p>
            </article>
            <article id="detail-advanced-analytics" className="detail-card card">
              <h3>📊 {t('pricing.detailAdvancedAnalyticsTitle')}</h3>
              <p>{t('pricing.detailAdvancedAnalytics')}</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
