/**
 * Monetization & Subscription Service
 * Smart Job Match - AI-driven, Scalable, Secure, Multi-language, Mobile-first, Data-driven, Subscription-based
 */

// --- CONSTANTS ---
export const SUBSCRIPTION_STORAGE_KEY = 'careersearch_subscription';
export const PROFILE_VIEWERS_STORAGE_KEY = 'careersearch_profile_viewers';
export const FREE_VIDEO_CV_LIMIT = 1;
export const FREE_APPLICATIONS_LIMIT = 5;
export const RECRUITER_FREE_CANDIDATE_ACCESS = 10; // Free recruiters can view first 10 candidates

// --- CANDIDATE PREMIUM ---

/** Check if candidate has Premium subscription */
export function isCandidatePremium(user) {
  return user?.subscription?.plan === 'premium' && user?.subscription?.status === 'active';
}

/** Subscribe candidate to Premium */
export function subscribeCandidatePremium(userId) {
  const data = getSubscriptionData();
  data.candidates = data.candidates || {};
  data.candidates[userId] = { plan: 'premium', status: 'active', since: new Date().toISOString() };
  saveSubscriptionData(data);
  return { success: true };
}

/** Unsubscribe candidate from Premium */
export function unsubscribeCandidatePremium(userId) {
  const data = getSubscriptionData();
  if (data.candidates?.[userId]) {
    delete data.candidates[userId];
    saveSubscriptionData(data);
  }
  return { success: true };
}

/** Advanced AI insights - Premium only */
export function getAdvancedAIInsights(user, jobId) {
  if (!isCandidatePremium(user)) {
    return { success: false, locked: true, message: 'Upgrade to Premium for advanced AI insights' };
  }
  return {
    success: true,
    insights: {
      skillGapAnalysis: ['Consider adding GraphQL to improve match by 5%'],
      salaryBenchmark: 'Your expected range aligns with 78% of similar roles',
      interviewLikelihood: 92,
      competitorAnalysis: '3 other strong candidates applied',
    },
  };
}

/** Can upload video CV - Premium = unlimited, Free = 1 */
export function canUploadVideoCV(user, currentVideoCount = 0) {
  if (isCandidatePremium(user)) return { allowed: true, unlimited: true };
  return {
    allowed: currentVideoCount < FREE_VIDEO_CV_LIMIT,
    unlimited: false,
    limit: FREE_VIDEO_CV_LIMIT,
    used: currentVideoCount,
  };
}

/** Upload video CV - enforces limit for free users */
export function uploadVideoCV(user, videoUrl) {
  const check = canUploadVideoCV(user, user.videoCvCount ?? (user.videoCvUploaded ? 1 : 0));
  if (!check.allowed) {
    return { success: false, message: 'Upgrade to Premium for unlimited video CVs' };
  }
  return { success: true, videoUrl };
}

/** Get profile viewers - Premium only */
export function getProfileViewers(userId) {
  const viewers = JSON.parse(localStorage.getItem(PROFILE_VIEWERS_STORAGE_KEY) || '[]');
  return viewers.filter((v) => v.profileId === userId);
}

/** Record a profile view (called when recruiter views candidate) */
export function recordProfileView(profileId, viewer) {
  const viewers = JSON.parse(localStorage.getItem(PROFILE_VIEWERS_STORAGE_KEY) || '[]');
  viewers.unshift({
    profileId,
    viewerId: viewer.id,
    viewerName: viewer.fullName,
    company: viewer.company,
    viewedAt: new Date().toISOString(),
  });
  localStorage.setItem(PROFILE_VIEWERS_STORAGE_KEY, JSON.stringify(viewers.slice(0, 100)));
}

/** Can see profile viewers - Premium only */
export function canSeeProfileViewers(user) {
  return isCandidatePremium(user);
}

/** Profile boost - Premium only, boosts visibility for 7 days */
export function boostProfile(user) {
  if (!isCandidatePremium(user)) {
    return { success: false, message: 'Upgrade to Premium to boost your profile' };
  }
  const data = getSubscriptionData();
  data.profileBoosts = data.profileBoosts || {};
  data.profileBoosts[user.id] = { until: addDays(new Date(), 7).toISOString() };
  saveSubscriptionData(data);
  return { success: true, boostedUntil: data.profileBoosts[user.id].until };
}

