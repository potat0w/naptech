import type { ServicePage } from "@/lib/services";

export const dementiaCare: ServicePage = {
  slug: "dementia-and-alzheimers",
  title: "Dementia Care at Home",
  shortTitle: "Dementia Care",
  category: "specialist",
  parentLabel: "Specialist Care",
  parentHref: "/what-we-do/specialist-care",
  metaTitle: "Dementia Care at Home | Naptec – Croydon",
  metaDescription:
    "Specialist dementia and Alzheimer's care at home in Croydon. Trained caregivers, familiar routines, and personalised support for families.",
  intro:
    "Dementia care at home helps your loved one stay safe, comfortable, and connected in familiar surroundings across Croydon. Our trained caregivers understand memory loss, changing behaviour, and the reassurance families need day to day.",
  description:
    "Dementia and Alzheimer's care at home from Naptec. Person-centred support in Croydon.",
  relatedSlugs: [
    "live-in-care",
    "overnight-care",
    "companionship",
    "respite-care",
    "personal-care",
  ],
  sections: [
    {
      heading: "What is dementia care at home?",
      paragraphs: [
        "Dementia care at home is professional support for people living with dementia or Alzheimer's, delivered in their own home. It can include companionship, personal care, medication reminders, meal support, and help maintaining daily routines that reduce confusion and anxiety.",
        "Staying at home often helps people with dementia feel calmer because surroundings, neighbours, and daily habits stay familiar. Naptec builds care around the individual — not a generic checklist — so support reflects their personality, preferences, and stage of memory loss.",
      ],
      bullets: [
        "Person-centred care plans reviewed regularly",
        "Caregivers trained in dementia-aware communication",
        "Support with nutrition, hydration, and personal care",
        "Companionship to reduce isolation and agitation",
        "Overnight and live-in options when needs increase",
        "Respite care so family carers can rest",
      ],
      image:
        "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
      imageAlt: "Dementia care at home with a compassionate caregiver",
    },
    {
      heading: "How Naptec supports people living with dementia",
      paragraphs: [
        "We match caregivers based on personality, interests, and experience supporting memory conditions. Consistent faces help build trust, which matters when someone may not always recognise a visitor at first.",
        "Our team focuses on dignity, patience, and safety — from prompting daily tasks to spotting changes that families should know about. We work alongside GPs, district nurses, and families so care stays coordinated as needs evolve.",
      ],
      image:
        "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
      imageAlt: "Caregiver providing elderly dementia care at home",
      discoverMore: { href: "/how-it-works" },
    },
    {
      heading: "When should families consider dementia home care?",
      paragraphs: [
        "Many families contact us when a loved one forgets medication, struggles with washing or dressing, becomes anxious alone, or needs supervision for wandering risk. Early support at home can delay a move to residential care and help everyone adjust with less stress.",
        "If you are unsure what level of help is right, we offer a free consultation to discuss daily routines, safety concerns, and whether visits, overnight care, or live-in care would suit best.",
      ],
      image:
        "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
      imageAlt: "Family discussing dementia home care options",
      cta: { label: "Book a free consultation", href: "/enquire" },
    },
  ],
  faqs: [
    {
      id: "what-is",
      title: "What is dementia care at home?",
      answer:
        "Dementia care at home is tailored support for people with dementia or Alzheimer's in their own home, including companionship, personal care, routines, and safety-focused assistance from trained caregivers.",
    },
    {
      id: "stay-home",
      title: "Can someone with dementia stay at home?",
      answer:
        "Many people live well at home with the right support. We assess daily needs, risks, and family circumstances to recommend visit frequency, overnight care, or live-in care when appropriate.",
    },
    {
      id: "training",
      title: "Are your caregivers trained in dementia care?",
      answer:
        "Yes. Caregivers receive dementia-aware training covering communication, nutrition, personal care, and responding calmly to confusion or distress.",
    },
    {
      id: "overnight",
      title: "Do you offer overnight dementia care?",
      answer:
        "Yes. Sleep-in and waking night services are available when someone needs reassurance, toileting support, or supervision through the night.",
    },
    {
      id: "respite",
      title: "Can you provide respite for family carers?",
      answer:
        "Yes. Respite care gives family carers a break while a familiar Naptec caregiver supports your loved one at home.",
    },
    {
      id: "cost",
      title: "How much does dementia care at home cost?",
      answer:
        "Costs depend on the type of care, visit length, and how often support is needed. Contact us for a personalised quote or see our cost of care guide for funding options.",
    },
  ],
  guidesTitle: "Advice & Support",
  guides: [
    {
      image:
        "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
      title: "Understanding types of home care",
      href: "/advice-and-care/articles/understanding-different-types-of-home-care-services",
    },
    {
      image:
        "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
      title: "The cost of home care",
      href: "/advice-and-care/cost-of-care",
    },
  ],
};
