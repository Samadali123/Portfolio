import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, ChevronRight, Globe, Bell } from 'lucide-react';

const PrivacyPolicy = () => {


    // Privacy policy sections data  
    const sections = [
        {
            icon: Eye,
            title: "1. Information We Collect",
            content: "We collect information that you provide directly to us, including name, email address, company details, and any project-related information when you use our contact forms or book an appointment. We also automatically collect technical data like IP addresses and browser types to improve our service delivery."
        },
        {
            icon: Shield,
            title: "2. How We Use Your Information",
            content: "Your data is used to provide, maintain, and improve our services, including cloud management, AI automation, and web development. We process your information to communicate with you about projects, provide customer support, and send technical notices or security alerts."
        },
        {
            icon: Lock,
            title: "3. Data Security",
            content: "Nexora Solutions implements industry-standard security measures to protect your personal information. This includes end-to-end encryption for data in transit and strict access controls for our internal infrastructure. However, no method of transmission over the Internet is 100% secure."
        },
        {
            icon: Globe,
            title: "4. Information Sharing",
            content: "We do not sell or rent your personal data to third parties. We may share information with trusted service providers who assist us in operating our platform, provided those parties agree to keep this information confidential and comply with data protection regulations."
        },
        {
            icon: Bell,
            title: "5. Your Rights",
            content: "Depending on your location, you may have the right to access, correct, or delete your personal data. You can opt-out of marketing communications at any time. To exercise these rights, please contact our data protection team at nexora.solution@outlook.com"
        }
    ];

    return (
        <div className="min-h-screen theme-page-bg pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >

                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Privacy <span className="theme-text-secondary">Policy</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        At Nexora Solution, your privacy is our priority. This policy outlines our commitment to transparency and data protection.
                    </p>

                </motion.div>

                {/* Content Section */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-[2rem] p-8 md:p-10 shadow-xl border theme-border-secondary group hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 theme-bg-secondary text-white shadow-lg group-hover:scale-110 transition-transform">
                                    <section.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        {section.title}
                                        <ChevronRight className="w-4 h-4 theme-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Contact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 p-8 rounded-[2rem] theme-bg-secondary text-center text-white shadow-2xl"
                >
                    <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
                    <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                        If you have any questions regarding our privacy practices or data handling, please don't hesitate to reach out.
                    </p>
                    <a
                        href="mailto:nexora.solutions@outlook.com"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-white theme-text-secondary rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg"
                    >
                        Contact Privacy Officer
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
