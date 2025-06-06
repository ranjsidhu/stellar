"use server";

import { signIn } from "@/auth";

const handleCredentialsSignIn = async (formData: FormData) => {
  await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirectTo: "/profile",
  });
};

const handleGoogleSignIn = async () => {
  await signIn("google", { redirectTo: "/profile" });
};

export { handleCredentialsSignIn, handleGoogleSignIn };
