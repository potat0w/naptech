import RecruitmentApplyForm from "@/components/RecruitmentApplyForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | Care Professional Recruitment | Naptec",
  description:
    "Apply to join Naptec as a Care Professional. Share your details and our recruitment team will be in touch.",
};

export default function RecruitmentApplyPage() {
  return (
    <main className="flex-1">
      <RecruitmentApplyForm />
    </main>
  );
}
