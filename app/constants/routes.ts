import type { Route } from "../types";

const authRoutes: Route[] = [
  {
    route: "/login",
    name: "Login",
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
    ],
  },
  {
    route: "/schools/safeguarding",
    name: "Schools",
    subRoutes: [{ name: "Safeguarding", route: "/schools/safeguarding" }],
  },
  {
    route: "/graduates",
    name: "Graduates",
  },
  {
    route: "/referrals",
    name: "Referrals",
  },
  {
    route: "/contact-us",
    name: "Contact",
  },
  // {
  //   route: "/blog",
  //   name: "Blog",
  // },
  {
    route: "/faqs",
    name: "FAQs",
  },
];

export { authRoutes, routes };
