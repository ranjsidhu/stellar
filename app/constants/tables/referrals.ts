export type ReferralsType = {
  id: number;
  referrerName: string;
  referrerContactNumber: string;
  referredFriendName: string;
  referredFriendJob: string;
  referredFriendContactNumber: string;
  referredFriendLocation: string;
  referredFriendEmail: string;
  resolved: boolean;
  created_at: Date | string;
  updated_at: Date | string;
};

const referralsColumns = [
  {
    title: "Resolved",
    dataIndex: "resolved",
    key: "resolved",
  },
  {
    title: "Referred At",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Referrer Name",
    dataIndex: "referrerName",
    key: "referrerName",
  },
  {
    title: "Referrer Contact",
    dataIndex: "referrerContactNumber",
    key: "referrerContactNumber",
  },
  {
    title: "Referred Name",
    dataIndex: "referredFriendName",
    key: "referredFriendName",
  },
  {
    title: "Referred Job",
    dataIndex: "referredFriendJob",
    key: "referredFriendJob",
  },
  {
    title: "Referred Contact Number",
    dataIndex: "referredFriendContactNumber",
    key: "referredFriendContactNumber",
  },
  {
    title: "Referred Email",
    dataIndex: "referredFriendEmail",
    key: "referredFriendEmail",
  },
  {
    title: "Referred Location",
    dataIndex: "referredFriendLocation",
    key: "referredFriendLocation",
  },
];

export { referralsColumns };
