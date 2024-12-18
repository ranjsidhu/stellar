import { faqs } from "./faqs";
import { aboutUsText, aboutUsValues } from "./aboutus";
import { processSteps } from "./candidates";
import { authRoutes, routes } from "./routes";

// const svgs = {
//   email:
//     "M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM25.8,8,16,14.78,6.2,8ZM4,24V8.91l11.43,7.91a1,1,0,0,0,1.14,0L28,8.91V24Z",
//   phone:
//     "M26,29h-.17C6.18,27.87,3.39,11.29,3,6.23A3,3,0,0,1,5.76,3h5.51a2,2,0,0,1,1.86,1.26L14.65,8a2,2,0,0,1-.44,2.16l-2.13,2.15a9.37,9.37,0,0,0,7.58,7.6l2.17-2.15A2,2,0,0,1,24,17.35l3.77,1.51A2,2,0,0,1,29,20.72V26A3,3,0,0,1,26,29ZM6,5A1,1,0,0,0,5,6v.08C5.46,12,8.41,26,25.94,27A1,1,0,0,0,27,26.06V20.72l-3.77-1.51-2.87,2.85L19.88,22C11.18,20.91,10,12.21,10,12.12l-.06-.48,2.84-2.87L11.28,5Z",
//   address:
//     "M16,2A11.0134,11.0134,0,0,0,5,13a10.8885,10.8885,0,0,0,2.2163,6.6s.3.3945.3482.4517L16,30l8.439-9.9526c.0444-.0533.3447-.4478.3447-.4478l.0015-.0024A10.8846,10.8846,0,0,0,27,13,11.0134,11.0134,0,0,0,16,2Zm0,15a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,17Z",
// };

// const iframeLoc =
//   "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2423.4940235032795!2d-2.1624408226845357!3d52.59684063053694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b524d9dced7%3A0x9813f9de96f46667!2sTutoring%20To%20Success!5e0!3m2!1sen!2suk!4v1702931595578!5m2!1sen!2suk";

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
  authRoutes,
};
