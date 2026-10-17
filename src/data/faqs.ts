export interface FaqItem {
  answer: string
  id: string
  question: string
}

export const faqs: FaqItem[] = [
  {
    id: 'menu',
    question: 'What is currently shown on the menu?',
    answer: 'This concept currently presents eight confirmed sandwich items. Prices and final menu information require restaurant-owner verification before production use.',
  },
  {
    id: 'location',
    question: 'Where is The Ocean located?',
    answer: 'The available business information identifies The Ocean in Remhala, Lebanon.',
  },
  {
    id: 'ordering',
    question: 'Can I place an order through this website?',
    answer: 'No. This is an unofficial concept and is not accepting orders. Any future ordering process must be confirmed and approved by the restaurant.',
  },
  {
    id: 'contact',
    question: 'How can I contact the restaurant?',
    answer: 'The displayed business phone number is 71 242 240. Please confirm current contact and service details directly with the restaurant.',
  },
  {
    id: 'allergens',
    question: 'Where can I find allergen information?',
    answer: 'Allergen information is not confirmed in this concept. Please contact the restaurant directly before ordering if you have allergies or dietary requirements.',
  },
]
