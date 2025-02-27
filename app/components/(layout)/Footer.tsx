import Link from "next/link";
import { routes } from "@/app/constants";
import { CopyrightSocials } from "./static";

export default function Footer() {
  return (
    <footer className="mt-16 w-full bg-gradient-to-b from-emerald-950 to-gray-900 text-white overflow-hidden">
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
              <a
                href="#"
                className="text-white/70 hover:text-yellow-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="text-white/70 hover:text-yellow-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.67.643-1.275 1.153-1.772A4.88 4.88 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.977.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.053-.059 1.37-.059 4.04 0 2.67.01 2.987.059 4.04.045.977.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.053.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.977-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.053.059-1.37.059-4.04 0-2.67-.01-2.987-.059-4.04-.045-.977-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.053-.047-1.37-.059-4.04-.059zm0 3.064A5.135 5.135 0 0017.135 12 5.135 5.135 0 0012 17.135 5.135 5.135 0 006.865 12 5.135 5.135 0 0012 6.865zm0 8.468A3.333 3.333 0 018.667 12 3.333 3.333 0 0112 8.667 3.333 3.333 0 0115.333 12 3.333 3.333 0 0112 15.333zm6.538-8.671a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white/90">Quick Links</h3>
            <ul className="space-y-2">
              {routes
                .slice(0, Math.ceil(routes.length / 2))
                .map((route, index) => (
                  <li key={index}>
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
              {routes
                .slice(Math.ceil(routes.length / 2))
                .map((route, index) => (
                  <li key={index}>
                    <Link
                      href={route.route}
                      className="text-white/70 hover:text-yellow-400 transition-colors hover:translate-x-1 inline-block"
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
            </ul>

            {/* Contact Email */}
            <div className="pt-4">
              <h4 className="text-white/90 font-medium mb-2">Contact Us</h4>
              <a
                href="mailto:admin@stellar-recruitment.co.uk"
                className="text-white/70 hover:text-yellow-400 transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 text-emerald-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
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