/** Check if profile is currently boosted */
export function isProfileBoosted(userId) {
  const data = getSubscriptionData();
  const boost = data.profileBoosts?.[userId];
  if (!boost) return false;
  return new Date(boost.until) > new Date();
}

// --- RECRUITER SUBSCRIPTION ---

/** Check if recruiter has active subscription */
export function isRecruiterSubscribed(user) {
  return user?.subscription?.plan === 'recruiter_monthly' && user?.subscription?.status === 'active';
}

/** Subscribe recruiter to monthly plan */
export function subscribeRecruiter(userId) {
  const data = getSubscriptionData();
  data.recruiters = data.recruiters || {};
  data.recruiters[userId] = { plan: 'recruiter_monthly', status: 'active', since: new Date().toISOString() };
  saveSubscriptionData(data);
  return { success: true };
}

/** Unsubscribe recruiter */
export function unsubscribeRecruiter(userId) {
  const data = getSubscriptionData();
  if (data.recruiters?.[userId]) {
    delete data.recruiters[userId];
    saveSubscriptionData(data);
  }
  return { success: true };
}

/** AI filtering tools - Recruiter subscription only */
export function useAIFiltering(user, filters) {
  if (!isRecruiterSubscribed(user)) {
    return { success: false, locked: true, message: 'Subscribe to use AI filtering tools' };
  }
  return { success: true, filtered: true };
}

/** Can access candidate - Unlimited for subscribers, limited for free */
export function canAccessCandidate(user, candidateIndex, totalCandidates) {
  if (isRecruiterSubscribed(user)) return { allowed: true, unlimited: true };
  return {
    allowed: candidateIndex < RECRUITER_FREE_CANDIDATE_ACCESS,
    unlimited: false,
    limit: RECRUITER_FREE_CANDIDATE_ACCESS,
    remaining: Math.max(0, RECRUITER_FREE_CANDIDATE_ACCESS - candidateIndex - 1),
  };
}

/** Create featured job post - Recruiter subscription only */
export function createFeaturedJobPost(user, jobData) {
  if (!isRecruiterSubscribed(user)) {
    return { success: false, message: 'Subscribe to create featured job posts' };
  }
  return { success: true, job: { ...jobData, featured: true } };
}

// --- ADDITIONAL REVENUE ---

/** Paid job posting - one-time payment per job */
export function createPaidJobPosting(userId, jobData, paymentAmount = 49) {
  return {
    success: true,
    job: { ...jobData, paid: true, paymentAmount },
    message: `Job posted successfully. Charged $${paymentAmount}`,
  };
}

/** University partnership - bulk access for graduates */
export function getUniversityPartnership(uniId) {
  return {
    success: true,
    partnership: {
      id: uniId,
      type: 'university',
      graduateAccess: true,
      bulkPricing: true,
    },
  };
}

/** Sponsored listing - premium placement in search */
export function createSponsoredListing(jobId, durationDays = 7, costPerDay = 15) {
  const totalCost = durationDays * costPerDay;
  return {
    success: true,
    sponsored: { jobId, durationDays, costPerDay, totalCost },
    message: `Listing sponsored for ${durationDays} days. Total: $${totalCost}`,
  };
}

/** Corporate HR package - enterprise tier */
export function getCorporateHRPackage(companyId, tier = 'enterprise') {
  const tiers = {
    starter: { jobs: 10, candidates: 100, price: 299 },
    growth: { jobs: 50, candidates: 500, price: 799 },
    enterprise: { jobs: -1, candidates: -1, price: 1999 },
  };
  const pkg = tiers[tier] || tiers.enterprise;
  return {
    success: true,
    package: { companyId, tier, ...pkg },
  };
}

// --- HELPERS ---

function getSubscriptionData() {
  try {
    return JSON.parse(localStorage.getItem(SUBSCRIPTION_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveSubscriptionData(data) {
  localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(data));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
