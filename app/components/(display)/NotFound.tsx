import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-[#00150f]">404</h1>
          <h2 className="text-2xl font-semibold text-[#00150f]">
            Page Not Found
          </h2>
          <div className="h-1 w-20 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <p className="text-gray-600 text-lg">
          We haven&apos;t been able to find the page you requested
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-[#00150f] bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-200"
          >
            Return to Homepage
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
