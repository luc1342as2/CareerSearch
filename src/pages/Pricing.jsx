import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Pricing.css';

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
          <h1>Smart Job Match</h1>
          <p className="pricing-tagline">AI-powered career matching for candidates and recruiters</p>
        </header>

        <section className="platform-pillars card">
          <h2>Our Platform</h2>
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
          <h2>Subscription Plans</h2>
          <div className="plans-grid">
            <div className="plan-card card plan-candidate">
              <div className="plan-badge">For Candidates</div>
              <h3>Premium</h3>
              <p className="plan-desc">Accelerate your job search with advanced tools</p>
              <ul className="plan-features">
                <li>Advanced AI insights</li>
                <li>Unlimited video CV</li>
                <li>See who viewed your profile</li>
                <li>Profile boost</li>
              </ul>
              <Link to="/account" className="plan-cta">Upgrade to Premium</Link>
            </div>

            <div className="plan-card card plan-recruiter">
              <div className="plan-badge">For Recruiters</div>
              <h3>Monthly Subscription</h3>
              <p className="plan-desc">Find the best talent faster</p>
              <ul className="plan-features">
                <li>AI filtering tools</li>
                <li>Unlimited candidate access</li>
                <li>Featured job posts</li>
                <li>Priority support</li>
              </ul>
              <Link to="/recruiter" className="plan-cta">Get Recruiter Access</Link>
            </div>
          </div>
        </section>

        <section className="additional-revenue card">
          <h2>Additional Revenue Options</h2>
          <div className="revenue-grid">
            <button className="revenue-item" onClick={handlePaidPosting}>
              <span className="revenue-icon">📋</span>
              <div>
                <h4>Paid Job Postings</h4>
                <p>Boost visibility with featured listings — $49/job</p>
              </div>
            </button>
            <button className="revenue-item" onClick={handleUniversity}>
              <span className="revenue-icon">🎓</span>
              <div>
                <h4>University Partnerships</h4>
                <p>Connect graduates with employers</p>
              </div>
            </button>
            <button className="revenue-item" onClick={handleSponsored}>
              <span className="revenue-icon">⭐</span>
              <div>
                <h4>Sponsored Listings</h4>
                <p>Premium placement — $15/day</p>
              </div>
            </button>
            <button className="revenue-item" onClick={handleCorporate}>
              <span className="revenue-icon">🏢</span>
              <div>
                <h4>Corporate HR Packages</h4>
                <p>Enterprise solutions from $299/mo</p>
              </div>
            </button>
          </div>
          {revenueToast && (
            <div className="revenue-toast">{revenueToast}</div>
          )}
        </section>
      </div>
    </main>
  );
}
