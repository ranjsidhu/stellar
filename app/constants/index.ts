type Route = {
  route: string;
  name: string;
  subRoutes?: { name: string; route: string }[];
};

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
    route: "/schools",
    name: "Schools",
    subRoutes: [{ name: "Safeguarding", route: "/schools/safeguarding" }],
  },
  {
    route: "/graduates",
    name: "Graduates",
    subRoutes: [
      { name: "Cover supervisors", route: "/graduates/cover" },
      { name: "TA", route: "/jobs/ta" },
    ],
  },
  {
    route: "/referrals",
    name: "Referrals",
  },
  {
    route: "/contact-us",
    name: "Contact",
  },
  {
    route: "/blog",
    name: "Blog",
  },
  {
    route: "/faq",
    name: "FAQs",
  },
];

const svgs = {
  email:
    "M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM25.8,8,16,14.78,6.2,8ZM4,24V8.91l11.43,7.91a1,1,0,0,0,1.14,0L28,8.91V24Z",
  phone:
    "M26,29h-.17C6.18,27.87,3.39,11.29,3,6.23A3,3,0,0,1,5.76,3h5.51a2,2,0,0,1,1.86,1.26L14.65,8a2,2,0,0,1-.44,2.16l-2.13,2.15a9.37,9.37,0,0,0,7.58,7.6l2.17-2.15A2,2,0,0,1,24,17.35l3.77,1.51A2,2,0,0,1,29,20.72V26A3,3,0,0,1,26,29ZM6,5A1,1,0,0,0,5,6v.08C5.46,12,8.41,26,25.94,27A1,1,0,0,0,27,26.06V20.72l-3.77-1.51-2.87,2.85L19.88,22C11.18,20.91,10,12.21,10,12.12l-.06-.48,2.84-2.87L11.28,5Z",
  address:
    "M16,2A11.0134,11.0134,0,0,0,5,13a10.8885,10.8885,0,0,0,2.2163,6.6s.3.3945.3482.4517L16,30l8.439-9.9526c.0444-.0533.3447-.4478.3447-.4478l.0015-.0024A10.8846,10.8846,0,0,0,27,13,11.0134,11.0134,0,0,0,16,2Zm0,15a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,17Z",
};

const iframeLoc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2423.4940235032795!2d-2.1624408226845357!3d52.59684063053694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b524d9dced7%3A0x9813f9de96f46667!2sTutoring%20To%20Success!5e0!3m2!1sen!2suk!4v1702931595578!5m2!1sen!2suk";

const initialRegisterState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const aboutUsValues = [
  {
    value: "Accountable",
    statement:
      "We aim to enhance the educational experience for all by not only contributing through our efforts but also by committing valuable resources such as time and expertise, while also holding our staff accountable for their actions and contributions.",
  },
  {
    value: "Partnership",
    statement:
      "Partnerships are crucial in education, enabling collaboration among educators, administrators, parents, and communities. By developing resources and expertise, we create dynamic learning environments that foster academic success and holistic development for all students.",
  },
  {
    value: "Reliable",
    statement:
      "We prioritize transparency and consistency. Set clear expectations, deliver on promises, address issues promptly, and seek feedback for improvement. By upholding these principles and maintaining open communication, we build trust and credibility.",
  },
  {
    value: "Safe",
    statement:
      "We prioritize safety through rigorous compliance with regulations, comprehensive training, secure facilities, and a culture of respect. These measures ensure the well-being of all stakeholders, fostering a safe and supportive environment.",
  },
  {
    value: "Integrity",
    statement:
      "Stellar adheres to ethical standards, being transparent, and fulfilling commitments. Through honesty, accountability, and fairness, it builds trust and credibility with clients, employees, and partners.",
  },
];

const processSteps = [
  {
    step: "Register",
    description:
      "Register your details and upload your CV, we will contact you within 24-48 hours for a initial discussion.",
  },
  {
    step: "Telephone Vetting",
    description:
      "We will schedule a telephone interview for you with one of our specialist education consultants. This session will typically last between 30 minutes to an hour, during which we'll delve into your experience and knowledge, as well as discuss your requirements. This helps us understand your needs better, enabling us to match you with suitable roles.",
  },
  {
    step: "Online Application Form",
    description:
      "You'll receive an invitation to fill out our exclusive online application form. This user-friendly process will walk you through each step, ensuring we gather all the necessary reference and clearance details required to successfully complete our Safeguarding checks.",
  },
  {
    step: "Face-to-Face Interview",
    description:
      "You will then be invited to a face-to-face interview to start the the process of getting you into a place of work. Here will we will check all the documents we have requested which are listed below.",
  },
  {
    step: "Vetting Completion and Work",
    description:
      "Once all vetting is completed and our consultants have passed it off, we will then call you regarding opportunities we have!",
  },
];

export {
  svgs,
  iframeLoc,
  routes,
  initialRegisterState,
  aboutUsValues,
  processSteps,
};
