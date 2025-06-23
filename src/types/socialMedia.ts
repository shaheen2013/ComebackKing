export type SocialMediaItem = {
  id: number;
  name: string;
  url: string;
  icon: string;
  color: string;
  domain: string;
};

export const socialMediaData = [
  {
    id: 1,
    name: 'Facebook',
    url: 'https://www.facebook.com/',
    icon: 'facebook',
    color: '#4267B2',
    domain: 'facebook.com',
  },
  {
    id: 2,
    name: 'Twitter',
    url: 'https://x.com',
    icon: 'twitter',
    color: '#1DA1F2',
    domain: 'x.com',
  },
  // {
  //   id: 3,
  //   name: 'Linkedin',
  //   url: 'https://www.linkedin.com/',
  //   icon: 'linkedin',
  //   color: '#1DA1F2',
  //   domain: 'linkedin.com',
  // },
  // {
  //   id: 4,
  //   name: 'Instagram',
  //   url: 'https://www.instagram.com/',
  //   icon: 'instagram',
  //   color: '#0077B5',
  //   domain: 'instagram.com',
  // },
];
