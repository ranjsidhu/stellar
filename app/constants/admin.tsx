import { AdminCardProps } from "../types";
import { notify } from "../components";

const roles = [
  {
    id: process.env.NEXT_PUBLIC_ADMIN_ROLE_ID,
    label: "Admin",
    value: process.env.NEXT_PUBLIC_ADMIN_ROLE_ID,
  },
  {
    id: process.env.NEXT_PUBLIC_RECRUITER_ROLE_ID,
    label: "Recruiter",
    value: process.env.NEXT_PUBLIC_RECRUITER_ROLE_ID,
  },

  {
    id: process.env.NEXT_PUBLIC_CANDIDATE_ROLE_ID,
    label: "Candidate",
    value: process.env.NEXT_PUBLIC_CANDIDATE_ROLE_ID,
  },
];

const updateRole = async (role_id: number, user_id: number) => {
  try {
    await fetch(`/api/admin/roles`, {
      method: "PUT",
      body: JSON.stringify({
        role_id: Number(role_id),
        user_id: Number(user_id),
      }),
    });
  } catch (error: any) {
    console.error("Failed to update user role:", error);
  }
};

const dropdownOnChange = (
  value: string,
  record: any,
  // -disable-next-line no-unused-vars
  onSuccess?: (newRole: string) => void
) => {
  const role = roles.find((r) => r.id == value);
  updateRole(
    role ? Number(role.id) : Number(process.env.NEXT_PUBLIC_CANDIDATE_ROLE_ID),
    record.id
  )
    .then(() => {
      notify("success", "Role Updated", "User role has been updated");
      if (onSuccess && role) onSuccess(role.label);
    })
    .catch(() => {
      notify("error", "Role Update Failed", "Failed to update user role");
    });
};

const ADMIN_CARDS: AdminCardProps[] = [
  {
    title: "Change Configuration",
    description: "View and change various options across the application",
    route: "/admin/configuration",
  },
  {
    title: "Manage Jobs",
    description: "View and manage active jobs",
    route: "/admin/jobs",
  },
  {
    title: "Graduates and Referrals",
    description: "View and manage graduates and referrals",
    route: "/admin/grads-and-refs",
  },
  {
    title: "Manage Users",
    description: "View and manage user accounts",
    route: "/admin/users",
  },
  {
    title: "Recruiter Dashboard",
    description: "View and manage recruiter dashboard",
    route: "/recruiter",
  },
];

export { ADMIN_CARDS, dropdownOnChange, roles };
