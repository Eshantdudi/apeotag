export default function PrivacyPolicyPage() {


  const sections = [
    {
      id: "information",
      title: "1. Information We Collect",
      content: "We may collect the following information when you use our services:",
      list: [
        "Name, phone number, and email address",
        "Vehicle or pet details (if provided by you)",
        "Payment information (processed securely via Razorpay)",
        "Basic usage data such as browser type, device, and IP address",
      ],
    },
    {
      id: "usage",
      title: "2. How We Use Your Information",
      content: "We use the information collected to:",
      list: [
        "Provide and manage your QR tag services",
        "Enable contact via QR scan",
        "Process payments securely",
        "Improve our services and overall user experience",
      ],
    },
    {
      id: "sharing",
      title: "3. Data Sharing",
      content:
        "We do not sell or rent your personal data to any third parties. Your information may only be shared in the following circumstances:",
      list: [
        "With payment providers (e.g., Razorpay) solely for processing transactions",
        "When required by applicable law or government authorities",
      ],
    },
    {
      id: "security",
      title: "4. Data Security",
      content:
        "We take reasonable technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse. However, no system or transmission over the internet is 100% secure.",
    },
    {
      id: "control",
      title: "5. Your Control",
      content:
        "You have the right to access, update, or request deletion of your personal information at any time. To exercise these rights, please contact us using the details provided below.",
    },
    {
      id: "cookies",
      title: "6. Cookies",
      content:
        "We may use cookies and similar tracking technologies to enhance website performance and improve your browsing experience. You can control cookie settings through your browser preferences.",
    },
    {
      id: "third-party",
      title: "7. Third-Party Links",
      content:
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites and encourage you to review their respective privacy policies.",
    },
    {
      id: "contact",
      title: "8. Contact Us",
      content:
        "If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:",
      contact: true,
    },
    {
      id: "company",
      title: "9. Company Information",
      content:
        "Apeo is a product operated by Pinaka Infra, registered at Office 3, Plot No. 9, Sector 22, Panchkula, Haryana — 134109, India.",
    },
  ];

  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" stroke="white" strokeWidth="1.5" />
                <path d="M5 8h6M8 5v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-widest text-white">Apeo</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed">
            Welcome to Apeo, powered by Pinaka Infra. Your privacy is important to us. This
            Privacy Policy explains how we collect, use, and protect your information when you use
            our services.
          </p>
        </div>

        <hr className="border-gray-800 mb-10" />

        {/* Table of Contents */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">
            Table of Contents
          </p>
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-2"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M4 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.id} id={s.id}>
              <h2 className="text-base font-semibold text-white mb-3">{s.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{s.content}</p>

              {s.list && (
                <ul className="mt-3 space-y-2">
                  {s.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {s.contact && (
                <div className="mt-4 space-y-2">
                  <a
                    href="mailto:info@pinakainfra.in"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    info@pinakainfra.in
                  </a>
                  <a
                    href="tel:+918146444549"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 2.5C2 2.5 3 1 4.5 1c.5 0 1 .5 1.5 1.5L7 4.5c.3.6.1 1.3-.4 1.7l-.6.5c.4.8 1.3 1.7 2.1 2.1l.5-.6c.4-.5 1.1-.7 1.7-.4l2 1c1 .5 1.5 1 1.5 1.5C13.8 11 12.5 13 11 13 6 13 1 8 1 3 1 1.5 2 2.5 2 2.5z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    +91 81464 44549
                  </a>
                </div>
              )}

              <hr className="border-gray-800 mt-8" />
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-xs mt-10 text-center">
          © {new Date().getFullYear()} Apeo. All Rights Reserved. Powered by Pinaka Infra.
        </p>
      </div>
    </div>
  );
}
