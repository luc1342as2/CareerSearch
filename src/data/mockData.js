// Mock data for CareerSearch - AI Job Matching Platform

export const mockRecruiter = {
  id: 'rec1',
  fullName: 'Sarah Chen',
  email: 'recruiter@careersearch.com',
  company: 'TechFlow Inc',
  role: 'recruiter',
  profileStrength: 100,
  cvUploaded: true,
  videoCvUploaded: true,
  profileVisibility: 'public',
  skills: [],
  softSkills: [],
  experience: [],
  education: 'B.S. Business - UCLA',
  certifications: ['SHRM Certified'],
  preferences: { salaryRange: { min: 0, max: 0 }, workType: [], employmentType: '', preferredCountries: [] },
  linkedIn: '',
  portfolio: '',
  matchImprovementSuggestions: [],
};

export const mockUser = {
  id: '1',
  fullName: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  role: 'candidate', // 'candidate' | 'recruiter'
  profileStrength: 85,
  profileVisibility: 'public',
  matchImprovementSuggestions: [
    'Add a Video CV to increase profile visibility by 15%',
    'Complete your LinkedIn profile link for better recruiter reach',
    'Add 2 more relevant skills to improve job matching',
  ],
  skills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'Python', 'AWS'],
  softSkills: ['Communication', 'Problem Solving', 'Teamwork', 'Leadership'],
  experience: [
    { title: 'Senior Frontend Developer', company: 'TechCorp', years: 3 },
    { title: 'Frontend Developer', company: 'StartupXYZ', years: 2 },
  ],
  education: 'B.S. Computer Science - Stanford University',
  certifications: ['AWS Certified', 'React Professional'],
  languages: ['English', 'Spanish'],
  preferences: {
    salaryRange: { min: 120000, max: 180000 },
    workType: ['Remote', 'Hybrid'],
    employmentType: 'Full-time',
    preferredCountries: ['USA', 'Canada'],
  },
  cvUploaded: true,
  videoCvUploaded: false,
  videoCvUrl: null,
  linkedIn: 'https://linkedin.com/in/alexjohnson',
  portfolio: 'https://alexjohnson.dev',
  github: 'https://github.com/alexjohnson',
};

export const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechFlow Inc',
    location: 'Remote',
    salaryRange: { min: 130000, max: 170000 },
    matchScore: 95,
    matchReason: 'Strong React & TypeScript skills match. 5+ years experience aligns with requirements.',
    skills: ['React', 'TypeScript', 'JavaScript', 'Node.js'],
    experienceLevel: '3-5 years',
    description: 'Join our team to build cutting-edge web applications. We are looking for a Senior React Developer to lead our frontend initiatives. You will work with modern technologies including React 18, TypeScript, and Node.js. The ideal candidate has 5+ years of experience building scalable web applications and enjoys mentoring junior developers.',
    benefits: ['Health Insurance', '401k', 'Remote Work', 'Learning Budget'],
    workType: 'Remote',
    employmentType: 'Full-time',
    postedDate: '2025-03-01',
    deadline: '2025-03-31',
    industry: 'Technology',
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'InnovateLabs',
    location: 'San Francisco, CA',
    salaryRange: { min: 140000, max: 190000 },
    matchScore: 88,
    matchReason: 'Python and AWS experience matches. Hybrid work aligns with preferences.',
    skills: ['React', 'Python', 'AWS', 'PostgreSQL'],
    experienceLevel: '3-5 years',
    description: 'We are looking for a full stack engineer to help scale our platform...',
    benefits: ['Equity', 'Unlimited PTO', 'Gym Membership'],
    workType: 'Hybrid',
    employmentType: 'Full-time',
    postedDate: '2025-02-28',
    deadline: '2025-03-25',
    industry: 'Technology',
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'DesignFirst',
    location: 'New York, NY',
    salaryRange: { min: 110000, max: 150000 },
    matchScore: 82,
    matchReason: 'React expertise and communication skills are a strong fit.',
    skills: ['React', 'CSS', 'JavaScript', 'Figma'],
    experienceLevel: '2-4 years',
    description: 'Create beautiful user interfaces for our design-focused products. We value pixel-perfect implementations and close collaboration with designers. Experience with Figma and design systems is a plus. This role is based in our New York office.',
    benefits: ['Health', 'Dental', 'Vision', 'Remote Options'],
    workType: 'On-site',
    employmentType: 'Full-time',
    postedDate: '2025-03-02',
    deadline: '2025-03-20',
    industry: 'Design',
  },
  {
    id: '4',
    title: 'Software Engineer - Remote',
    company: 'GlobalTech',
    location: 'Remote',
    salaryRange: { min: 125000, max: 165000 },
    matchScore: 90,
    matchReason: 'Remote preference match. Node.js and AWS align with stack.',
    skills: ['Node.js', 'React', 'AWS', 'Docker'],
    experienceLevel: '3-5 years',
    description: 'Build scalable backend services and APIs for our global platform. We are a remote-first company looking for engineers who thrive in distributed teams. You will work with Node.js, React, AWS, and Docker to deliver high-quality software. Strong communication skills are essential.',
    benefits: ['Remote First', 'Stock Options', 'Learning Stipend'],
    workType: 'Remote',
    employmentType: 'Full-time',
    postedDate: '2025-02-27',
    deadline: '2025-03-28',
    industry: 'Technology',
  },
];

