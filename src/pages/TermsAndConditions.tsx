import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-1 sm:py-12 sm:px-4">
    <div className="w-full max-w-full sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl flex flex-col">
      <nav className="mb-4 sm:mb-8">
        <Link
          to="/"
          className="inline-block text-campusGreen-700 hover:text-campusGreen-900 font-semibold text-base sm:text-lg transition-colors"
        >
          &larr; Back to Home
        </Link>
      </nav>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 sm:p-4 lg:p-8 xl:p-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10 text-center">
          Terms and Conditions
        </h1>
        <p className="mb-6 sm:mb-10 text-gray-700 text-center text-base sm:text-lg lg:text-xl">
          Welcome to CampusHut! By accessing or using our platform (app), you
          agree to be bound by the following terms and conditions:
        </p>
        <ol className="list-decimal list-inside space-y-4 sm:space-y-6 lg:space-y-8 text-gray-800 text-base sm:text-lg lg:text-xl">
          <li>
            <strong>Acceptance of Terms</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              By using CampusHut, you agree to comply with and be legally bound
              by these Terms. If you do not agree, please do not use the
              platform.
            </p>
          </li>
          <li>
            <strong>Eligibility</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              You must be a student or affiliated with a tertiary institution in
              Africa and at least 16 years old to use this platform.
            </p>
          </li>
          <li>
            <strong>Use of the Platform</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              You agree to use CampusHut only for lawful purposes. You must not
              misuse, hack, or interfere with the platform or its features.
            </p>
          </li>
          <li>
            <strong>User Content</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              You retain ownership of content you upload but grant us a
              non-exclusive, royalty-free license to use it in connection with
              the service. You're responsible for the legality and accuracy of
              your content.
            </p>
          </li>
          <li>
            <strong>Intellectual Property</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              All content, branding, and features on CampusHut are our
              intellectual property and may not be copied, modified, or reused
              without permission.
            </p>
          </li>
          <li>
            <strong>Privacy and Data</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We collect and process personal data in accordance with our
              Privacy Policy. By using our platform, you consent to such
              processing.
            </p>
          </li>
          <li>
            <strong>Service Availability</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We strive for uptime but do not guarantee uninterrupted service.
              We reserve the right to suspend or terminate access at any time.
            </p>
          </li>
          <li>
            <strong>Termination</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We may suspend or terminate your account if you violate these
              Terms or engage in unlawful behavior on the platform.
            </p>
          </li>
          <li>
            <strong>Limitation of Liability</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              CampusHut will not be liable for any indirect or consequential
              loss arising from use of the platform.
            </p>
          </li>
          <li>
            <strong>Governing Law</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              These Terms are governed by the laws of the Federal Republic of
              Nigeria.
            </p>
          </li>
        </ol>
        <p className="mt-8 sm:mt-12 text-gray-700 text-center text-base sm:text-lg lg:text-xl">
          For questions or support, contact:{" "}
          <a
            href="mailto:support@mycampushut.com"
            className="text-campusGreen-600 underline"
          >
            support@mycampushut.com
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default TermsAndConditions;
