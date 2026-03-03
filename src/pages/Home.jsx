import RecommendedJobsCard from '../components/RecommendedJobsCard';
import NotificationsCard from '../components/NotificationsCard';
import SkillsCompatibilityGraph from '../components/SkillsCompatibilityGraph';
import UpdateCvButton from '../components/UpdateCvButton';
import TrustBadges from '../components/TrustBadges';
import './Home.css';

export default function Home() {
  return (
    <main className="home-page">
      <div className="home-container">
        <TrustBadges variant="home" />
        <div className="home-layout">
        <section className="home-main">
          <UpdateCvButton />
          <RecommendedJobsCard />
        </section>
        <aside className="home-sidebar">
          <NotificationsCard />
          <SkillsCompatibilityGraph />
        </aside>
      </div>
      </div>
    </main>
  );
}