export const mockNotifications = [
  {
    id: '1',
    type: 'new_match',
    title: 'New job match: Senior React Developer',
    message: 'TechFlow Inc has a 95% match with your profile.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'application_update',
    title: 'Application status updated',
    message: 'InnovateLabs viewed your application for Full Stack Engineer.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'recruiter_message',
    title: 'New message from recruiter',
    message: 'Sarah from TechFlow wants to schedule an interview.',
    time: '1 day ago',
    read: true,
  },
];

export const skillsCompatibilityData = [
  { skill: 'React', match: 95, required: true },
  { skill: 'JavaScript', match: 92, required: true },
  { skill: 'TypeScript', match: 88, required: true },
  { skill: 'Node.js', match: 85, required: false },
  { skill: 'AWS', match: 75, required: false },
];

// Recruiter Dashboard data
export const mockPostedJobs = [
  { id: '1', title: 'Senior React Developer', company: 'TechFlow Inc', applicants: 24, views: 156, status: 'active', postedDate: '2025-03-01' },
  { id: '2', title: 'Full Stack Engineer', company: 'TechFlow Inc', applicants: 18, views: 98, status: 'active', postedDate: '2025-02-28' },
  { id: '3', title: 'DevOps Engineer', company: 'TechFlow Inc', applicants: 8, views: 45, status: 'active', postedDate: '2025-02-25' },
];

