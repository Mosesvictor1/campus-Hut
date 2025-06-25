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
          CampusHut is committed to protecting your privacy in line with the
          Nigeria Data Protection Regulation (NDPR). This policy outlines how we
          collect, use, and protect your data.
        </p>
        <ol className="list-decimal list-inside space-y-4 sm:space-y-6 lg:space-y-8 text-gray-800 text-base sm:text-lg lg:text-xl">
          <li>
            <strong>Data Controller</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              Campushut Limited located at The Philippi Centre Oluwalogbon
              House, Plot A Obafemi Awolowo Way Alausa Ikeja, Lagos Nigeria, is
              the data controller responsible for your personal information.
            </p>
          </li>
          <li>
            <strong>Data We Collect</strong>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Full name, email address, phone number</li>
              <li>School, faculty, and course of study</li>
              <li>Device information, IP address, and location</li>
              <li>Usage data, such as visited pages and interactions</li>
              <li>Uploaded content (e.g. assignments, comments)</li>
            </ul>
          </li>
          <li>
            <strong>Purpose of Data Collection</strong>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Create and manage your CampusHut account</li>
              <li>Deliver personalized content and recommendations</li>
              <li>Facilitate internship matching and e-learning</li>
              <li>Improve platform features and user experience</li>
              <li>Send platform updates and notifications</li>
              <li>Comply with legal obligations</li>
            </ul>
          </li>
          <li>
            <strong>Legal Basis</strong>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Your consent (you can withdraw at any time)</li>
              <li>Legitimate interests (e.g. improving services)</li>
              <li>Legal obligations (e.g. NDPR compliance)</li>
            </ul>
          </li>
          <li>
            <strong>Data Sharing</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We do not sell your data. We may share it with:
            </p>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>
                Technical service providers who process data on our behalf
              </li>
              <li>Regulatory or law enforcement bodies (if required by law)</li>
            </ul>
          </li>
          <li>
            <strong>Data Retention</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We retain personal data only as long as necessary for the purposes
              listed or as required by law.
            </p>
          </li>
          <li>
            <strong>Your Rights (NDPR)</strong>
            <ul className="list-disc ml-6 mt-1 sm:mt-2 text-gray-600">
              <li>Access your data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
              <li>Object to data processing</li>
              <li>Lodge a complaint with NITDA</li>
            </ul>
          </li>
          <li>
            <strong>Data Security</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We implement technical and organizational measures to protect your
              data against unauthorized access, disclosure, or loss.
            </p>
          </li>
          <li>
            <strong>Cookies</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              CampusHut uses cookies for session management and to improve user
              experience. You can manage cookie preferences in your browser
              settings.
            </p>
          </li>
          <li>
            <strong>Changes to This Policy</strong>
            <p className="ml-2 sm:ml-4 mt-1 sm:mt-2 text-gray-600">
              We may update this policy from time to time. Continued use after
              changes means you accept the new terms.
            </p>
          </li>
        </ol>
        <p className="mt-8 sm:mt-12 text-gray-700 text-center text-base sm:text-lg lg:text-xl">
          For questions, contact:{" "}
          <a
            href="mailto:hello@mycampushut.com"
            className="text-campusGreen-600 underline"
          >
            hello@mycampushut.com
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
