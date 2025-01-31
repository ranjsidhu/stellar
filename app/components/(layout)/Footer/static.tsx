import Image from "next/image";
import instagram from "@/app/assets/socials/ig.png";
import facebook from "@/app/assets/socials/fb.png";

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/tutoringtosuccesswolverhampton/",
    icon: instagram,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/19mnvxTJP2/?mibextid=wwXIfr",
    icon: facebook,
  },
];

const CopyrightSocials = () => (
  <div className="border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-gray-400 text-sm text-center">
          <p>Company Registration Number: 15228068</p>
          <p>All rights reserved</p>
          <p
            className="hover:cursor-pointer"
            onClick={() => window.open("https://ranjsidhu.dev")}
          >
            &copy; {new Date().getFullYear()} RS Web Consultancy.
          </p>
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
  </div>
);

export { CopyrightSocials };
