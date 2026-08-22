import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Swathi Supply Chain Services Pvt. Ltd. collects, uses, shares and protects personal data across swathigroups.com, our quote form and our WhatsApp trip notifications.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy · Swathi Supply Chain Services",
    description:
      "How we collect, use, share and protect personal data across our website, quote form and WhatsApp trip notifications.",
    url: "/privacy",
  },
  robots: { index: true, follow: true },
};

/** Effective date shown in the header and in the closing section. */
const LAST_UPDATED = "22 August 2026";

const toc = [
  { id: "who-we-are", label: "Who we are" },
  { id: "scope", label: "What this policy covers" },
  { id: "what-we-collect", label: "Information we collect" },
  { id: "how-we-use", label: "How we use information" },
  { id: "whatsapp", label: "WhatsApp notifications" },
  { id: "sharing", label: "Who we share it with" },
  { id: "cookies", label: "Cookies and local storage" },
  { id: "retention", label: "How long we keep it" },
  { id: "security", label: "How we protect it" },
  { id: "your-rights", label: "Your rights" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact and grievances" },
];

function Article({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-steel-dark/20 pt-10">
      <h2 className="text-xl leading-snug text-chrome sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-steel">
        {children}
      </div>
    </section>
  );
}

function Term({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-chrome">{children}</span>;
}

function Mail({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="text-cargo underline-offset-4 transition-colors hover:underline"
    >
      {address}
    </a>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Legal pages get a minimal header: the marketing Navbar's links are
          in-page anchors that would be dead on this route. */}
      <header className="sticky top-0 z-50 border-b border-steel-dark/30 bg-asphalt/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 sm:py-4">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-steel transition-colors hover:text-cargo"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back to site
          </Link>
        </div>
      </header>

      <main className="relative px-6 py-16 lg:py-24">
        <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-64 opacity-30" />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cargo">
            <span className="h-px w-8 bg-cargo" />
            Legal
          </span>
          <h1 className="mt-4 text-balance text-3xl leading-[1.1] text-chrome sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-steel">
            This policy explains what personal data Swathi Supply Chain Services
            Pvt. Ltd. collects, why we collect it, who we share it with, and the
            choices you have. We have written it in plain language rather than
            legal boilerplate.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-steel-dark">
            Last updated {LAST_UPDATED}
          </p>

          {/* Contents */}
          <nav
            aria-label="Sections"
            className="mt-12 rounded-3xl border border-steel-dark/30 bg-asphalt-2/50 p-6 sm:p-8"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-chrome">
              Contents
            </h2>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {toc.map((item, i) => (
                <li key={item.id} className="flex gap-3 text-sm">
                  <span className="font-mono text-xs text-steel-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${item.id}`}
                    className="text-steel transition-colors hover:text-cargo"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-14 space-y-10">
            <Article id="who-we-are" title="1. Who we are">
              <p>
                <Term>Swathi Supply Chain Services Pvt. Ltd.</Term> (“Swathi”,
                “we”, “us”) is a road-transport and auto-logistics
                company operating from Tamil Nadu, India. We are the data
                fiduciary responsible for the personal data described here.
              </p>
              <p>
                Registered address: M-420, KG Apartment, Pallanjuragraham,
                Thiruvallur, Tamil Nadu – 602 105, India.
                <br />
                Privacy contact: <Mail address="enquiry@swathigroups.com" />
              </p>
            </Article>

            <Article id="scope" title="2. What this policy covers">
              <p>This policy applies to:</p>
              <ul className="ml-1 space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    the website at <Term>swathigroups.com</Term>, including the quote
                    request form;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    enquiries you send us by email or telephone;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    operational notifications we send to our drivers and transport
                    partners over WhatsApp.
                  </span>
                </li>
              </ul>
              <p>
                Our internal operations platform used by employees and contracted
                partners is covered by a separate agreement and is not addressed by
                this policy.
              </p>
            </Article>

            <Article id="what-we-collect" title="3. Information we collect">
              <p>
                <Term>Quote requests.</Term> When you submit the quote form we
                collect the contact name, company, work email address, phone
                number, origin, destination, the vehicles and monthly volume you
                describe, and any optional notes you add. Every one of these is
                information you choose to type; we do not enrich it from other
                sources.
              </p>
              <p>
                <Term>Direct enquiries.</Term> If you email or call us, we hold
                whatever you send — typically your name, contact details and
                the details of the consignment you are asking about.
              </p>
              <p>
                <Term>Driver and partner contact details.</Term> To run dispatches
                we hold the names, mobile numbers and assignment details of our
                drivers and contracted transport partners. See{" "}
                <a
                  href="#whatsapp"
                  className="text-cargo underline-offset-4 hover:underline"
                >
                  section 5
                </a>
                .
              </p>
              <p>
                <Term>Technical data.</Term> Our hosting provider records standard
                server logs — IP address, browser user-agent, requested page
                and timestamp — for security and reliability. We do not use
                these logs to build a profile of you.
              </p>
              <p>
                <Term>What we do not collect.</Term> We do not ask for payment card
                details on this website, we do not run advertising or analytics
                trackers on it, and we do not buy personal data from third parties.
              </p>
            </Article>

            <Article id="how-we-use" title="4. How we use information">
              <p>We use personal data only to:</p>
              <ul className="ml-1 space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>prepare and send you a dispatch quote, and follow up on it;</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>plan, execute and document consignments we carry for you;</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    tell drivers and partners about trips assigned to them;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    meet our legal, tax and insurance obligations, and resolve
                    disputes;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>keep the website and our systems secure.</span>
                </li>
              </ul>
              <p>
                We do not sell personal data, and we do not use quote-form data for
                unrelated marketing.
              </p>
            </Article>

            <Article id="whatsapp" title="5. WhatsApp notifications">
              <p>
                We use the <Term>WhatsApp Business Platform</Term>, provided by
                Meta, to send operational trip notifications to our drivers and
                contracted transport partners. These are transactional messages
                about work assigned to the recipient — not marketing.
              </p>
              <p>
                A trip notification contains the driver’s name, the trip card
                number, the vehicle number, the trip date, the route, the next
                loading point and the planned distance. Messages are sent only to
                the mobile number the driver or partner has given us for
                operational contact.
              </p>
              <p>
                <Term>Opting out.</Term> A recipient can stop these messages at any
                time by replying <Term>STOP</Term> to the WhatsApp thread. We record
                the opt-out and send no further notifications to that number.
                Because trip details are operational information, opting out may
                mean assignments are communicated by phone instead.
              </p>
              <p>
                Message delivery is carried out by Meta, and their handling of the
                message is governed by the WhatsApp Business Messaging terms and
                Meta’s own privacy policy.
              </p>
            </Article>

            <Article id="sharing" title="6. Who we share it with">
              <p>
                We share personal data only where it is needed to do the job, and
                only with:
              </p>
              <ul className="ml-1 space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    <Term>Web3Forms</Term> — delivers quote-form submissions to
                    our email inbox. The form contents pass through their service.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    <Term>Meta Platforms</Term> — delivers the WhatsApp
                    notifications described above.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    <Term>Our hosting and cloud providers</Term> — run the
                    website and the systems that store dispatch records.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    <Term>Drivers, transport partners and consignees</Term> —
                    receive the delivery details necessary to complete a
                    consignment.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    <Term>Insurers, auditors, advisers and authorities</Term> —
                    where a claim, an audit or the law requires it.
                  </span>
                </li>
              </ul>
              <p>
                Some of these providers operate servers outside India. Where data
                is transferred abroad we rely on the provider’s contractual
                commitments to protect it.
              </p>
            </Article>

            <Article id="cookies" title="7. Cookies and local storage">
              <p>
                This website sets <Term>no advertising or analytics cookies</Term>.
              </p>
              <p>
                We store one preference in your browser’s local storage,{" "}
                <code className="rounded bg-asphalt-3 px-1.5 py-0.5 font-mono text-[0.85em] text-chrome">
                  swathi-theme
                </code>
                , which remembers the colour theme you picked. It stays on your
                device, is never sent to us, and clearing your browser data removes
                it.
              </p>
            </Article>

            <Article id="retention" title="8. How long we keep it">
              <p>
                Quote requests that do not become business are kept for up to{" "}
                <Term>24 months</Term> so we can pick up the conversation if you
                come back, then deleted.
              </p>
              <p>
                Records relating to consignments we actually carried —
                including dispatch, invoicing and insurance records — are kept
                for as long as tax, transport and company law require, which in
                India is generally <Term>eight years</Term>.
              </p>
              <p>
                Opt-out records are kept indefinitely, because that is the only way
                to guarantee we keep honouring the opt-out.
              </p>
            </Article>

            <Article id="security" title="9. How we protect it">
              <p>
                The website is served over HTTPS. Access to dispatch systems is
                restricted to authenticated staff, credentials are held in a managed
                secret store rather than in code, and database backups are encrypted.
              </p>
              <p>
                No system is perfectly secure, and we will not pretend otherwise. If
                a breach affects your personal data we will notify you and the
                relevant authority as the law requires.
              </p>
            </Article>

            <Article id="your-rights" title="10. Your rights">
              <p>
                Under India’s <Term>Digital Personal Data Protection Act, 2023</Term>{" "}
                you may ask us to:
              </p>
              <ul className="ml-1 space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>confirm what personal data of yours we hold, and give you a copy;</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>correct anything inaccurate or incomplete;</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>
                    erase it, where we are not required to keep it for a legal or
                    contractual reason;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>withdraw consent you previously gave;</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cargo" />
                  <span>nominate someone to exercise these rights on your behalf.</span>
                </li>
              </ul>
              <p>
                Write to <Mail address="enquiry@swathigroups.com" /> and we will
                respond within 30 days. We may need to verify your identity first.
              </p>
            </Article>

            <Article id="children" title="11. Children">
              <p>
                Our services are for businesses. We do not knowingly collect
                personal data from anyone under 18. If you believe a child has given
                us personal data, contact us and we will delete it.
              </p>
            </Article>

            <Article id="changes" title="12. Changes to this policy">
              <p>
                We update this policy when our practices change. The date at the top
                always reflects the current version. Material changes affecting how
                we use data you have already given us will be notified directly
                where we hold your contact details.
              </p>
            </Article>

            <Article id="contact" title="13. Contact and grievances">
              <p>
                For any privacy question, request or complaint — including a
                grievance under the Digital Personal Data Protection Act, 2023 —
                contact:
              </p>
              <div className="rounded-2xl border border-steel-dark/30 bg-asphalt-2/50 p-6">
                <p className="text-chrome">Swathi Supply Chain Services Pvt. Ltd.</p>
                <p className="mt-2">
                  M-420, KG Apartment, Pallanjuragraham,
                  <br />
                  Thiruvallur, Tamil Nadu – 602 105, India
                </p>
                <p className="mt-2">
                  Email: <Mail address="enquiry@swathigroups.com" />
                  <br />
                  Phone:{" "}
                  <a
                    href="tel:+919600116086"
                    className="text-cargo underline-offset-4 transition-colors hover:underline"
                  >
                    +91 96001 16086
                  </a>
                </p>
              </div>
              <p>
                If you are not satisfied with our response you may escalate to the
                Data Protection Board of India.
              </p>
            </Article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
