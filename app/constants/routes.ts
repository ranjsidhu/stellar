import type { Route } from "../types";

const authRoutes: Route[] = [
  {
    route: "/auth/sign-in",
    name: "Sign In",
  },
  {
    route: "/register",
    name: "Register",
  },
];

const routes: Route[] = [
  {
    route: "/about-us",
    name: "About Us",
  },
  {
    route: "/jobs",
    name: "Jobs",
  },
  {
    route: "/candidates/the-process",
    name: "Candidates",
    subRoutes: [
      { name: "The process", route: "/candidates/the-process" },
      { name: "Testimonials", route: "/candidates/testimonials" },
      { route: "/graduates", name: "Graduates" },
      { route: "/referrals", name: "Referrals" },
    ],
  },
  {
    route: "/schools/safeguarding",
    name: "Schools",
    subRoutes: [{ name: "Safeguarding", route: "/schools/safeguarding" }],
  },

  {
    route: "/contact-us",
    name: "Contact",
  },
  {
    route: "/faqs",
    name: "FAQs",
  },
];

export { authRoutes, routes };
