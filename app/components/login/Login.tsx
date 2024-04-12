"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Letterhead } from "@/app/assets";
import instance from "@/app/utils/instance";
import "./login.css";

export default function Login() {
  const router = useRouter();
  const type = useSearchParams().get("type");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!type) router.push("/");
  }, [type, router]);

  const errorHandle = () => {
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errorHandle()) {
      setError("Invalid email or password");
      return;
    }

    try {
      const res = await instance.post("/login", { type, email, password });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <Image
        src={Letterhead}
        priority
        alt="Letterhead image"
        className="login-image"
      />
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="login-form-error">{error}</div>}
        <div className="login-form-input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-form-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
