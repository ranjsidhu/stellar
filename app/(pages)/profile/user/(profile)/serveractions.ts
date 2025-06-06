"use server";

import { prisma } from "@/app/api/utils/prisma-utils";

const getUserDetails = async (email: string | null | undefined) => {
  if (!email) return null;
  const userDetails = await prisma.users.findUnique({
    where: { email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      dob: true,
      phone: true,
      email: true,
      first_line_address: true,
      city: true,
      town: true,
      postcode: true,
      roles: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return userDetails;
};

export { getUserDetails };
