import Link from "next/link";

export default function page() {
    return (
        <main className="max-w-3xl mx-auto p-6 space-y-6 text-[var(--off-black)]">
            <h1 className="text-3xl font-semibold text-center text-[var(--brown-500)]">Privacy Policy</h1>
            <p className="text-sm text-center">Effective Date: Januray 8, 2025</p>
            <p className="opacity-90">
                At <strong>Unfinished Pages</strong>, accessible from{' '}
                <Link href="https://www.unfinishedpages.com" className="text-blue-500 hover:underline">
                    www.unfinishedpages.com
                </Link>
                , your privacy is one of our main priorities. This Privacy Policy document outlines the types of information we
                collect and how we use it. By using our website, you consent to the terms outlined in this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p className="opacity-90">We may collect personal and non-personal information from you when you visit our site, including:</p>
            <ul className="list-inside list-disc opacity-90 space-y-2">
                <li>
                    <strong>Personal Information:</strong> Information you voluntarily provide, such as your name, email address, or
                    other contact details (e.g., through contact forms or newsletter subscriptions).
                </li>
                <li>
                    <strong>Non-Personal Information:</strong> Data automatically collected, such as:
                    <ul className="list-inside list-disc opacity-90 space-y-1">
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device type</li>
                        <li>Pages visited and time spent on the site</li>
                        <li>Referring/exit pages</li>
                    </ul>
                </li>
            </ul>
            <p className="opacity-90">
                This data is collected through Google Analytics to improve our website&apos;s functionality and user experience.
            </p>

            <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            <p className="opacity-90">We use the collected data for the following purposes:</p>
            <ul className="list-inside list-disc opacity-90 space-y-2">
                <li>To monitor and analyze website performance and traffic</li>
                <li>To improve website content and user experience</li>
                <li>To communicate with you (if you’ve provided contact information)</li>
                <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold">3. Cookies and Tracking Technologies</h2>
            <p className="opacity-90">We use cookies and similar tracking technologies to:</p>
            <ul className="list-inside list-disc opacity-90 space-y-2">
                <li>Analyze site traffic using Google Analytics</li>
                <li>Remember user preferences for a better experience</li>
            </ul>
            <p className="opacity-90">
                You can manage cookies through your browser settings or opt out of Google Analytics tracking by using the{' '}
                <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    Google Analytics Opt-out Browser Add-on
                </a>.
            </p>

            <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>
            <p className="opacity-90">
                We do not sell, trade, or rent your personal information to others. However, we may share information with:
            </p>
            <ul className="list-inside list-disc opacity-90 space-y-2">
                <li>
                    <strong>Google Analytics:</strong> To analyze website traffic and improve user experience. For more details, see{' '}
                    <a
                        href="https://policies.google.com/technologies/partner-sites"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        How Google uses data
                    </a>.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
            <p className="opacity-90">
                We may use third-party services to enhance our website. These services may collect, store, and use your information
                according to their own privacy policies. For example:
            </p>
            <ul className="list-inside list-disc opacity-90 space-y-2">
                <li>Google Analytics</li>
            </ul>
            <p className="opacity-90">We encourage you to review the privacy policies of these third-party services.</p>

            <h2 className="text-2xl font-semibold">6. Your Privacy Rights</h2>
            <p className="opacity-90">Depending on your location, you may have the following rights:</p>
            <ul className="list-inside list-disc opacity-90 space-y-2">
                <li>
                    <strong>Access:</strong> Request a copy of the data we have collected about you.
                </li>
                <li>
                    <strong>Correction:</strong> Ask us to correct or update your personal information.
                </li>
                <li>
                    <strong>Deletion:</strong> Request the deletion of your personal information.
                </li>
                <li>
                    <strong>Opt-out:</strong> Decline non-essential cookies or data collection.
                </li>
            </ul>
            <p className="opacity-90">To exercise these rights, please contact us at customer.team@unfinishedpages.com.</p>

            <h2 className="text-2xl font-semibold">7. California Privacy Rights (CCPA)</h2>
            <p>If you are a California resident, you have the right to:</p>
            <ul className="list-inside list-disc opacity-90 space-y-2">
                <li>Request details about the personal information we collect.</li>
                <li>Opt-out of the sale of personal data (even though we don’t sell data).</li>
            </ul>

            <h2 className="text-2xl font-semibold">8. Data Security</h2>
            <p className="opacity-90">
                We implement reasonable security measures to protect your data. However, no method of transmission over the internet
                or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold">9. Changes to This Privacy Policy</h2>
            <p className="opacity-90">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Effective
                Date."
            </p>

            <h2 className="text-2xl font-semibold">10. Contact Us</h2>
            <p className="opacity-90">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
                <br />
                customer.team@unfinishedpages.com
            </p>

            <p className="opacity-90 text-sm text-center">
                <strong>Last Updated:</strong> Januray 8, 2025
            </p>
        </main>
    )
}
