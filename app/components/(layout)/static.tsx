"use client";

import Image from "next/image";
import Link from "next/link";
import instagram from "@/app/assets/socials/ig.png";
import facebook from "@/app/assets/socials/fb.png";

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/stellar_recruitment_limited/",
    icon: instagram,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com",
    icon: facebook,
  },
];

const CopyrightSocials = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="text-gray-400 text-sm text-center">
        <p>Company Registration Number: 16725435</p>
        <p>All rights reserved</p>
        <Link
          href="https://ranjsidhu.dev"
          target="_blank"
          className="hover:cursor-pointer"
        >
          &copy; {new Date().getFullYear()} RS Web Consultancy.
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
        {socials.map(({ name, url, icon }) => (
          <Image
            priority
            src={icon}
            key={name}
            alt={name}
            width={24}
            height={24}
            className="w-6 h-6 hover:cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => window.open(url)}
          />
        ))}
      </div>
    </div>
  </div>
);

export { CopyrightSocials };
