import type { ServicePage } from "@/lib/services";

const parent = {
  category: "domiciliary" as const,
  parentLabel: "Domiciliary Care",
  parentHref: "/what-we-do/domiciliary-care",
};

export const homeHelpHousekeeping: ServicePage = {
  ...parent,
  slug: "home-help-and-housekeeping",
  title: "Home Help & Housekeeping for the Elderly",
  shortTitle: "Home Help & Housekeeping",
  metaTitle: "Home Help & Housekeeping | Elderly Care | Naptec – Croydon",
  metaDescription:
    "Home help and housekeeping for elderly clients in Croydon. Light cleaning, laundry, errands, and practical support at home.",
  relatedSlugs: ["companionship", "personal-care", "domiciliary-care", "respite-care"],
  intro:
    "A clean and tidy home can make all the difference to an older person's health and wellbeing. Our caregivers can help with chores and tasks to keep the house in ship shape, taking chores off your plate so you can spend more quality time with your loved one.",
  description:
    "Housekeeping and home help for the elderly from Naptec. Laundry, cleaning, and practical support at home.",
  sections: [
    {
      heading: "What is home help from Naptec?",
      paragraphs: [
        "Our home help service can support your loved one in looking after their home, by helping with tasks like doing laundry, dusting, vacuuming, putting bins out, ironing, or even feeding family pets. When you are matched with a caregiver, they will take the time to get to know just how you like things around the house.",
        "Some of the benefits of arranging home help include:",
      ],
      bullets: [
        "Peace of mind that your loved one's home is always clean and tidy",
        "Removing clutter that could be unsafe, or a trip hazard",
        "More quality time with your loved one that is not spent doing chores",
        "Companionship during cleaning, and regular check-ins",
        "Creating a space that your loved one feels more comfortable in",
        "Reducing your loved one's workload, allowing them to rest more",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
      imageAlt: "Home help and housekeeping support",
    },
    {
      heading: "How often should an older person have home help?",
      paragraphs: [
        "Your caregiver can help with as little or as much as you want them to, and can also work alongside your loved one for safety and companionship if they prefer to tend to their own home.",
        "Whatever their housekeeping needs, our caregivers can personalise a service and routine to suit you. From increased wellbeing to spending more time with family, there are so many benefits to arranging home help.",
        "Our service is also a great starting point that allows you to expand to cover more care needs over time, so your loved one can become familiar with their caregiver and get used to having someone around the home.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
      imageAlt: "Caregiver helping with household tasks",
      cta: { label: "Enquire now", href: "/enquire" },
    },
  ],
  faqs: [
    {
      id: "when",
      title: "When should I or my loved one consider using home help care?",
      answer:
        "If daily household tasks are starting to take longer or becoming more difficult you may want to consider getting assistance. Our caregivers can work alongside you or work on the tasks alone, ensuring your home stays clean and tidy.",
    },
    {
      id: "changes",
      title: "What happens if my need for home help changes?",
      answer:
        "Naptec understands that any care you need can change over time. We will work closely with you to ensure we provide you with as much or as little care and support as you require.",
    },
    {
      id: "limitations",
      title: "Is there any housework you are unable to do?",
      answer:
        "Our home help care covers light household tasks which can be carried out during a visit. This would not cover deep cleaning of a client's home.",
    },
  ],
  guidesTitle: "Guides",
  guides: [],
  showConfusedSection: false,
};

export const personalCare: ServicePage = {
  ...parent,
  slug: "personal-care",
  title: "Personal Care at Home",
  shortTitle: "Personal Care",
  metaTitle: "Personal Care at Home | Elderly Care | Naptec – Croydon",
  metaDescription:
    "Personal care at home in Croydon. Dignified help with bathing, dressing, mobility, and daily living from trained caregivers.",
  relatedSlugs: [
    "domiciliary-care",
    "overnight-care",
    "dementia-and-alzheimers",
    "live-in-care",
    "respite-care",
  ],
  intro:
    "Personal care at home helps older adults manage bathing, dressing, mobility, and daily living with dignity. Naptec caregivers provide discreet, respectful support tailored to your routine in Croydon and nearby areas.",
  description:
    "Personal care at home from Naptec. Dignified elderly care support with bathing, dressing, and daily living.",
  sections: [
    {
      heading: "What does a Personal Care service involve?",
      paragraphs: [
        "At Naptec, our personal care assistance services ensure that care and support is provided with dignity and a commitment to enabling you or your loved one to be independent. We understand that having support with daily living such as bathing or dressing can make a difference in your quality of life, helping you to stay happy at home.",
        "We understand that everyone is unique, so we ensure that support with personal care is tailored to you. We will work with you or your loved one to put together a detailed person-centred plan that our caregivers will follow, so that you or your loved one gets the care and support needed, in the way that you want it.",
        "Personal care assistance:",
      ],
      bullets: [
        "Is dignified and respectful",
        "Maintains your preferred routine and lifestyle",
        "Takes place in your own home in familiar surroundings",
        "Gives peace of mind that your loved one is being cared for",
        "Helps families take a rest from caring",
        "Enables your loved one to remain living at home",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
      imageAlt: "Personal care assistance at home",
    },
    {
      heading: "Providing customised care",
      paragraphs: [
        "We understand that it can be an unsettling time when daily living activities such as personal hygiene, dressing and personal grooming become a struggle. It can be difficult to accept help with personal care from our loved ones, particularly those with more intimate or clinical needs.",
        "At Naptec we say no to one-size-fits-all care. Your caregiver will be matched with you, will take time to get to know you, and will build a trusted relationship to ensure that your care and support is personal to you and carried out in the way you want, to assist your independence.",
        "Our caregivers are highly trained in providing personal care assistance, including support with moving and positioning, helping with medication, mealtime support, assisting with bathing or showering, and continence care.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
      imageAlt: "Customised personal care at home",
    },
    {
      heading: "How would a Personal Care service help me?",
      paragraphs: [
        "Personal care at home means support is delivered where you feel most comfortable, with people you get to know over time. Whether you need help getting ready in the morning, support through the day, or assistance before bed, we adapt visits to your routine and preferences.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
      imageAlt: "Caregiver supporting personal care needs",
    },
  ],
  faqs: [
    {
      id: "what",
      title: "What is personal care assistance?",
      answer:
        "Physical help given to a person and prompting of an individual to carry out daily living tasks themselves.",
    },
    {
      id: "benefits",
      title: "What are the benefits of personal care assistance?",
      answer:
        "Promoting good personal hygiene helps to prevent illness and the spread of infection. It also helps maintain self-confidence and dignity.",
    },
    {
      id: "why-home",
      title: "Why choose personal care assistance at home?",
      answer:
        "A familiar caregiver matched with you provides personalised care and support to you in your own home in the way you want it to be provided.",
    },
    {
      id: "who",
      title: "How will I know who is providing my care?",
      answer:
        "We understand that it can be difficult accepting personal care and that is why you will be introduced to your caregivers and they will spend time getting to know you before assisting you with your personal care.",
    },
    {
      id: "same",
      title: "Will I have the same caregiver?",
      answer:
        "At Naptec we ensure that each client has a small team of caregivers in place to provide you with care so you can be confident that you will have continuity from familiar people.",
    },
    {
      id: "competent",
      title: "How do I know my caregiver is competent?",
      answer:
        "At Naptec, we have a robust approach to ensuring that all caregivers have regular observations of practice and assessments of competency for key activities such as handling medication.",
    },
  ],
  guidesTitle: "Guides & Support",
  guides: [],
};

export const overnightCare: ServicePage = {
  ...parent,
  slug: "overnight-care",
  title: "Overnight Care at Home",
  shortTitle: "Overnight Care",
  metaTitle: "Overnight Care at Home | Sleep-In & Waking Nights | Naptec – Croydon",
  metaDescription:
    "Overnight home care in Croydon including sleep-in and waking night services. Safe, reassuring night-time support for elderly clients and families.",
  relatedSlugs: [
    "live-in-care",
    "dementia-and-alzheimers",
    "personal-care",
    "respite-care",
  ],
  intro:
    "Overnight care at home helps your loved one feel safe through the night with a Naptec caregiver on hand — whether for reassurance, medication support, or regular assistance.",
  description:
    "Overnight care at home from Naptec. Sleep-in and waking night services in Croydon.",
  sections: [
    {
      heading: "Do you need someone to be there for you during the night?",
      paragraphs: [
        "At Naptec, we understand that it is important for you to know that you or your loved one feels safe and well supported at home no matter the time of day or night. Our trained and dedicated caregivers are available to provide care and support during the night, whether this be as a sleep-in service or a waking night service – our overnight care is tailored for whatever you might need.",
        "Overnight care is perfect for those who are elderly or unwell, and may either require frequent assistance during the night hours – such as with administering medication or help reaching the bathroom – or who simply want a comforting presence nearby should they need it. Having overnight care at home means that you or your loved one can remain living independently at home with the care and support you need to stay safe and well.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
      imageAlt: "Overnight care at home",
      cta: { label: "Enquire now", href: "/enquire" },
    },
    {
      heading: "Sleep-in Service",
      paragraphs: [
        "A sleep-in service is when the caregiver sleeps in your home while you sleep. This type of service is ideal for those who do not need care during the night, but who are uncomfortable being alone and want the reassurance of knowing there is someone nearby should they need help. This can especially be the case for those with progressive conditions such as dementia that can leave someone feeling confused, disoriented, or stressed – having a familiar face on hand can alleviate feelings of isolation or loneliness.",
        "Knowing there is a caregiver sleeping close by gives peace of mind and can improve overall wellbeing, because you or your loved one are able to sleep well without anxiety. The sleep-in service may also include assisting you to bed in the evening or preparing breakfast when you wake in the morning.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
      imageAlt: "Sleep-in overnight care service",
      discoverMore: { href: "/enquire" },
    },
    {
      heading: "Waking Night Service",
      paragraphs: [
        "A waking night service is when the caregiver is awake and on duty throughout the night at your home. This service is ideal for those who wake frequently throughout the night needing care and support, such as assistance to the bathroom, personal or continence care, regular repositioning especially after an accident or injury, medication administration, or help orientating to the time of day in order to return to sleep.",
        "Our care is always personalised to your needs, meaning we can revisit your overnight care options whenever you require, or if there is a change in circumstances. Whatever your situation, our caregivers are on hand to ensure you live well at home, your way.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
      imageAlt: "Waking night care service",
      discoverMore: { href: "/enquire" },
    },
  ],
  faqs: [
    {
      id: "sleep-in",
      title: "What is a sleep-in service?",
      answer:
        "A caregiver sleeps at your home overnight. This is a good option for those who do not require much nightly supervision, but who would feel safer and more comfortable knowing there is someone sleeping nearby should they need help.",
    },
    {
      id: "waking",
      title: "What is a waking night service?",
      answer:
        "A caregiver is awake and on duty in your home throughout the night. This is the best option for those who require more support or assistance during the night, such as with administering medication, bathroom visits, repositioning, or other issues.",
    },
    {
      id: "why-home",
      title: "Why choose overnight care at home?",
      answer:
        "Having care at home overnight means that you or your loved one can feel safe and supported within their own home, no matter what time of day or night it is. Knowing there is someone nearby helps provide peace of mind during the nighttime hours, resulting in a better night's sleep.",
    },
  ],
  guidesTitle: "Guides & Support",
  guides: [],
  showConfusedSection: false,
};

export const dayCare: ServicePage = {
  ...parent,
  slug: "day-care",
  title: "Day Care At Home",
  shortTitle: "Day Care",
  intro:
    "Loneliness and social isolation can have serious effects on a person's health and well-being. Many people we support with day care at home simply want company and conversation, whether they live alone or need care and support whilst family carers are away.",
  description:
    "Day care at home from Naptec. Flexible daytime support, companionship, and activities.",
  sections: [
    {
      heading: "What is Naptec day care?",
      paragraphs: [
        "Whatever support you need, our dedicated caregivers will share in your interests and accompany you in whatever you like to do whether that is crafting, going for a walk, playing games or enjoying music. Naptec day care is flexible to fit in with you. You might only want a few hours or a full day of support and whatever you need, we will match you with a caregiver who will become a trusted companion who enables you to continue living a fulfilled and active life.",
        "Naptec day care at home is also ideal for people living with dementia, Parkinson's or for those recovering from a stroke or enduring a mental health need such as depression.",
        "Day care:",
      ],
      bullets: [
        "Is personalised to you",
        "Promotes a stimulating and active lifestyle",
        "Is flexible to meet your needs",
        "Gives peace of mind that your loved one is safe at home",
        "Helps families take a rest from caring",
        "Is specialised and expert",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
      imageAlt: "Day care at home",
    },
    {
      heading: "What can I expect from Naptec day care?",
      paragraphs: [
        "Day care at home means that a caregiver will work with you to develop a plan for activities that are personalised to you and enable you to live your life your way. Day care at Naptec is tailored to your needs, whether that is through physical activities such as walking or reminiscence activities to stimulate your memories.",
        "It can also include rehabilitative sessions as recommended by other professionals such as physiotherapists and occupational therapists to assist your recovery. Our caregivers are highly trained and will provide a day care service for adults that includes companionship, home help, personal care and specialist care.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
      imageAlt: "Daytime activities with a caregiver",
      cta: { label: "Enquire now", href: "/enquire" },
    },
  ],
  faqs: [
    {
      id: "go-out",
      title: "Can I go out with my caregiver when receiving day care at home?",
      answer:
        "Yes, your caregiver is able to accompany you to places of interest, such as out for lunch or to the garden centre.",
    },
    {
      id: "training",
      title: "What training do caregivers have?",
      answer:
        "Our caregivers receive training in all aspects of providing care and support to people in their own home, including specialist dementia and Parkinson's training.",
    },
  ],
  guidesTitle: "Advice & Support",
  guides: [],
  showConfusedSection: false,
};

export const respiteCare: ServicePage = {
  ...parent,
  slug: "respite-care",
  title: "Respite Care at Home",
  shortTitle: "Respite Care",
  metaTitle: "Respite Care at Home | Carer Breaks | Naptec – Croydon",
  metaDescription:
    "Respite care at home for family carers in Croydon. Short-notice and planned breaks with trusted elderly care at home.",
  relatedSlugs: [
    "companionship",
    "personal-care",
    "dementia-and-alzheimers",
    "live-in-care",
  ],
  intro:
    "Respite care at home gives family carers a well-deserved break while a trained Naptec caregiver supports your loved one safely in familiar surroundings — for a few hours, overnight, or longer.",
  description:
    "Respite care at home from Naptec. Temporary relief for family carers in Croydon.",
  sections: [
    {
      heading: "We are here to help",
      paragraphs: [
        "At Naptec we understand that it is important you take a break from time to time, which is where our respite care at home service can help.",
        "You do not have to shoulder all the care responsibilities alone. Our caregivers can help care for your loved one whilst you have a well-deserved break and are able to keep an appointment, enjoy a holiday or attend a special occasion. It is important to look after your own well-being too, and with our respite care service you can be confident that your loved one is safe, happy and well cared for at home.",
        "The regular demands of caring can lead to feelings of exhaustion, so it is important to recognise when you need a break. Taking a rest from caring by using a respite service means taking care of your health and wellbeing so you can continue to care.",
        "Our respite care service is beneficial in many ways:",
      ],
      bullets: [
        "Your loved one can stay at home whilst you take a break",
        "It gives you peace of mind that your loved one is being cared for at home",
        "It is tailored to your loved one's needs",
        "You are able to take a rest from caring",
        "It is delivered by caregivers matched to you and your loved one",
        "It is given by highly trained caregivers",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
      imageAlt: "Respite care at home",
    },
    {
      heading: "Benefits of respite care",
      paragraphs: [
        "By choosing our tailored respite care services, you will have peace of mind knowing that essential care is being taken care of whilst you recharge your batteries. Respite care can take different forms, from a short break to a longer-term stay that enables you to enjoy a holiday.",
        "We can also provide home visits to support you to care for your loved one if you need time to get back on your feet – for example after a hospital stay or if you have been unwell.",
        "Our caregivers are highly trained in providing a variety of care services including companionship, personal care and dementia care.",
      ],
      image: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
      imageAlt: "Family carer taking a well-deserved break",
      cta: { label: "Enquire now", href: "/enquire" },
    },
  ],
  faqs: [
    {
      id: "what",
      title: "What is respite care?",
      answer:
        "Respite care provides temporary relief to primary caregivers by offering trained caregivers who care for elderly individuals who require care. This temporary support helps caregivers take breaks, manage burnout, and maintain their own well-being while ensuring the safety and comfort of the person receiving ongoing care.",
    },
    {
      id: "how-works",
      title: "How does respite care work?",
      answer:
        "Trained caregivers can step in to provide seamless care, allowing current caregivers a break to rest and recharge. Our respite care services take place in the home of the person receiving the care, so they can continue their normal life while you take a break.",
    },
    {
      id: "arrange",
      title: "How do I arrange respite care?",
      answer:
        "Contact Naptec and we will arrange a discussion with you to talk about the kind of support you need and how we can help.",
    },
    {
      id: "who-provides",
      title: "Who provides respite care?",
      answer:
        "All respite care is provided by our fully trained caregivers so both the elderly individual receiving care and their loved ones can take a break with confidence.",
    },
    {
      id: "short-notice",
      title: "I need respite care at short notice, can you help?",
      answer:
        "At Naptec we know about the challenges of being a carer and are here to help no matter what your timelines look like. Please contact us so that we can understand more about how we can provide you with the support you need.",
    },
    {
      id: "stay-home",
      title: "Do I have to go out while respite care is in place?",
      answer:
        "Not at all. Existing caregivers do not have to leave the home whilst we are supporting your loved one, so they can take breaks at home if that is their preference.",
    },
    {
      id: "period",
      title: "What defines a respite period?",
      answer:
        "A respite period is a specific duration of time during which primary caregivers receive temporary relief from their caregiving responsibilities. The length can vary, ranging from a few hours to several days, depending on the arrangement and the needs of the primary caregivers.",
    },
    {
      id: "why-important",
      title: "Why is respite care important?",
      answer:
        "Respite care is crucial for family caregivers, offering them a much-needed break from their responsibilities. This temporary relief prevents caregiver burnout and helps maintain wellbeing and the ability to provide effective long-term care.",
    },
    {
      id: "cost",
      title: "How much does respite care cost?",
      answer:
        "The cost of respite care can vary widely based on factors such as location, the level and complexity of care provided, and the duration. Contact us or your local council to understand potential sources of financial support available for your situation.",
    },
    {
      id: "who-pays",
      title: "Who pays for respite care?",
      answer:
        "Respite care funding can come from government initiatives, charitable organisations, insurance provision, or personal payments. Family caregivers can investigate these avenues to identify the most fitting approach for their needs.",
    },
    {
      id: "dementia",
      title: "What is respite care for dementia?",
      answer:
        "Respite care for dementia is a specialised service designed to provide temporary relief to caregivers of people living with dementia or Alzheimer's. Our domiciliary approach to deliver respite care at home is often the best solution to keep them calm and comfortable in a familiar environment.",
    },
    {
      id: "how-long",
      title: "How long can respite care last?",
      answer:
        "Respite care can be as short as a few hours or extend to several days or even weeks, allowing caregivers to take a more extended break or address personal matters.",
    },
  ],
  guidesTitle: "Guides",
  guides: [],
  showConfusedSection: false,
};
