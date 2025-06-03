import { Metadata } from "next";
import { config } from "@/app/utils/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Stellar - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Stellar&apos;s Privacy Policy. This document outlines how
            we collect, use, and protect your personal information when you use
            our platform. We are committed to ensuring that your privacy is
            protected and that we comply with all applicable data protection
            laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p className="mb-4">We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal information (name, email address, contact details)</li>
            <li>Professional information (work history, education, skills)</li>
            <li>Account information (username, password, preferences)</li>
            <li>Usage data (how you interact with our platform)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Process your job applications and referrals</li>
            <li>Communicate with you about our services</li>
            <li>Improve our platform and user experience</li>
            <li>Send you relevant job opportunities and updates</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Protection</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. Your data is stored securely and we regularly review
            our security practices to ensure your information remains protected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            6. Cookies and Tracking
          </h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to improve your
            browsing experience, analyze site traffic, and understand where our
            visitors are coming from. You can control cookie settings through
            your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Third-Party Services
          </h2>
          <p className="mb-4">
            We may use third-party services that collect, monitor, and analyze
            data. These services have their own privacy policies addressing how
            they use such information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to This Policy
          </h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last Updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at:
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
