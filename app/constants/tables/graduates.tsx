export type GraduatesType = {
  id: number;
  full_name: string;
  contact_number: string;
  email: string;
  course: string;
  institution: string;
  in_progress: boolean;
  estimated_completion_date: string;
  university_levels: { name: string };
  resolved: boolean;
  created_at: Date | string;
  updated_at: Date | string;
};

const graduatesColumns = [
  {
    title: "Date Added",
    dataIndex: "created_at",
    key: "created_at",
    render: (date: string) => (
      <span>{date ? new Date(date).toLocaleString() : "Not Provided"}</span>
    ),
  },
  {
    title: "Graduate Name",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Graduate Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Graduate Contact",
    dataIndex: "contact_number",
    key: "contact_number",
  },
  {
    title: "Graduate Course",
    dataIndex: "course",
    key: "course",
  },
  {
    title: "Institution",
    dataIndex: "institution",
    key: "institution",
  },
  {
    title: "In Progress",
    dataIndex: "in_progress",
    key: "in_progress",
    render: (in_progress: boolean) => <>{in_progress ? "True" : "False"}</>,
  },
  {
    title: "Estimated Completion Date",
    dataIndex: "estimated_completion_date",
    key: "estimated_completion_date",
    render: (date: string) => (
      <span>{date ? new Date(date).toLocaleString() : "Not Provided"}</span>
    ),
  },
  {
    title: "Academic Level",
    dataIndex: "university_levels",
    key: "university_levels",
  },
];

export { graduatesColumns };
