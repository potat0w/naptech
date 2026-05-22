import { apiRequest } from "./client";
import type { BookingRequest } from "@/lib/auth/bookings-storage";

export async function fetchBookings() {
  return apiRequest<{ bookings: BookingRequest[] }>("/clients/me/bookings", {
    auth: true,
  });
}

export async function createBooking(data: {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  careFor: string;
  preferredDate?: string;
  careNotes?: string;
}) {
  return apiRequest<{ booking: BookingRequest }>("/clients/me/bookings", {
    method: "POST",
    auth: true,
    body: data,
  });
}
