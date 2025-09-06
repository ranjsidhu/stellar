import { BasicTable } from "./db";
import { User } from "./components";
import { Dispatch, SetStateAction } from "react";
import { FormInstance } from "antd";

// Generic route parameter type
type RouteParams<T extends string> = {
  // -disable-next-line no-unused-vars
  [K in T]: string;
};

// Generic component props type
type PageProps<T extends string> = {
  params: Promise<RouteParams<T>>;
};

type JobApplyProps = {
  id: string;
  status: BasicTable;
  title: string;
  description: string;
};

type JobApplyPageProps = {
  searchParams: Promise<{
    id: string;
    title: string;
    description: string;
  }>;
};

type EditableProfileProps = {
  details: User;
  form: FormInstance<User>;
  setDetails: Dispatch<SetStateAction<User | null>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

type ProfileActionsProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  form: FormInstance<User>;
};

type ViewProfileProps = {
  details: User;
};

type ReferralFieldType = {
  name: string;
  contactNumber: string;
  friend: {
    name: string;
    job: string;
    phone: string;
    location?: string;
    email?: string;
  };
};

export {
  type PageProps,
  type JobApplyProps,
  type JobApplyPageProps,
  type EditableProfileProps,
  type ProfileActionsProps,
  type ViewProfileProps,
  type ReferralFieldType,
};
