import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";

const ThankYouPage = () => {
  return (
    <>
      <SEO
        title="Thank You | Pan-African Agency Network (PAAN)"
        description="Thank you for contacting the Pan-African Agency Network (PAAN). We have received your message and will get back to you soon."
        keywords="PAAN, thank you, contact, Pan-African Agency Network"
        noindex={true} // Add noindex prop
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center px-4 py-16 mt-20">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-semibold text-[#172840] mb-4">
              Thank You for Reaching Out!
            </h1>
            <p className="text-gray-600 mb-6">
              We have received your message and will get back to you soon. In
              the meantime, feel free to explore more about PAAN or return to
              the homepage.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <button className="bg-[#F25849] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D6473C] transition duration-300">
                  Back to Homepage
                </button>
              </Link>
              <Link href="/#join-network">
                <button className="bg-[#172840] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#6FA1B7] transition duration-300">
                  Join the Network
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ThankYouPage;
