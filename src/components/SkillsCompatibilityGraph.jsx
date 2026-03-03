import { useApp } from '../context/AppContext';
import { skillsCompatibilityData } from '../data/mockData';
import './SkillsCompatibilityGraph.css';

export default function SkillsCompatibilityGraph() {
  const { user } = useApp();
  const data = skillsCompatibilityData;

  return (
    <div className="skills-graph card">
      <h2>📊 Skills Compatibility</h2>
      <p className="graph-subtitle">How your skills match top job requirements</p>
      <div className="graph-bars">
        {data.map((item) => (
          <div key={item.skill} className="skill-row">
            <div className="skill-label">
              <span className="skill-name">{item.skill}</span>
              {item.required && <span className="required-badge">Required</span>}
            </div>
            <div className="bar-container">
              <div
                className="bar-fill"
                style={{ width: `${item.match}%` }}
                data-match={item.match}
              />
              <span className="bar-value">{item.match}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="profile-strength">
        <span>Profile Strength</span>
        <div className="strength-bar">
          <div className="strength-fill" style={{ width: `${user.profileStrength}%` }} />
        </div>
        <span className="strength-value">{user.profileStrength}%</span>
      </div>
    </div>
  );
}
