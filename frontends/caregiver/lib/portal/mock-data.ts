import type {
  ActivityItem,
  Assignment,
  Caregiver,
  CareReport,
  Inquiry,
} from "@/lib/portal/types";

export const caregivers: Caregiver[] = [
  {
    id: "cg-1",
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@naptec.care",
    phone: "07700 900101",
    status: "active",
    activeAssignments: 3,
    completedReports: 42,
  },
  {
    id: "cg-2",
    firstName: "James",
    lastName: "Okonkwo",
    email: "james.okonkwo@naptec.care",
    phone: "07700 900102",
    status: "active",
    activeAssignments: 2,
    completedReports: 38,
  },
  {
    id: "cg-3",
    firstName: "Emma",
    lastName: "Patel",
    email: "emma.patel@naptec.care",
    phone: "07700 900103",
    status: "active",
    activeAssignments: 4,
    completedReports: 51,
  },
  {
    id: "cg-4",
    firstName: "David",
    lastName: "Hughes",
    email: "david.hughes@naptec.care",
    phone: "07700 900104",
    status: "inactive",
    activeAssignments: 0,
    completedReports: 29,
  },
];

export const assignments: Assignment[] = [
  {
    id: "as-1",
    caregiverId: "cg-1",
    caregiverName: "Sarah Mitchell",
    clientName: "Margaret Walsh",
    address: "14 Oak Lane, Manchester M20 3AB",
    date: "2026-05-16",
    shiftStart: "08:00",
    shiftEnd: "12:00",
    tasks: ["Medication reminder", "Personal care", "Mobility support"],
    priority: "high",
    status: "in_progress",
  },
  {
    id: "as-2",
    caregiverId: "cg-1",
    caregiverName: "Sarah Mitchell",
    clientName: "Harold Bennett",
    address: "8 Willow Court, Stockport SK4 2LP",
    date: "2026-05-16",
    shiftStart: "14:00",
    shiftEnd: "18:00",
    tasks: ["Meal preparation", "Companionship", "Hydration monitoring"],
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "as-3",
    caregiverId: "cg-1",
    caregiverName: "Sarah Mitchell",
    clientName: "Dorothy Evans",
    address: "22 Meadow Rise, Altrincham WA15 7QH",
    date: "2026-05-17",
    shiftStart: "09:00",
    shiftEnd: "13:00",
    tasks: ["Morning routine", "Light housekeeping", "Vital signs check"],
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "as-4",
    caregiverId: "cg-1",
    caregiverName: "Sarah Mitchell",
    clientName: "Arthur Cole",
    address: "5 Birch Street, Sale M33 5RT",
    date: "2026-05-15",
    shiftStart: "10:00",
    shiftEnd: "14:00",
    tasks: ["Medication administration", "Walking assistance"],
    priority: "high",
    status: "pending_report",
  },
  {
    id: "as-5",
    caregiverId: "cg-2",
    caregiverName: "James Okonkwo",
    clientName: "Irene Foster",
    address: "31 Park View, Cheadle SK8 1AA",
    date: "2026-05-16",
    shiftStart: "07:30",
    shiftEnd: "11:30",
    tasks: ["Breakfast support", "Medication", "Toileting assistance"],
    priority: "high",
    status: "in_progress",
  },
];

export const reports: CareReport[] = [
  {
    id: "rp-1",
    assignmentId: "as-6",
    caregiverId: "cg-1",
    caregiverName: "Sarah Mitchell",
    clientName: "Margaret Walsh",
    submittedAt: "2026-05-15T12:40:00",
    rawNotes: "gave medicine at 8am patient ate lunch helped walking blood pressure normal",
    organizedReport:
      "Clinical Summary\nCare visit activities documented: gave medicine at 8am; patient ate lunch; helped with walking; blood pressure normal.\n\nTimeline\n1. Gave medicine at 8am.\n2. Patient ate lunch.\n3. Helped with walking.\n4. Blood pressure normal.",
    status: "submitted",
    preview: "Medication administered at 8:00 AM. Patient completed lunch successfully.",
  },
  {
    id: "rp-2",
    assignmentId: "as-7",
    caregiverId: "cg-2",
    caregiverName: "James Okonkwo",
    clientName: "Irene Foster",
    submittedAt: "2026-05-14T11:20:00",
    rawNotes: "breakfast eaten meds taken shower completed mood calm",
    organizedReport:
      "Clinical Summary\nCare visit activities documented: breakfast eaten; meds taken; shower completed; mood calm.\n\nTimeline\n1. Breakfast eaten.\n2. Meds taken.\n3. Shower completed.\n4. Mood calm.",
    status: "reviewed",
    preview: "Breakfast and medication completed. Personal care provided. Patient calm.",
  },
  {
    id: "rp-3",
    assignmentId: "as-4",
    caregiverId: "cg-1",
    caregiverName: "Sarah Mitchell",
    clientName: "Arthur Cole",
    submittedAt: "2026-05-15T14:05:00",
    rawNotes: "walked in garden helped with lunch",
    organizedReport:
      "Clinical Summary\nCare visit activities documented: walked in garden; helped with lunch.\n\nTimeline\n1. Walked in garden.\n2. Helped with lunch.",
    status: "pending",
    preview: "Garden walk and lunch support provided.",
  },
];

export const inquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "Helen Richardson",
    email: "helen.richardson@email.com",
    subject: "Evening care availability",
    message:
      "We are looking for evening domiciliary support for my mother in Stockport, 4–5 evenings per week. Could you advise on availability and typical costs?",
    date: "2026-05-15",
  },
  {
    id: "inq-2",
    name: "Mark Thompson",
    email: "mark.thompson@email.com",
    subject: "Dementia specialist care",
    message:
      "My father has early-stage dementia and lives alone. Do you offer specialist caregivers and how do you match staff to clients?",
    date: "2026-05-14",
  },
  {
    id: "inq-3",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    subject: "Respite care enquiry",
    message:
      "We need two weeks of respite cover in June while we are on holiday. Is short-term cover something Naptec can arrange?",
    date: "2026-05-13",
  },
  {
    id: "inq-4",
    name: "Robert Clarke",
    email: "robert.clarke@email.com",
    subject: "Live-in care options",
    message:
      "Interested in learning more about live-in care packages for my aunt in Altrincham. Please contact me to discuss.",
    date: "2026-05-12",
  },
];

export const recentActivities: ActivityItem[] = [
  {
    id: "act-1",
    message: "Sarah Mitchell submitted a report for Margaret Walsh",
    time: "2 hours ago",
    type: "report",
  },
  {
    id: "act-2",
    message: "New assignment created for James Okonkwo — Irene Foster",
    time: "4 hours ago",
    type: "assignment",
  },
  {
    id: "act-3",
    message: "Emma Patel marked visit complete for Dorothy Evans",
    time: "Yesterday",
    type: "caregiver",
  },
  {
    id: "act-4",
    message: "Report pending review — Arthur Cole",
    time: "Yesterday",
    type: "report",
  },
];

export const DEMO_CAREGIVER_ID = "cg-1";
