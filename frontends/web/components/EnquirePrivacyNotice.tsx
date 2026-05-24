import { naptecContact } from "@/lib/contact";

type EnquirePrivacyNoticeProps = {
  id?: string;
  className?: string;
};

export default function EnquirePrivacyNotice({
  id = "privacy-notice",
  className = "",
}: EnquirePrivacyNoticeProps) {
  return (
    <div
      id={id}
      className={`scroll-mt-28 rounded-2xl border border-surface-card/80 bg-surface-alt/40 px-3.5 py-3.5 text-xs leading-relaxed text-body sm:px-4 sm:text-sm ${className}`}
    >
      <p className="font-medium text-neutral-900">Privacy notice</p>

      <p className="mt-2">
        {naptecContact.companyName} (&quot;Naptec Care&quot;, &quot;we&quot;,
        &quot;us&quot;) is the data controller for personal information you
        provide through this enquiry form.
      </p>

      <p className="mt-2">
        <strong className="font-medium text-neutral-900">What we collect:</strong>{" "}
        your name, phone number, email address, and any message you submit.
      </p>

      <p className="mt-2">
        <strong className="font-medium text-neutral-900">Why we use it:</strong>{" "}
        to respond to your enquiry, discuss care options, and arrange next steps
        if requested.
      </p>

      <p className="mt-2">
        <strong className="font-medium text-neutral-900">Legal basis:</strong>{" "}
        our legitimate interests in handling and responding to care enquiries.
      </p>

      <p className="mt-2">
        <strong className="font-medium text-neutral-900">Retention:</strong> we
        keep enquiry records only for as long as necessary to respond to your
        request and meet any legal or regulatory requirements.
      </p>

      <p className="mt-2">
        <strong className="font-medium text-neutral-900">Your rights:</strong> you
        may request access, correction, or deletion of your data, or object to
        certain processing, by contacting us at{" "}
        <a
          href={`mailto:${naptecContact.email}`}
          className="font-medium text-brand underline underline-offset-2 transition-colors hover:text-brand-dark"
        >
          {naptecContact.email}
        </a>
        .
      </p>

      <p className="mt-2">
        We do not sell or use your data for marketing purposes.
      </p>

      <p className="mt-3 text-muted">
        By submitting this form, you confirm that you understand this privacy
        notice and agree to us using your information to respond to your enquiry.
      </p>
    </div>
  );
}
