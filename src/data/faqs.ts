import { business } from './business'

export interface FaqItem {
  answer: string
  id: string
  question: string
}

export const faqs: FaqItem[] = [
  { id: 'location', question: 'Where is The Ocean located?', answer: `The Ocean is located at ${business.address}.` },
  { id: 'menu', question: 'Where can I see the menu?', answer: 'Open the Captain’s Log from the menu section to browse the current sandwich selection. Other items are clearly marked where information still needs owner confirmation.' },
  { id: 'contact', question: 'How can I contact the restaurant?', answer: `You can contact The Ocean by phone at ${business.phone.display}.` },
  { id: 'directions', question: 'How do I get directions?', answer: 'Use the View Directions link in the hero, visit section, or footer to open the supplied Google Maps route.' },
  { id: 'dining-space', question: 'How can I learn about the upcoming dining space?', answer: 'For updates about the upcoming larger dining space, please contact The Ocean directly.' },
  { id: 'allergies', question: 'What should I do if I have food allergies?', answer: 'Please contact The Ocean directly before ordering if you have food allergies or dietary requirements.' },
]
