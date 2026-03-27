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
              By accessing or using CampusHut (the "Platform"), you agree to be
              bound by these Terms. If you do not agree, please do not use the
              Platform.
            </p>
          </li>
          <li>
            <strong>Eligibility</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              You must be at least 16 years old and affiliated with a tertiary
              institution to use CampusHut.
            </p>
          </li>
          <li>
            <strong>Use of the Platform</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              You agree to use CampusHut only for lawful and academic purposes.
              You must not:
            </p>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Misuse, hack, or disrupt the platform</li>
              <li>Upload or distribute unlawful, harmful, or misleading content</li>
              <li>Use materials from the platform for plagiarism or academic dishonesty</li>
            </ul>
          </li>
          <li>
            <strong>Academic Disclaimer</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              Campushut Limited provides educational resources, project
              materials, and study tools strictly for learning and reference
              purposes. Users are solely responsible for how they use any
              content obtained from the platform.
            </p>
          </li>
          <li>
            <strong>AI Disclaimer</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              CampusHut's AI features provide automated responses that may not
              always be accurate or complete. Users are advised to verify
              information independently before relying on it.
            </p>
          </li>
          <li>
            <strong>User Content</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              You retain ownership of content you upload but grant Campushut a
              non-exclusive license to use it for platform operations. You are
              responsible for the legality and accuracy of your content.
            </p>
          </li>
          <li>
            <strong>Marketplace and Third-Party Services</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              Campushut may provide access to third-party services, including
              marketplaces and internships. CampusHut is not responsible for
              transactions, quality, or outcomes of third-party services.
            </p>
          </li>
          <li>
            <strong>Payments and Transactions</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              All payments made on CampusHut are subject to applicable fees.
              Transactions may be processed through third-party providers.
              Refund policies, where applicable, will be communicated within
              specific services.
            </p>
          </li>
          <li>
            <strong>Intellectual Property</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              All platform content, features, and branding are owned by
              Campushut Limited and may not be copied or reused without
              permission.
            </p>
          </li>
          <li>
            <strong>Service Availability</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We strive to provide uninterrupted service but do not guarantee
              it. We reserve the right to modify, suspend, or discontinue
              services at any time.
            </p>
          </li>
          <li>
            <strong>Termination</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We may suspend or terminate your account if you violate these
              Terms.
            </p>
          </li>
          <li>
            <strong>Limitation of Liability</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              Campushut Limited shall not be liable for:
            </p>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Academic outcomes</li>
              <li>Errors in AI-generated content</li>
              <li>Losses from use of the platform</li>
              <li>Third-party interactions</li>
            </ul>
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