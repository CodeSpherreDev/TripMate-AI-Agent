import React from "react";
import { useNavigate } from "react-router-dom";
const PrivacyPolicy = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b pt-25 from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-lg p-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400">
            🌍 TripMateAI Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Sections */}
        <section className="space-y-8">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              1. Introduction
            </h2>
            <p className="mt-2 text-gray-300 leading-relaxed">
              Welcome to TripMateAI ("we," "our," or "us"). We are committed to
              protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your data when you use our AI-powered travel planning
              services.
            </p>
          </div>

          {/* 2. Information We Collect */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              2. Information We Collect
            </h2>
            <p className="mt-2 text-gray-300">
              When you use TripMateAI, we may collect the following types of
              information:
            </p>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>
                <strong className="text-gray-200">Travel Preferences:</strong>{" "}
                Destination, duration, budget, interests, and transportation
                preferences
              </li>
              <li>
                <strong className="text-gray-200">Technical Data:</strong> IP
                address, browser type, device information, and usage statistics
              </li>
              <li>
                <strong className="text-gray-200">Communication Data:</strong>{" "}
                Messages and queries you send to our AI travel planner
              </li>
            </ul>
          </div>

          {/* 3. How We Use */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              3. How We Use Your Information
            </h2>
            <p className="mt-2 text-gray-300">We use your information to:</p>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>Generate personalized travel itineraries and recommendations</li>
              <li>Improve our AI models and service quality</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>
                Ensure the security and proper functioning of our service
              </li>
            </ul>
          </div>

          {/* 4. IBM Cloud */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              4. IBM Cloud Services
            </h2>
            <p className="mt-2 text-gray-300">
              TripMateAI utilizes IBM Cloud services to process and store data.
              IBM Cloud implements robust security measures to protect your
              information. For more details, visit{" "}
              <a
                href="https://www.ibm.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                IBM Privacy Statement
              </a>
              .
            </p>
          </div>

          {/* 5. Data Retention */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              5. Data Retention
            </h2>
            <p className="mt-2 text-gray-300">
              We retain your travel preference data for as long as necessary to
              provide our services and for legitimate business purposes. You may
              request deletion of your data at any time by contacting us.
            </p>
          </div>

          {/* 6. Your Rights */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              6. Your Rights
            </h2>
            <p className="mt-2 text-gray-300">You have the right to:</p>
            <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain processing activities</li>
            </ul>
          </div>

          {/* 7. Cookies */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              7. Cookies and Tracking
            </h2>
            <p className="mt-2 text-gray-300">
              We use cookies and similar technologies to enhance your
              experience, analyze service usage, and improve our offerings. You
              can control cookies through your browser settings.
            </p>
          </div>

          {/* 8. Changes */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              8. Changes to This Policy
            </h2>
            <p className="mt-2 text-gray-300">
              We may update this Privacy Policy periodically. We will notify you
              of significant changes by posting the new policy on our website
              and updating the "Last Updated" date.
            </p>
          </div>

          {/* 9. Contact */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">9. Contact Us</h2>
            <p className="mt-2 text-gray-300">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at:
              <br />
              <span className="text-cyan-400 font-mono">
                codespherre.official@gmail.com
              </span>
            </p>
          <button className="cursor-pointer mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold" onClick={() => navigate("/")}>Go to Home</button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-gray-500">
          ✈️ Safe travels with <span className="text-cyan-400">TripMateAI</span> 🌍
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
