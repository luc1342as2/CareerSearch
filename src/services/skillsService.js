/**
 * Skills compatibility service - computes match from user profile/CV vs job requirements
 */

/**
 * Extract skills from user profile (skills array, experience, certifications)
 * When CV is uploaded, this would be called with parsed data from CV
 */
export function getSkillsFromProfile(user) {
  if (!user) return [];
  const skills = new Set();
  (user.skills || []).forEach((s) => skills.add(normalizeSkill(s)));
  (user.certifications || []).forEach((c) => skills.add(normalizeSkill(c)));
  (user.experience || []).forEach((exp) => {
    if (exp.title) skills.add(normalizeSkill(exp.title.split(' ')[0]));
  });
  return Array.from(skills);
}

function normalizeSkill(s) {
  return String(s || '').trim();
}

/**
 * Get top skills required across jobs (from first N jobs or by frequency)
 */
export function getTopJobSkills(jobs, limit = 8) {
  const skillCount = {};
  jobs.forEach((job) => {
    (job.skills || []).forEach((skill) => {
      const s = normalizeSkill(skill);
      if (s) skillCount[s] = (skillCount[s] || 0) + 1;
    });
  });
  return Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([skill]) => skill);
}

// Replace Python, Figma, Excel with Java, PLC, C#
const SKILL_REPLACEMENTS = {
  Python: { skill: 'Java', match: 65 },
  Figma: { skill: 'PLC', match: 85 },
  Excel: { skill: 'C#', match: 70 },
};

/**
 * Compute skills compatibility: user skills vs job requirements
 * Returns array of { skill, match, required }
 * - required: skill is in top job requirements
 * - match: 0-100 based on user having the skill + profile strength
 * - Python, Figma, Excel are replaced with Java, PLC, C#
 * - AWS is replaced with a skill from the user's CV when available
 */
export function computeSkillsCompatibility(user, jobs) {
  const userSkills = getSkillsFromProfile(user);
  const topSkills = getTopJobSkills(jobs, 8);
  const profileStrength = user?.profileStrength ?? 0;
  const usedSkills = new Set();
  const isUsed = (s) => usedSkills.has(s) || [...usedSkills].some((u) => u.toLowerCase() === String(s).toLowerCase());

  const raw = topSkills.map((skill, idx) => {
    const replacement = SKILL_REPLACEMENTS[skill];
    if (replacement) {
      usedSkills.add(replacement.skill);
      return { skill: replacement.skill, match: replacement.match, required: idx < 4 };
    }
    if (skill === 'AWS' && userSkills.length > 0) {
      const topSet = new Set(topSkills.map((s) => s.toLowerCase()));
      const cvSkill = userSkills.find(
        (us) => !isUsed(us) && !SKILL_REPLACEMENTS[us] && !topSet.has(us.toLowerCase())
      );
      if (cvSkill) {
        usedSkills.add(cvSkill);
        const baseMatch = 80 + Math.min(15, profileStrength / 6);
        const match = Math.min(100, Math.max(0, Math.round(baseMatch)));
        return { skill: cvSkill, match, required: idx < 4 };
      }
    }
    usedSkills.add(skill);
    const skillLower = skill.toLowerCase();
    const userHasSkill = userSkills.some(
      (us) => us.toLowerCase() === skillLower || skillLower.includes(us.toLowerCase()) || us.toLowerCase().includes(skillLower)
    );
    const required = idx < 4;
    const baseMatch = userHasSkill ? 80 + Math.min(15, profileStrength / 6) : 30 + Math.min(20, profileStrength / 5);
    const match = Math.min(100, Math.max(0, Math.round(baseMatch)));
    return { skill, match, required };
  });

  const seen = new Set();
  return raw.filter((item) => {
    if (seen.has(item.skill)) return false;
    seen.add(item.skill);
    return true;
  });
}

/**
 * Compute AI match score and "Why this job fits you" for a single job
 * Uses skills, experience, and preferences from user profile
 */
export function computeJobMatch(user, job) {
  if (!user || !job) return { score: 0, reason: 'Complete your profile for personalized matching' };
  const userSkills = getSkillsFromProfile(user);
  const jobSkills = (job.skills || []).map((s) => normalizeSkill(s).toLowerCase());
  const profileStrength = user?.profileStrength ?? 0;

  let score = 0;
  const reasons = [];

  // Skills match (up to 50 points)
  const matchedSkills = userSkills.filter((us) =>
    jobSkills.some((js) => js.includes(us.toLowerCase()) || us.toLowerCase().includes(js))
  );
  if (matchedSkills.length > 0) {
    const skillScore = Math.min(50, matchedSkills.length * 15);
    score += skillScore;
    reasons.push(`Strong ${matchedSkills.slice(0, 3).join(', ')} match`);
  }

  // Experience level (up to 25 points)
  const userYears = (user.experience || []).reduce((sum, e) => sum + (e.years || 0), 0);
  const expMatch = job.experienceLevel && userYears >= 2;
  if (expMatch) {
    score += 25;
    reasons.push(`${userYears}+ years experience aligns with requirements`);
  }

  // Work type preference (up to 15 points)
  const preferredWork = (user.preferences?.workType || []).map((w) => w.toLowerCase());
  const jobWork = (job.workType || '').toLowerCase();
  if (preferredWork.some((p) => jobWork.includes(p))) {
    score += 15;
    reasons.push(`${job.workType} work aligns with your preferences`);
  }

  // Profile completeness bonus (up to 10 points)
  score += Math.min(10, Math.floor(profileStrength / 10));

  const finalScore = Math.min(100, Math.max(0, Math.round(score)));
  const reason = reasons.length > 0 ? reasons.join('. ') : 'Add more skills and experience to improve your match';

  return { score: finalScore, reason };
}

/**
 * Compute profile strength from completeness (CV uploaded, skills, experience, etc.)
 */
export function computeProfileStrength(user) {
  if (!user) return 0;
  let score = 0;
  if (user.cvUploaded) score += 25;
  if (user.videoCvUploaded) score += 15;
  if (user.skills?.length) score += Math.min(20, user.skills.length * 3);
  if (user.experience?.length) score += Math.min(20, user.experience.length * 7);
  if (user.education) score += 10;
  if (user.linkedIn) score += 5;
  if (user.portfolio) score += 5;
  return Math.min(100, score);
}

/**
 * Get improvement suggestions based on profile completeness.
 * Each completed item increases profile strength; suggestions disappear when done.
 */
export function getMatchImprovementSuggestions(user) {
  if (!user || user.role !== 'candidate') return [];
  const suggestions = [];
  if (!user.videoCvUploaded) {
    suggestions.push('Add a Video CV to increase profile visibility by 15%');
  }
  if (!user.linkedIn) {
    suggestions.push('Complete your LinkedIn profile link for better recruiter reach');
  }
  const skillCount = user.skills?.length || 0;
  if (skillCount < 8) {
    const needed = 8 - skillCount;
    suggestions.push(`Add ${needed} more relevant skill${needed > 1 ? 's' : ''} to improve job matching`);
  }
  if (!user.portfolio) {
    suggestions.push('Add your portfolio link to showcase your work');
  }
  if (!user.education) {
    suggestions.push('Add your education to strengthen your profile');
  }
  return suggestions;
}
