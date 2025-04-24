// pages/privacy-policy.js
import Link from 'next/link';
import Header from '../layouts/header';
import Footer from '../layouts/footer';
import SEO from '@/components/SEO';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Pan-African Agency Network (PAAN)"
        description="Learn how the Pan-African Agency Network (PAAN) collects, uses, and protects your personal information. Read our Privacy Policy for more details."
        keywords="PAAN, privacy policy, data protection, Pan-African Agency Network"
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow px-4 py-16 max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold text-[#172840] mb-6 text-center">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Last Updated: April 1, 2025
          </p>

          <section className="space-y-6 text-gray-700">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to the Pan-African Agency Network (PAAN). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (<a href="https://www.paan.africa" className="text-[#F25849] hover:underline">www.paan.africa</a>) or interact with us through our contact forms or other services.
              </p>
              <p className="mt-2">
                By using our website or submitting your information, you agree to the terms of this Privacy Policy. If you do not agree with this policy, please do not use our website or services.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                2. Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Personal Information:</strong> When you fill out our contact form, we collect your first name, second name, email address, phone number (optional), organization (optional), and any message you provide.
                </li>
                <li>
                  <strong>Automatically Collected Information:</strong> We may collect information about your device and how you interact with our website, such as your IP address, browser type, pages visited, and the date and time of your visit, using cookies and similar technologies.
                </li>
                <li>
                  <strong>Third-Party Data:</strong> If you interact with us through third-party platforms (e.g., social media), we may collect information provided by those platforms, subject to their privacy policies.
                </li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>To Respond to Your Inquiries:</strong> We use your personal information to respond to your messages and inquiries submitted through our contact form.
                </li>
                <li>
                  <strong>To Send Confirmation Emails:</strong> We send a confirmation email to acknowledge receipt of your message.
                </li>
                <li>
                  <strong>To Improve Our Services:</strong> We analyze automatically collected data to understand how users interact with our website and improve its functionality and content.
                </li>
                <li>
                  <strong>To Communicate with You:</strong> We may use your email address to send updates, newsletters, or promotional materials related to PAAN, but only with your consent where required by law.
                </li>
                <li>
                  <strong>To Comply with Legal Obligations:</strong> We may use your information to comply with applicable laws, regulations, or legal processes.
                </li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                4. How We Share Your Information
              </h2>
              <p>We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>With Service Providers:</strong> We may share your information with trusted third-party service providers (e.g., email service providers) who assist us in operating our website and delivering our services, subject to confidentiality agreements.
                </li>
                <li>
                  <strong>For Legal Reasons:</strong> We may disclose your information if required by law, such as to comply with a subpoena, court order, or other legal process.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If PAAN is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                5. Data Security
              </h2>
              <p>
                We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. This includes using secure servers, encryption, and access controls. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p className="mt-2">
                If you have reason to believe that your interaction with us is no longer secure, please contact us immediately at <a href="mailto:secretariat@paan.africa" className="text-[#F25849] hover:underline">secretariat@paan.africa</a>.
              </p>
            </div>

            {/* Cookies and Tracking */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p>
              We use cookies and similar technologies to enhance your experience on our website, analyze usage, and deliver personalized content. Our website may also function as a Progressive Web App (PWA), which allows you to add it to your device’s home screen for easier access. This feature does not collect additional personal information beyond what is already described in this policy. You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our website.
              </p>            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                7. Your Rights
              </h2>
              <p>
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Access:</strong> You can request access to the personal information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> You can request that we correct any inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Deletion:</strong> You can request that we delete your personal information, subject to certain legal obligations.
                </li>
                <li>
                  <strong>Opt-Out:</strong> You can opt out of receiving marketing communications from us by following the unsubscribe instructions in those emails.
                </li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us at <a href="mailto:secretariat@paan.africa" className="text-[#F25849] hover:underline">secretariat@paan.africa</a>.
              </p>
            </div>

            {/* Third-Party Links */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                8. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third parties. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                9. Children’s Privacy
              </h2>
              <p>
                Our website and services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
              </p>
            </div>

            {/* Changes to This Privacy Policy */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website with a new "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="text-2xl font-medium text-[#172840] mb-4">
                11. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> <a href="mailto:secretariat@paan.africa" className="text-[#F25849] hover:underline">secretariat@paan.africa</a>
              </p>
              <p>
                <strong>Website:</strong> <a href="https://www.paan.africa" className="text-[#F25849] hover:underline">www.paan.africa</a>
              </p>
            </div>
          </section>

          {/* Back to Homepage Button */}
          <div className="text-center mt-12">
            <Link href="/">
              <button className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300">
                Back to Homepage
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default PrivacyPolicy;