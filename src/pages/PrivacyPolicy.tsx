import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
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
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10 text-center">
          Privacy Policy
        </h1>
        <p className="mb-6 sm:mb-10 text-gray-700 text-center text-base sm:text-lg lg:text-xl">
          Campushut Limited is committed to protecting your privacy in
          accordance with the Nigeria Data Protection Regulation (NDPR).
        </p>
        <ol className="list-decimal list-inside space-y-4 sm:space-y-6 lg:space-y-8 text-gray-800 text-base sm:text-lg lg:text-xl">
          <li>
            <strong>Data Controller</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              Campushut Limited, located at The Philippi Centre Oluwalogbon
              House, Plot A Obafemi Awolowo Way, Alausa Ikeja, Lagos Nigeria, is
              responsible for your personal data.
            </p>
          </li>
          <li>
            <strong>Data We Collect</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We may collect:
            </p>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Personal information (name, email, phone number)</li>
              <li>Academic details (school, faculty, course of study)</li>
              <li>Device and technical data (IP address, device type, location)</li>
              <li>Usage data (interactions within the platform)</li>
              <li>User-generated content (assignments, chats, uploads)</li>
            </ul>
          </li>
          <li>
            <strong>Purpose of Data Collection</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We use your data to:
            </p>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Create and manage your account</li>
              <li>Provide personalized learning experiences</li>
              <li>Deliver AI-powered academic assistance</li>
              <li>Facilitate internships, marketplace, and platform features</li>
              <li>Improve platform performance and user experience</li>
              <li>Communicate updates and notifications</li>
              <li>Comply with legal obligations</li>
            </ul>
          </li>
          <li>
            <strong>Legal Basis</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We process your data based on:
            </p>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Your consent</li>
              <li>Legitimate business interests</li>
              <li>Legal obligations under NDPR</li>
            </ul>
          </li>
          <li>
            <strong>Data Sharing</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We do not sell your data. We may share your data with:
            </p>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Trusted service providers (e.g. hosting, analytics, payment processors)</li>
              <li>Advertising and analytics partners (e.g. Google, Meta, TikTok)</li>
              <li>Regulatory authorities when required by law</li>
            </ul>
          </li>
          <li>
            <strong>International Data Transfers</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              Your data may be processed outside Nigeria through third-party
              services. We ensure such transfers comply with applicable data
              protection laws.
            </p>
          </li>
          <li>
            <strong>Data Retention</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We retain your data only as long as necessary for service
              delivery, legal obligations, or account activity. Inactive
              accounts may be deleted after a reasonable period.
            </p>
          </li>
          <li>
            <strong>Your Rights (NDPR)</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              You have the right to:
            </p>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Access your data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
              <li>Object to processing</li>
              <li>Lodge complaints with NITDA</li>
            </ul>
          </li>
          <li>
            <strong>Data Security</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We implement technical and organizational measures to protect your
              data. However, no system is completely secure.
            </p>
          </li>
          <li>
            <strong>Data Breach Notification</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              In the event of a data breach, we will notify affected users and
              relevant authorities as required by law.
            </p>
          </li>
          <li>
            <strong>Children's Privacy</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              CampusHut is not intended for users under 16 years of age. We do
              not knowingly collect data from minors.
            </p>
          </li>
          <li>
            <strong>Cookies</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We use cookies and similar technologies to improve user experience
              and analyze platform usage.
            </p>
          </li>
          <li>
            <strong>Changes to This Policy</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We may update this policy from time to time. Continued use of the
              platform indicates acceptance of changes.
            </p>
          </li>
        </ol>
        <p className="mt-8 sm:mt-12 text-gray-700 text-center text-base sm:text-lg lg:text-xl">
          For privacy-related inquiries, contact:{" "}
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

export default PrivacyPolicy;