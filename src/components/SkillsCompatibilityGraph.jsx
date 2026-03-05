import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './SkillsCompatibilityGraph.css';

export default function SkillsCompatibilityGraph() {
  const { user, getSkillsCompatibility } = useApp();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const data = getSkillsCompatibility();
  const profileStrength = user?.cvUploaded && data.length > 0
    ? Math.round(data.reduce((sum, item) => sum + item.match, 0) / data.length)
    : (user?.profileStrength ?? 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBarColor = (match) => {
    if (match >= 90) return 'high';
    if (match >= 75) return 'medium';
    return 'low';
  };

  return (
    <div className="skills-graph card">
      <h2>{t('skills.compatibility')}</h2>
      <p className="graph-subtitle">
        {user?.cvUploaded
          ? t('skills.basedOnProfile')
          : t('skills.uploadToSee')}
      </p>

      {data.length > 0 ? (
        <div className="graph-bars">
          {data.map((item, i) => (
            <div key={item.skill} className="skill-row">
              <div className="skill-label">
                <span className="skill-name">{item.skill}</span>
                {item.required && <span className="required-badge">{t('skills.required')}</span>}
              </div>
              <div className="bar-container">
                <motion.div
                  className={`bar-fill ${getBarColor(item.match)}`}
                  initial={{ width: 0 }}
                  animate={{ width: mounted ? `${item.match}%` : 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <motion.span
                  className="bar-value"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: mounted ? 1 : 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                >
                  {item.match}%
                </motion.span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="skills-empty">
          <p>{t('skills.uploadToAnalyze')}</p>
        </div>
      )}

      <div className="profile-strength">
        <span>{t('skills.profileStrength')}</span>
        <div className="strength-bar">
          <motion.div
            className="strength-fill"
            initial={{ width: 0 }}
            animate={{ width: mounted ? `${profileStrength}%` : 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
        <motion.span
          className="strength-value"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ delay: 0.8 }}
        >
          {profileStrength}%
        </motion.span>
      </div>
    </div>
  );
}
