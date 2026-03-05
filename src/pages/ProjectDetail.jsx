import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioProjectDetails } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const project = slug ? portfolioProjectDetails[slug] : null;

  if (!project) {
    return (
      <main className="project-detail-page">
        <div className="project-detail-container">
          <p>{t('project.notFound')}</p>
          <Link to="/profile">← {t('project.backToProfile')}</Link>
        </div>
      </main>
    );
  }

  return (
    <motion.main
      className="project-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-detail-container">
        <Link to="/profile" className="project-back">← {t('profile.viewProject')} Profile</Link>

        <header className="project-detail-header">
          <h1>{project.title}</h1>
          <p className="project-detail-tagline">{project.description}</p>
          <div className="project-detail-tech">
            {project.tech?.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </header>

        <section className="project-detail-content card">
          <h2>Overview</h2>
          <p className="project-detail-overview">{project.details}</p>
        </section>

        {project.features?.length > 0 && (
          <section className="project-detail-features card">
            <h2>{t('project.features')}</h2>
            <ul>
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="project-detail-actions">
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Live Project →
            </a>
          )}
          <Link to="/profile" className="btn btn-secondary">
            ← Back to Profile
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
