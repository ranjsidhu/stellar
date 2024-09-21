import { AdminCardProps } from "../types";

const ADMIN_CARDS: AdminCardProps[] = [
  {
    title: "Change Configuration",
    description: "View and change various options across the application",
    route: "/admin/configuration",
  },
  {
    title: "View Referrals",
    description: "View and manage referrals",
    route: "/admin/referrals",
  },
  {
    title: "View Graduates",
    description: "View and manage graduates",
    route: "/admin/graduates",
  },
  {
    title: "Manage Users",
    description: "View and manage user accounts",
    route: "/admin/users",
  },
];

export { ADMIN_CARDS };
