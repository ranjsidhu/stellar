/* eslint-disable import/no-unused-modules */

import { faqs } from "./faqs";
import { aboutUsText, aboutUsValues } from "./aboutus";
import { processSteps } from "./candidates";
import { routes } from "./routes";
import { PROFILE_TABS, getFileIcon, getStatusColor } from "./profile";

const socials = [
  { className: "facebook", href: "https://www.facebook.com/en-gb" },
  {
    className: "instagram",
    href: "https://www.instagram.com/stellar_recruitment_limited/",
  },
  { className: "linkedin", href: "https://www.linkedin.com" },
  { className: "envelope", href: "mailto:admin@stellar-recruitment.co.uk" },
];

export {
  routes,
  processSteps,
  faqs,
  socials,
  aboutUsText,
  aboutUsValues,
  PROFILE_TABS,
  getFileIcon,
  getStatusColor,
};
