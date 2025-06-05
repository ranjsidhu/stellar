"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Info } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { handleCredentialsSignIn } from "./serveractions";
import { notify } from "@/app/components";

export default function CredentialsForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCredentials = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await handleCredentialsSignIn(formData);
    } catch (error: any) {
      if (!error?.message?.includes("NEXT_REDIRECT")) {
        console.error(error);
        notify("error", "Login Failed", "Please check your email and password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      hasMinLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const isFormValid = () => {
    return formData.email && validatePassword(formData.password);
  };

  return (
    <form action={handleCredentials} className="space-y-4">
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
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          <span className="flex items-center gap-1">
            Password
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button type="button" className="inline-flex items-center">
                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs"
                    sideOffset={5}
                  >
                    <div className="text-sm text-gray-700 space-y-2">
                      <p className="font-medium">Password must contain:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>At least 8 characters</li>
                        <li>Uppercase and lowercase letters</li>
                        <li>At least one number</li>
                        <li>At least one special character</li>
                      </ul>
                    </div>
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </span>
        </label>
        <div className="relative">
          <input
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !isFormValid()}
        className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      <div className="flex justify-center">
        <Link href="/auth/forgot-password" className="text-sm text-gray-500">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
