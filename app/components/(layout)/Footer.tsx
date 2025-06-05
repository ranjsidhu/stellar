import Link from "next/link";
import { routes } from "@/app/constants";
import { CopyrightSocials } from "./static";
import { FacebookFilled, InstagramFilled } from "@ant-design/icons";
import { Mail as MailIcon } from "lucide-react";
import { config } from "@/app/utils/config";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-emerald-950 to-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white/90">
              Stellar Recruitment
            </h3>
            <p className="text-sm text-white/70 max-w-xs">
              Connecting top talent with exceptional opportunities across
              industries.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com"
                className="text-white/70 hover:text-yellow-400 transition-colors duration-150"
                target="_blank"
                aria-label="Facebook"
              >
                <FacebookFilled className="text-2xl" />
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/stellar_recruitment_limited/"
                className="text-white/70 hover:text-yellow-400 transition-colors duration-150"
                aria-label="Instagram"
                target="_blank"
              >
                <InstagramFilled className="text-2xl" />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white/90">Quick Links</h3>
            <ul className="space-y-2">
              {routes.slice(0, Math.ceil(routes.length / 2)).map((route) => (
                <li key={route.route}>
                  <Link
                    href={route.route}
                    className="text-white/70 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white/90">Resources</h3>
            <ul className="space-y-2">
              {routes.slice(Math.ceil(routes.length / 2)).map((route) => (
                <li key={route.route}>
                  <Link
                    href={route.route}
                    className="text-white/70 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/70 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-white/70 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>

            {/* Contact Email */}
            <div className="pt-4">
              <h4 className="text-white/90 font-medium mb-2">Contact Us</h4>
              <a
                href={`mailto:${config.adminEmail}`}
                className="text-white/70 hover:text-yellow-400 transition-colors flex items-center"
              >
                <MailIcon className="w-5 h-5 mr-2 text-emerald-400" />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 "></div>

        <CopyrightSocials />
      </div>
    </footer>
  );
}
