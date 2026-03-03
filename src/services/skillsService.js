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

/**
 * Compute skills compatibility: user skills vs job requirements
 * Returns array of { skill, match, required }
 * - required: skill is in top job requirements
 * - match: 0-100 based on user having the skill + profile strength
 */
export function computeSkillsCompatibility(user, jobs) {
  const userSkills = getSkillsFromProfile(user);
  const topSkills = getTopJobSkills(jobs, 8);
  const profileStrength = user?.profileStrength ?? 0;

  return topSkills.map((skill, idx) => {
    const skillLower = skill.toLowerCase();
    const userHasSkill = userSkills.some(
      (us) => us.toLowerCase() === skillLower || skillLower.includes(us.toLowerCase()) || us.toLowerCase().includes(skillLower)
    );
    const required = idx < 4;
    const baseMatch = userHasSkill ? 80 + Math.min(15, profileStrength / 6) : 30 + Math.min(20, profileStrength / 5);
    const match = Math.min(100, Math.max(0, Math.round(baseMatch)));
    return { skill, match, required };
  });
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
