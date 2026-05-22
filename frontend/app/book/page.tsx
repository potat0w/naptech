import BookCareContent from "@/components/BookCareContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a caregiver | Naptec",
  description: "Book a Naptec Care Professional for home care.",
};

export default function BookPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BookCareContent />
    </main>
  );
}
