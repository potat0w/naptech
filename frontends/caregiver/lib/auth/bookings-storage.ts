export type BookingRequest = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  careFor: "loved-one" | "me";
  preferredDate: string;
  careNotes: string;
  createdAt: string;
  status: "pending" | "matched";
};

const BOOKINGS_KEY = "naptec_booking_requests";

export function readBookings(): BookingRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BookingRequest[];
  } catch {
    return [];
  }
}

export function readBookingsForUser(userId: string): BookingRequest[] {
  return readBookings()
    .filter((b) => b.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addBooking(booking: BookingRequest) {
  const all = readBookings();
  all.unshift(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
}
