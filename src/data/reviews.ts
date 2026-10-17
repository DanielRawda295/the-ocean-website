export interface CustomerReview {
  id: string
  note?: string
  posted: string
  review: string
  reviewer: string
}

/** User-supplied review snapshot; relative dates are not automatically updated. */
export const customerReviews: CustomerReview[] = [
  { id: 'natali-gh', reviewer: 'Natali Gh', review: 'They respond on WhatsApp and take the order, but when you arrive, the order is still not ready.', posted: '4 months ago' },
  { id: 'howaida-dalal', reviewer: 'HOWAIDA DALAL', review: 'Clean and Fresh seafood 👌', posted: '5 months ago' },
  { id: 'ziad-fayad', reviewer: 'ziad fayad', review: '👍', posted: '9 months ago' },
  { id: 'ohaila-el-achkar', reviewer: 'Ohaila El Achkar', review: 'Best quality seafood, delicious food and freindly staff', posted: '3 weeks ago' },
  { id: 'yousef-halawi', reviewer: 'Yousef Halawi', review: 'Delicious sandwiches and plates - very neat and clean - highly recommended 👌', posted: '1 month ago' },
  { id: 'eddy-s', reviewer: 'Eddy S.', review: 'Great place, exceptionally clean, with excellent quality and very fresh fish. Highly recommended!', posted: 'Edited 2 months ago' },
  { id: 'zahi-hamadeh', reviewer: 'zahi hamadeh', review: 'Excellent seafood place\nShould visit .\nsandwiches and plates so yummi\nPreparing sandwich with sesame bun\nFajita shrimps 10$', posted: '2 months ago' },
  { id: 'wessam-zeinadeen', reviewer: 'Wessam Zeinadeen', review: 'The best fish in Lebanon', posted: '1 week ago', note: 'Translated by Google from Arabic' },
  { id: 'redan-makarem', reviewer: 'Redan Makarem', review: 'Exceptional, fresh fish, flawless service, and generous hospitality.', posted: '3 weeks ago', note: 'Translated by Google from Central Kurdish' },
  { id: 'bob-monzer', reviewer: 'Bob Monzer', review: 'God bless you, the job suits you perfectly 👍🏼', posted: '1 month ago', note: 'Translated by Google from Arabic' },
]
