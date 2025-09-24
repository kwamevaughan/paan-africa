import SEO from "@/components/SEO";
import PAANAwardsHeader from "../layouts/paan-awards-header";
import Footer from "@/layouts/footer";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PAANAwardsTermsPage = () => {
  return (
    <>
      <SEO
        title="PAAN Awards Terms & Conditions | Pan-African Creative Awards"
        description="Terms and conditions, eligibility criteria, and guidelines for the PAAN Pan-African Creative Awards 2026."
        keywords="PAAN Awards, terms conditions, eligibility, guidelines, Pan-African Creative Awards, Africa creative economy"
        canonical="https://paan.africa/paan-awards-terms"
      />
      
      <PAANAwardsHeader navLinkColor='text-paan-dark-blue' />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-paan-dark-blue via-paan-dark-blue to-paan-maroon text-white py-40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <Icon icon="mdi:gavel" className="w-16 h-16 mx-auto mb-4 text-paan-yellow" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                  Terms & Conditions
                </h1>
                <p className="text-xl sm:text-2xl text-white/90 mb-2">
                  PAAN Pan-African Creative Awards
                </p>
                <p className="text-lg text-white/80">
                  Awards Guidelines & Eligibility Criteria
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="prose prose-lg max-w-none"
            >
              {/* Introduction */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-blue-50 border-l-4 border-paan-blue p-6 rounded-r-lg">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-4 flex items-center gap-3">
                    <Icon icon="mdi:information" className="w-6 h-6" />
                    Overview
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms & Conditions govern the PAAN Pan-African Creative Awards 2026. 
                    By participating in the Awards, you agree to be bound by these terms and guidelines.
                  </p>
                </div>
              </motion.div>

              {/* Section 1: Eligibility */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Eligibility
                  </h2>
                  <p className="text-gray-700 mb-4">The Awards are open to:</p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Creative, marketing, media, communications, advertising, and technology agencies across Africa.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Freelancers, studios, and creative collectives operating in Africa or working with African markets.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Client organizations that have partnered with agencies or creators on eligible projects.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Projects must have been conceptualized, launched, or executed between January 2024 and December 2025.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Entries must demonstrate impact, innovation, and cross-border potential.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 2: Entry Rules */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Entry Rules
                  </h2>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:file-document" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
                      <span>Each entry must be submitted via the official PAAN Awards portal and accompanied by full entry details, supporting material, and payment of applicable entry fees.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:file-document" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
                      <span>An entry may be submitted in more than one category if relevant; separate fees apply.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:file-document" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
                      <span>Agencies may enter work done for their clients, provided they have obtained written client consent.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:file-document" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
                      <span>Joint entries (agency + client, agency + partner) must be submitted under mutual agreement.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:file-document" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
                      <span>All information submitted must be true, accurate, and not misleading.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 3: Judging */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Judging
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>Entries will be judged by a jury panel of independent experts across creative, marketing, media, technology, and investment fields.</p>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-paan-dark-blue mb-3">Judging criteria will include:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-paan-dark-blue mb-2 flex items-center gap-2">
                            <Icon icon="mdi:lightbulb" className="w-5 h-5 text-yellow-600" />
                            Innovation & Creativity
                          </h4>
                          <p className="text-sm text-gray-600">Originality, cultural relevance, creative execution.</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-paan-dark-blue mb-2 flex items-center gap-2">
                            <Icon icon="mdi:chart-line" className="w-5 h-5 text-green-600" />
                            Impact & Effectiveness
                          </h4>
                          <p className="text-sm text-gray-600">Measurable outcomes (business growth, audience reach, community impact).</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-paan-dark-blue mb-2 flex items-center gap-2">
                            <Icon icon="mdi:earth" className="w-5 h-5 text-blue-600" />
                            Cross-Border Relevance
                          </h4>
                          <p className="text-sm text-gray-600">Potential to scale across African markets.</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-paan-dark-blue mb-2 flex items-center gap-2">
                            <Icon icon="mdi:heart" className="w-5 h-5 text-pink-600" />
                            Sustainability & Inclusion
                          </h4>
                          <p className="text-sm text-gray-600">Alignment with diversity, women/youth empowerment, and responsible practices.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <Icon icon="mdi:alert" className="w-4 h-4 inline mr-2" />
                        <strong>Important:</strong> The jury's decisions are final and binding; no correspondence will be entered into regarding outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 4: Awards & Recognition */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Awards & Recognition
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p>Each winning category will celebrate both the agency/creator and their client/partner where applicable.</p>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-paan-dark-blue mb-3">Winners will receive:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Icon icon="mdi:trophy" className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span>A physical trophy and digital badge.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon icon="mdi:star" className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span>Recognition during the Pan-African Creative Awards Gala at the Summit.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Icon icon="mdi:newspaper" className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span>Inclusion in official PAAN Awards communications, press releases, and publications.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <Icon icon="mdi:information" className="w-4 h-4 inline mr-2" />
                        PAAN reserves the right to withhold an award in any category if the entries do not meet required standards.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 5: Intellectual Property & Confidentiality */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Intellectual Property & Confidentiality
                  </h2>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:shield-check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>By submitting an entry, participants grant PAAN the right to use submitted materials (case studies, visuals, data) for judging, promotional, and archival purposes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:shield-check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Confidential financial or proprietary information will remain private and will not be disclosed without permission.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:shield-check" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Entrants confirm that they have secured all rights, licenses, and permissions for submitted content (images, music, logos, client materials).</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 6: Fees & Payments */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
                    Fees & Payments
                  </h2>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:credit-card" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>All entries must be accompanied by full payment before the judging process begins.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:credit-card" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Entry fees are non-refundable, except in cases where PAAN cancels a category.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:credit-card" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Payment must be made via the official payment methods listed on the entry portal.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 7: Disqualification */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</span>
                    Disqualification
                  </h2>
                  <p className="text-gray-700 mb-4">PAAN reserves the right to disqualify entries that:</p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:alert-circle" className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Provide false or misleading information.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:alert-circle" className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Fail to comply with deadlines, formats, or payment requirements.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:alert-circle" className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Infringe on intellectual property rights or third-party permissions.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 8: Awards Ceremony */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">8</span>
                    Awards Ceremony
                  </h2>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:calendar" className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>The Awards Gala will take place on Day 2 (evening) of the Africa Borderless Creative Economy Summit 2026 in Nairobi, Kenya.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:calendar" className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Winners must be present or represented at the ceremony to collect awards.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:calendar" className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>PAAN will not cover travel or accommodation costs for nominees, unless otherwise agreed under sponsorship arrangements.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 9: General Provisions */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-paan-dark-blue mb-6 flex items-center gap-3">
                    <span className="bg-paan-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">9</span>
                    General Provisions
                  </h2>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:gavel" className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span>PAAN reserves the right to amend categories, rules, or processes at its discretion, with prior notice to entrants.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:gavel" className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span>Participation in the Awards implies acceptance of these Terms & Conditions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:gavel" className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span>In case of disputes, PAAN's decision shall be final.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-gradient-to-r from-paan-dark-blue to-paan-maroon text-white rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Icon icon="mdi:email" className="w-6 h-6" />
                    Questions or Clarifications?
                  </h2>
                  <p className="text-white/90 mb-4">
                    If you have any questions about these Terms & Conditions or need clarification on any aspect of the PAAN Awards, please don't hesitate to contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="mailto:secretariat@paan.africa"
                      className="bg-paan-red hover:bg-paan-red/90 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Icon icon="mdi:email" className="w-5 h-5" />
                      Contact Secretariat
                    </a>
                    <a 
                      href="/paan-awards"
                      className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Icon icon="mdi:arrow-left" className="w-5 h-5" />
                      Back to Awards
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default PAANAwardsTermsPage;
