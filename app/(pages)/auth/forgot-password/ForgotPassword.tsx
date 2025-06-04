"use client";

import { sendResetEmail } from "../update-password/serveractions";
import { notify } from "@/app/components";

export default function ForgotPassword() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    try {
      await sendResetEmail(email);
      notify("success", "Password reset email sent", "");
    } catch (error: any) {
      notify("error", "Error", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          autoComplete="email"
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
      >
        Reset Password
      </button>
    </form>
  );
}
