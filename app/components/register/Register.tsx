"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Letterhead } from "@/app/assets";
import { initialRegisterState } from "@/app/constants";
import instance from "@/app/utils/instance";
import "./register.css";

export default function Register() {
  const router = useRouter();
  const [registerData, setRegisterData] = useState(initialRegisterState);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await instance.post("/auth/register", {
        ...registerData,
        options: {
          data: {
            first_name: registerData.firstName,
            last_name: registerData.lastName,
          },
        },
      });
      setRegisterData(initialRegisterState);
      router.push("/");
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="login-wrapper">
      <Image
        src={Letterhead}
        priority
        alt="Letterhead image"
        className="register-image"
      />
      <form onSubmit={handleSubmit} className="register-form">
        {error && <div className="register-form-error">{error}</div>}
        <div className="register-form-flex">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            autoComplete="given-name"
            required
            onChange={onChangeHandler}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            autoComplete="family-name"
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="register-form-flex">
          <input
            name="email"
            type="text"
            placeholder="Email"
            autoComplete="email"
            required
            onChange={onChangeHandler}
          />
          <input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            autoComplete="tel"
            onChange={onChangeHandler}
          />
        </div>
        <div className="register-form-flex">
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            required
            onChange={onChangeHandler}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="register-form-button">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
