import { createContext, useContext, useState, useEffect } from 'react';
import { mockUser, mockRecruiter, mockJobs, mockNotifications } from '../data/mockData';

const AUTH_STORAGE_KEY = 'careersearch_auth';

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

  const isAuthenticated = !!currentUser;

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
    setUser((prev) => ({ ...prev, ...updates }));
  };

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

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    signUp,
    user,
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
