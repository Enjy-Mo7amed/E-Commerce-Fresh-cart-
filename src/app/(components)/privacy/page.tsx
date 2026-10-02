import Link from 'next/link'
import { FaArrowLeft, FaClock, FaCookie, FaDatabase, FaEnvelope, FaLock, FaShieldAlt, FaUserCheck, FaUserShield } from 'react-icons/fa'
import { FaShareNodes, FaShieldHalved } from 'react-icons/fa6'

export default function Privacy() {
    return (
        <>
            <title>Privacy</title>
            <div className="bg-linear-to-br from-[#5b3d29]  via-[#7f5539a6] to-[#7f5539c1] text-white">
                <div className="container mx-auto px-4 py-10 sm:py-14">
                    <nav className='flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
                        <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                        <span className='text-white/40'>/</span>
                        <span className='text-white font-medium'>Privacy Policy</span>
                    </nav>
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
                            <FaShieldAlt className='text-2xl text-white' />
                        </div>
                        <div>
                            <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>Privacy Policy</h1>
                            <p className='text-white/80 mt-1'>Last updated: February 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-12">
                <div className="bg-linear-to-r from-[#7f553969] to-[#7f553969] border border-amber-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#7f553969] flex items-center justify-center shrink-0 shadow-lg shadow-[#7f553969]">
                            <FaShieldHalved className='text-xl text-white' />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-[#5b3d29] mb-2">
                                Your Privacy Matters
                            </h2>

                            <p className="text-[#5b3d29b6] leading-relaxed">
                                This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services. We are committed to ensuring that your privacy is protected.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-[#7f553969] flex items-center justify-center shrink-0 group-hover:from-[#7f553969] group-hover:to-[#7f5539] transition-all duration-300">
                                <FaDatabase className='text-xl text-[#7f5539] group-hover:text-white transition-colors duration-300' />
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#7f5539] uppercase tracking-wider">
                                    Article 1
                                </span>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Information We Collect
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    1.1
                                </span>

                                <p className="text-sm">
                                    <strong className="text-gray-800">Personal Data: </strong>
                                    Name, email address, phone number, and shipping address.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    1.2
                                </span>

                                <p className="text-sm">
                                    <strong className="text-gray-800">Payment Data: </strong>
                                    Credit card information processed securely through our payment providers.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    1.3
                                </span>

                                <p className="text-sm">
                                    <strong className="text-gray-800">Technical Data: </strong>
                                    IP address, browser type, device information, and access times.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    1.4
                                </span>

                                <p className="text-sm">
                                    <strong className="text-gray-800">Usage Data: </strong>
                                    Pages viewed, products browsed, and actions taken within our platform.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-[#7f553969] flex items-center justify-center shrink-0 group-hover:from-[#7f553969] group-hover:to-[#7f5539] transition-all duration-300">
                                <FaUserShield className='text-xl text-[#7f5539] group-hover:text-white transition-colors duration-300' />
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#7f5539] uppercase tracking-wider">
                                    Article 2
                                </span>

                                <h2 className="text-xl font-bold text-gray-900">
                                    How We Use Your Information
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    2.1
                                </span>
                                <p className="text-sm">To process and fulfill your orders.</p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    2.2
                                </span>
                                <p className="text-sm">
                                    To send order confirmations and shipping updates.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    2.3
                                </span>
                                <p className="text-sm">
                                    To provide customer support and respond to inquiries.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    2.4
                                </span>
                                <p className="text-sm">
                                    To improve our products, services, and user experience.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    2.5
                                </span>
                                <p className="text-sm">
                                    To send promotional communications (with your consent).
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-[#7f553969] flex items-center justify-center shrink-0 group-hover:from-[#7f553969] group-hover:to-[#7f5539] transition-all duration-300">
                                <FaLock className='text-xl text-[#7f5539] group-hover:text-white transition-colors duration-300' />
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#7f5539] uppercase tracking-wider">
                                    Article 3
                                </span>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Data Protection
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    3.1
                                </span>
                                <p className="text-sm">
                                    We implement industry-standard encryption (SSL/TLS) for all data transfers.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    3.2
                                </span>
                                <p className="text-sm">
                                    Payment information is processed by PCI-compliant payment providers.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    3.3
                                </span>
                                <p className="text-sm">
                                    We conduct regular security audits and vulnerability assessments.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    3.4
                                </span>
                                <p className="text-sm">
                                    Access to personal data is restricted to authorized personnel only.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-[#7f553969] flex items-center justify-center shrink-0 group-hover:from-[#7f553969] group-hover:to-[#7f5539] transition-all duration-300">
                                <FaShareNodes className='text-xl text-[#7f5539] group-hover:text-white transition-colors duration-300' />
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#7f5539] uppercase tracking-wider">
                                    Article 4
                                </span>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Information Sharing
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    4.1
                                </span>
                                <p className="text-sm">
                                    We do not sell, trade, or rent your personal information to third parties.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    4.2
                                </span>
                                <p className="text-sm">
                                    We may share data with trusted service providers who assist in our operations.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    4.3
                                </span>
                                <p className="text-sm">
                                    We may disclose information when required by law or to protect our rights.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-[#7f553969] flex items-center justify-center shrink-0 group-hover:from-[#7f553969] group-hover:to-[#7f5539] transition-all duration-300">
                                <FaUserCheck className='text-xl text-[#7f5539] group-hover:text-white transition-colors duration-300' />
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#7f5539] uppercase tracking-wider">
                                    Article 5
                                </span>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Your Rights
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    5.1
                                </span>
                                <p className="text-sm">
                                    <strong className="text-gray-800">Access: </strong>
                                    Request a copy of your personal data.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    5.2
                                </span>
                                <p className="text-sm">
                                    <strong className="text-gray-800">Rectification: </strong>
                                    Request correction of inaccurate data.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    5.3
                                </span>
                                <p className="text-sm">
                                    <strong className="text-gray-800">Erasure: </strong>
                                    Request deletion of your personal data.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    5.4
                                </span>
                                <p className="text-sm">
                                    <strong className="text-gray-800">Portability: </strong>
                                    Request your data in a portable format.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    5.5
                                </span>
                                <p className="text-sm">
                                    <strong className="text-gray-800">Opt-out: </strong>
                                    Unsubscribe from marketing communications at any time.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-[#7f553969] flex items-center justify-center shrink-0 group-hover:from-[#7f553969] group-hover:to-[#7f5539] transition-all duration-300">
                                <FaCookie className='text-xl text-[#7f5539] group-hover:text-white transition-colors duration-300' />
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#7f5539] uppercase tracking-wider">
                                    Article 6
                                </span>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Cookies
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    6.1
                                </span>
                                <p className="text-sm">
                                    We use cookies to enhance your browsing experience and remember preferences.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    6.2
                                </span>
                                <p className="text-sm">
                                    You can control cookie settings through your browser preferences.
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <span className="text-xs font-bold text-[#7f553969] bg-[#7f553969] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                                    6.3
                                </span>
                                <p className="text-sm">
                                    Disabling cookies may affect the functionality of certain features.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-[#7f553969] flex items-center justify-center shrink-0 group-hover:from-[#7f553969] group-hover:to-[#7f5539] transition-all duration-300">
                                <FaClock className='text-xl text-[#7f5539] group-hover:text-white transition-colors duration-300' />
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#7f5539] uppercase tracking-wider">
                                    Article 7
                                </span>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Data Retention
                                </h2>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.
                        </p>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-[#7f553969] flex items-center justify-center shrink-0 group-hover:from-[#7f553969] group-hover:to-[#7f5539] transition-all duration-300">
                                <FaEnvelope className='text-xl text-[#7f5539] group-hover:text-white transition-colors duration-300' />
                            </div>

                            <div>
                                <span className="text-xs font-bold text-[#7f5539] uppercase tracking-wider">
                                    Article 8
                                </span>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Contact Us
                                </h2>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at{" "}
                            <Link
                                href="mailto:privacy@freshcart.com"
                                className="text-[#7f5539] hover:text-primary-700 font-semibold hover:underline"
                            >
                                privacy@freshcart.com
                            </Link>
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Link
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-all duration-200"
                            href="/"
                        >
                            <FaArrowLeft className='text-sm' />
                            Back to Home
                        </Link>

                        <Link
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7f553969] text-white hover:bg-[#7f5539] font-medium shadow-lg shadow-[#7f553969] transition-all duration-200"
                            href="/terms"
                        >
                            View Terms of Service
                            <span className="text-lg">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
