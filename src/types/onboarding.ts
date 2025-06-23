export type SlideType = {
  id: number;
  title1: string;
  title2?: string;
  title3?: string;
  title4?: string;
};

export const slides: SlideType[] = [
  {
    id: 1,
    title1: 'Get Instant ',
    title2: 'Comebacks ',
    title3: 'with ',
    title4: 'Comeback King',
  },
  {
    id: 2,
    title1: 'Tab to your ',
    title2: 'social media ',
    title3: 'and get started !',
    title4: '',
  },
  {
    id: 3,
    title1: 'Start talking to ',
    title2: ' Comeback King',
  },
];
