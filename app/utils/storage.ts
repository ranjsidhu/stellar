"use server";

/* eslint-disable import/no-unused-modules */

import { config } from "@/app/utils/config";
import { getSession } from "./session";

const getUserId = async () => {
  try {
    const session = await getSession();
    return session?.user?.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserRole = async () => {
  try {
    const session = await getSession();
    if (!session) return null;
    return session?.user?.role ?? config.candidateRoleName;
  } catch (error) {
    console.error(error);
    return "Candidate";
  }
};

const getUserEmail = async () => {
  try {
    const session = await getSession();
    if (!session) return null;
    return session?.user?.email;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getUserId, getUserRole, getUserEmail };
