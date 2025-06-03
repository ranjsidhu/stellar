import { Metadata } from "next";
import { config } from "@/app/utils/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Stellar - Learn about the rules and guidelines for using our platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            1. Account Registration and Security
          </h2>
          <p className="mb-4">
            By registering for an account on Stellar, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Provide accurate and complete personal information, including your
              full name, date of birth, and contact details
            </li>
            <li>Maintain the security of your account credentials</li>
            <li>
              Notify us immediately of any unauthorized access to your account
            </li>
            <li>Be at least 18 years old to use the platform</li>
            <li>Not share your account credentials with others</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. User Responsibilities
          </h2>
          <p className="mb-4">As a user of Stellar, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and up-to-date professional information</li>
            <li>Not submit false or misleading information</li>
            <li>Not use the platform for any illegal purposes</li>
            <li>
              Not engage in any activity that could harm the platform or other
              users
            </li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Job Applications and Referrals
          </h2>
          <p className="mb-4">
            When using our job application and referral system:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You must provide accurate information in your job applications
            </li>
            <li>
              Referrals must be made in good faith and based on genuine
              professional relationships
            </li>
            <li>
              You are responsible for the accuracy of information provided in
              referrals
            </li>
            <li>
              We reserve the right to verify the authenticity of referrals
            </li>
            <li>
              False or misleading referrals may result in account termination
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Content and Communication
          </h2>
          <p className="mb-4">
            Regarding content and communication on the platform:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for all content you post or share</li>
            <li>Content must not be discriminatory, offensive, or illegal</li>
            <li>You must respect the privacy and rights of other users</li>
            <li>
              We reserve the right to remove content that violates our terms
            </li>
            <li>Communication must be professional and appropriate</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Platform Usage</h2>
          <p className="mb-4">When using our platform:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You must not attempt to access restricted areas of the platform
            </li>
            <li>
              You must not use automated systems or bots without permission
            </li>
            <li>
              You must not interfere with the proper functioning of the platform
            </li>
            <li>We may limit or restrict access to certain features</li>
            <li>We reserve the right to modify or discontinue features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate or suspend your account if you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate these terms of service</li>
            <li>Engage in fraudulent or illegal activities</li>
            <li>Provide false or misleading information</li>
            <li>Abuse the platform or other users</li>
            <li>Fail to comply with our policies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="mb-4">
            We may modify these terms at any time. We will notify you of
            significant changes via email or through the platform. Continued use
            of the platform after changes constitutes acceptance of the modified
            terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p className="mb-4">
            For questions about these terms, please contact us at:
            <br />
            Email: {config.adminEmail}
            <br />
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
}
