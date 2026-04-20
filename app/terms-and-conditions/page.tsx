export default function TermsAndConditionsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using Apeo (powered by Pinaka Infra), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.",
    },
    {
      id: "service",
      title: "2. Service Description",
      content:
        "Apeo provides smart QR-based vehicle and pet identification tags that allow third parties to contact the registered owner by scanning the QR code — without requiring any app. Our services include:",
      list: [
        "QR tag generation and management",
        "Owner contact enablement via QR scan",
        "Dashboard access for managing your tag and profile",
        "Order and delivery of physical QR tags",
      ],
    },
    {
      id: "usage",
      title: "3. Acceptable Use",
      content:
        "You agree to use our services only for lawful purposes. You must not misuse our platform in any way, including but not limited to:",
      list: [
        "Providing false or misleading registration information",
        "Using the service to harass, spam, or harm others",
        "Attempting to gain unauthorized access to any part of our system",
        "Reselling or reproducing our QR tags without written permission",
      ],
    },
    {
      id: "payments",
      title: "4. Payments",
      content:
        "All payments are processed securely through Razorpay. By making a purchase, you agree to the following:",
      list: [
        "All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes",
        "Payment must be completed before your order is processed",
        "We reserve the right to change pricing at any time without prior notice",
        "Pinaka Infra is not responsible for any bank charges or transaction fees imposed by your payment provider",
      ],
    },
    {
      id: "refunds",
      title: "5. Refunds & Cancellations",
      content:
        "All sales made on Apio are final. Please read our refund policy carefully before making a purchase:",
      list: [
        "No refunds will be issued once payment has been successfully completed",
        "No refunds will be issued once the product has been dispatched or delivered",
        "Orders cannot be cancelled after payment confirmation",
        "In case of a damaged or defective tag received, we will offer a free replacement upon verification — this is not a refund",
        "For replacement requests, contact us at info@pinakainfra.in within 48 hours of delivery with photos of the damaged product",
      ],
    },
    {
      id: "liability",
      title: "6. Limitation of Liability",
      content:
        "To the maximum extent permitted by applicable law, Pinaka Infra shall not be liable for:",
      list: [
        "Any indirect, incidental, or consequential damages arising from use of our service",
        "Loss of data, revenue, or business resulting from service interruptions",
        "Actions taken by third parties who scan your QR tag",
        "Delays in delivery caused by courier partners or unforeseen circumstances",
      ],
    },
    {
      id: "termination",
      title: "7. Termination",
      content:
        "We reserve the right to suspend or terminate your account and access to our services at our sole discretion, without notice, if we believe you have violated these Terms & Conditions. Upon termination, your right to use the service will immediately cease.",
    },
    {
      id: "changes",
      title: "8. Changes to Terms",
      content:
        "Pinaka Infra reserves the right to update or modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this page. Continued use of our services after any changes constitutes your acceptance of the new terms.",
    },
    {
      id: "governing",
      title: "9. Governing Law",
      content:
        "These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts located in Panchkula, Haryana.",
    },
    {
      id: "contact",
      title: "10. Contact Us",
      content:
        "If you have any questions about these Terms & Conditions, please contact us:",
      contact: true,
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

          <h1 className="text-3xl font-bold text-white mb-3">Terms & Conditions</h1>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed">
            Please read these Terms & Conditions carefully before using Apeo services
            operated by Pinaka Infra. These terms govern your access to and use of our platform.
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