export const mockCandidates = [
  { id: 'c1', fullName: 'Alex Johnson', email: 'alex.johnson@email.com', phone: '+1 (555) 123-4567', matchScore: 95, experience: '5 years', skills: ['React', 'TypeScript', 'Node.js'], location: 'San Francisco', availability: 'Immediate', jobId: '1', education: 'B.S. Computer Science - Stanford', linkedIn: 'linkedin.com/in/alexjohnson', summary: 'Senior frontend developer with 5+ years building scalable web applications. Passionate about React ecosystem and clean code.' },
  { id: 'c2', fullName: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+1 (555) 234-5678', matchScore: 92, experience: '4 years', skills: ['React', 'JavaScript', 'AWS'], location: 'Remote', availability: '2 weeks', jobId: '1', education: 'M.S. Software Engineering - MIT', linkedIn: 'linkedin.com/in/mariagarcia', summary: 'Full-stack engineer with strong React and cloud experience. Led migration to serverless architecture.' },
  { id: 'c3', fullName: 'David Chen', email: 'david.chen@email.com', phone: '+1 (555) 345-6789', matchScore: 88, experience: '3 years', skills: ['React', 'Python', 'PostgreSQL'], location: 'New York', availability: '1 month', jobId: '1', education: 'B.S. Computer Science - Berkeley', linkedIn: 'linkedin.com/in/davidchen', summary: 'Software engineer with Python and React expertise. Experience in fintech and e-commerce.' },
  { id: 'c4', fullName: 'Sarah Williams', email: 'sarah.w@email.com', phone: '+1 (555) 456-7890', matchScore: 85, experience: '6 years', skills: ['Node.js', 'AWS', 'Docker'], location: 'Austin', availability: 'Immediate', jobId: '1', education: 'B.S. Computer Science - UT Austin', linkedIn: 'linkedin.com/in/sarahwilliams', summary: 'Senior backend engineer with DevOps experience. Built scalable microservices.' },
  { id: 'c5', fullName: 'James Lee', email: 'james.lee@email.com', phone: '+1 (555) 567-8901', matchScore: 82, experience: '4 years', skills: ['React', 'TypeScript', 'GraphQL'], location: 'Seattle', availability: '2 weeks', jobId: '1', education: 'B.S. Computer Science - UW', linkedIn: 'linkedin.com/in/jameslee', summary: 'Frontend specialist with GraphQL and TypeScript. Strong design system experience.' },
  { id: 'c6', fullName: 'Emily Brown', email: 'emily.brown@email.com', phone: '+1 (555) 678-9012', matchScore: 90, experience: '4 years', skills: ['React', 'Python', 'AWS'], location: 'Boston', availability: 'Immediate', jobId: '2', education: 'B.S. Computer Science - Harvard', linkedIn: 'linkedin.com/in/emilybrown', summary: 'Full-stack developer with Python backend and React frontend. Startup experience.' },
  { id: 'c7', fullName: 'Chris Taylor', email: 'chris.taylor@email.com', phone: '+1 (555) 789-0123', matchScore: 87, experience: '5 years', skills: ['Node.js', 'PostgreSQL', 'Docker'], location: 'Remote', availability: '2 weeks', jobId: '2', education: 'B.S. Computer Science - Georgia Tech', linkedIn: 'linkedin.com/in/christaylor', summary: 'Backend engineer specializing in Node.js and databases. Led team of 4 developers.' },
];

export const mockRecruiterAnalytics = {
  totalApplicants: 50,
  activeJobs: 3,
  interviewsScheduled: 12,
  avgTimeToHire: '14 days',
  topPerformingJob: 'Senior React Developer',
};

export const mockConversations = [
  { id: '1', name: 'Sarah Chen', company: 'TechFlow Inc', lastMessage: 'Looking forward to our call tomorrow!', time: '2h ago', unread: true, avatar: 'S' },
  { id: '2', name: 'Mike Johnson', company: 'InnovateLabs', lastMessage: 'Your profile looks great. Let me know your availability.', time: '1d ago', unread: false, avatar: 'M' },
  { id: '3', name: 'Emma Wilson', company: 'DesignFirst', lastMessage: 'We have reviewed your application.', time: '2d ago', unread: false, avatar: 'E' },
];

export const mockChatMessages = {
  '1': [
    { id: 'm1', sender: 'recruiter', text: "Hi! Thanks for applying. We'd like to schedule an interview. Are you available this week?", time: 'Yesterday, 2:30 PM' },
    { id: 'm2', sender: 'user', text: "Yes, I'm available! How about Thursday afternoon?", time: 'Yesterday, 3:15 PM' },
    { id: 'm3', sender: 'recruiter', text: 'Looking forward to our call tomorrow!', time: '2 hours ago' },
  ],
  '2': [
    { id: 'm4', sender: 'recruiter', text: 'Your profile looks great. Let me know your availability for a quick call.', time: '1 day ago' },
  ],
  '3': [
    { id: 'm5', sender: 'recruiter', text: 'We have reviewed your application and would like to move forward.', time: '2 days ago' },
  ],
};
