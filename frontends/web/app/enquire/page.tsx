import EnquireContent from "@/components/EnquireContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquire | Naptec",
  description:
    "Start a care enquiry with Naptec. Complete the form and our team will be in touch shortly.",
};

export default function EnquirePage() {
  return <EnquireContent />;
}
