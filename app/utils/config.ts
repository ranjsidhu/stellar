const ADMIN_EMAIL = "admin@stellar-recruitment.co.uk";
const ADMIN_ROLE_NAME = "Admin" as const;
const CANDIDATE_ROLE_NAME = "Candidate" as const;
const RECRUITER_ROLE_NAME = "Recruiter" as const;

const ONE_MINUTE = 60 * 1000;

const middlewareConfigMaxReqs = {
  auth: 5,
  latestJobs: 50,
  testimonials: 50,
  contactUs: 1,
  admin: 1000,
  default: 50,
  ONE_MINUTE,
  windowMs: 1 * ONE_MINUTE, // 1 minute
};

export const config = {
  adminEmail: ADMIN_EMAIL,
  adminRoleName: ADMIN_ROLE_NAME,
  candidateRoleName: CANDIDATE_ROLE_NAME,
  recruiterRoleName: RECRUITER_ROLE_NAME,
  middlewareConfigMaxReqs,
};
