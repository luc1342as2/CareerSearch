import { createContext, useContext, useState, useEffect } from 'react';
import { mockUser, mockRecruiter, mockJobs, mockNotifications, mockProfileViewers } from '../data/mockData';
import * as sub from '../services/subscriptionService';
import { computeProfileStrength, computeSkillsCompatibility } from '../services/skillsService';

const AUTH_STORAGE_KEY = 'careersearch_auth';
const NEWSLETTER_STORAGE_KEY = 'careersearch_newsletter';

const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return null;
};

const storeAuth = (user) => {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getStoredAuth);
  const [user, setUser] = useState(() => {
    const auth = getStoredAuth();
    return auth?.role === 'recruiter' ? mockRecruiter : mockUser;
  });
  const [jobs, setJobs] = useState(mockJobs);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [invitedCandidates, setInvitedCandidates] = useState([]);
  const [profileViewers, setProfileViewers] = useState(mockProfileViewers);

  const isAuthenticated = !!currentUser;

  // Subscription status (merged with user)
  const getSubscriptionStatus = (u) => {
    if (!u) return null;
    const data = JSON.parse(localStorage.getItem(sub.SUBSCRIPTION_STORAGE_KEY) || '{}');
    if (u.role === 'candidate' && data.candidates?.[u.id]) return data.candidates[u.id];
    if (u.role === 'recruiter' && data.recruiters?.[u.id]) return data.recruiters[u.id];
    return null;
  };
  const userWithSub = user ? { ...user, subscription: getSubscriptionStatus(user) } : user;
  const isCandidatePremium = sub.isCandidatePremium(userWithSub);
  const isRecruiterSubscribed = sub.isRecruiterSubscribed(userWithSub);

  useEffect(() => {
    if (currentUser) {
      setUser(
        currentUser.role === 'recruiter'
          ? { ...mockRecruiter, ...currentUser }
          : { ...mockUser, ...currentUser }
      );
    }
  }, [currentUser]);

  const login = (email, password, role = 'candidate') => {
    const normalizedEmail = email.trim().toLowerCase();
    const isRecruiter = role === 'recruiter';
    if (isRecruiter) {
      if (normalizedEmail === 'recruiter@careersearch.com' && password === 'recruiter123') {
        const authUser = { ...mockRecruiter, role: 'recruiter' };
        setCurrentUser(authUser);
        setUser(mockRecruiter);
        storeAuth(authUser);
        return { success: true };
      }
    } else {
      if (normalizedEmail === 'alex.johnson@email.com' && password === 'candidate123') {
        const authUser = { ...mockUser, role: 'candidate' };
        setCurrentUser(authUser);
        setUser(mockUser);
        storeAuth(authUser);
        return { success: true };
      }
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(mockUser);
    storeAuth(null);
  };

  const signUp = (email, password, fullName, role = 'candidate') => {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail === 'alex.johnson@email.com' || normalizedEmail === 'recruiter@careersearch.com') {
      return { success: false, message: 'An account with this email already exists' };
    }
    const isRecruiter = role === 'recruiter';
    const newUser = isRecruiter
      ? {
          id: `user-${Date.now()}`,
          fullName: fullName || 'Recruiter',
          email: normalizedEmail,
          company: fullName || 'Company',
          role: 'recruiter',
          ...mockRecruiter,
          fullName: fullName || 'Recruiter',
          email: normalizedEmail,
          company: fullName || 'Company',
        }
      : {
          id: `user-${Date.now()}`,
          fullName: fullName || 'New User',
          email: normalizedEmail,
          role: 'candidate',
          ...mockUser,
          fullName: fullName || 'New User',
          email: normalizedEmail,
        };
    setCurrentUser(newUser);
    setUser(newUser);
    storeAuth(newUser);
    return { success: true };
  };

  const shortlistCandidate = (candidateId) => {
    if (!shortlistedCandidates.includes(candidateId)) {
      setShortlistedCandidates((prev) => [...prev, candidateId]);
    }
  };

  const unshortlistCandidate = (candidateId) => {
    setShortlistedCandidates((prev) => prev.filter((id) => id !== candidateId));
  };

  const inviteCandidateToInterview = (candidateId, interviewDate) => {
    if (!invitedCandidates.some((i) => i.candidateId === candidateId)) {
      setInvitedCandidates((prev) => [...prev, { candidateId, interviewDate }]);
    }
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      if (updates.cvUploaded || updates.skills || updates.experience) {
        next.profileStrength = computeProfileStrength(next);
      }
      return next;
    });
  };

  const getSkillsCompatibility = () => computeSkillsCompatibility(userWithSub, jobs);

  const saveJob = (jobId) => {
    if (!savedJobs.includes(jobId)) {
      setSavedJobs((prev) => [...prev, jobId]);
    }
  };

  const unsaveJob = (jobId) => {
    setSavedJobs((prev) => prev.filter((id) => id !== jobId));
  };

  const applyToJob = (jobId) => {
    if (!applications.includes(jobId)) {
      setApplications((prev) => [...prev, jobId]);
    }
  };

  const markNotificationRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  // --- Monetization / Subscription ---
  const subscribeCandidatePremium = () => {
    if (!currentUser?.id) return { success: false };
    sub.subscribeCandidatePremium(currentUser.id);
    setCurrentUser((prev) => prev && { ...prev, subscription: { plan: 'premium', status: 'active' } });
    return { success: true };
  };

  const unsubscribeCandidatePremium = () => {
    if (!currentUser?.id) return { success: false };
    sub.unsubscribeCandidatePremium(currentUser.id);
    setCurrentUser((prev) => prev && { ...prev, subscription: null });
    return { success: true };
  };

  const subscribeRecruiter = () => {
    if (!currentUser?.id) return { success: false };
    sub.subscribeRecruiter(currentUser.id);
    setCurrentUser((prev) => prev && { ...prev, subscription: { plan: 'recruiter_monthly', status: 'active' } });
    return { success: true };
  };

  const unsubscribeRecruiter = () => {
    if (!currentUser?.id) return { success: false };
    sub.unsubscribeRecruiter(currentUser.id);
    setCurrentUser((prev) => prev && { ...prev, subscription: null });
    return { success: true };
  };

  const getAdvancedAIInsights = (jobId) => sub.getAdvancedAIInsights(userWithSub, jobId);
  const canUploadVideoCV = () => sub.canUploadVideoCV(userWithSub, user?.videoCvUploaded ? 1 : 0);
  const getProfileViewersList = () => {
    const fromStorage = sub.getProfileViewers(currentUser?.id);
    if (fromStorage?.length) return fromStorage;
    return profileViewers.filter((v) => v.profileId === currentUser?.id);
  };
  const canSeeProfileViewers = () => sub.canSeeProfileViewers(userWithSub);
  const boostProfile = () => sub.boostProfile(userWithSub);
  const isProfileBoosted = () => sub.isProfileBoosted(currentUser?.id);
  const createFeaturedJobPost = (jobData) => sub.createFeaturedJobPost(userWithSub, jobData);
  const createPaidJobPosting = (jobData, amount) => sub.createPaidJobPosting(currentUser?.id, jobData, amount);
  const createSponsoredListing = (jobId, days, cost) => sub.createSponsoredListing(jobId, days, cost);
  const getCorporateHRPackage = (companyId, tier) => sub.getCorporateHRPackage(companyId, tier);
  const getUniversityPartnership = (uniId) => sub.getUniversityPartnership(uniId);
  const canAccessCandidate = (index) => sub.canAccessCandidate(userWithSub, index, 999);
  const useAIFiltering = (filters) => sub.useAIFiltering(userWithSub, filters);

  const subscribeToNewsletter = (email) => {
    try {
      const stored = JSON.parse(localStorage.getItem(NEWSLETTER_STORAGE_KEY) || '[]');
      const normalized = email.trim().toLowerCase();
      if (!stored.includes(normalized)) {
        stored.push(normalized);
        localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(stored));
      }
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  };

  const isNewsletterSubscribed = (email) => {
    try {
      const stored = JSON.parse(localStorage.getItem(NEWSLETTER_STORAGE_KEY) || '[]');
      return stored.includes((email || '').trim().toLowerCase());
    } catch (e) {
      return false;
    }
  };

  const value = {
    currentUser,
    user: userWithSub,
    isAuthenticated,
    isCandidatePremium,
    isRecruiterSubscribed,
    login,
    logout,
    signUp,
    setUser,
    updateUser,
    jobs,
    setJobs,
    notifications,
    setNotifications,
    markNotificationRead,
    savedJobs,
    saveJob,
    unsaveJob,
    applications,
    applyToJob,
    shortlistedCandidates,
    shortlistCandidate,
    unshortlistCandidate,
    invitedCandidates,
    inviteCandidateToInterview,
    profileViewers,
    subscribeCandidatePremium,
    unsubscribeCandidatePremium,
    subscribeRecruiter,
    unsubscribeRecruiter,
    getAdvancedAIInsights,
    canUploadVideoCV,
    getProfileViewersList,
    canSeeProfileViewers,
    boostProfile,
    isProfileBoosted,
    createFeaturedJobPost,
    createPaidJobPosting,
    createSponsoredListing,
    getCorporateHRPackage,
    getUniversityPartnership,
    canAccessCandidate,
    useAIFiltering,
    getSkillsCompatibility,
    subscribeToNewsletter,
    isNewsletterSubscribed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
