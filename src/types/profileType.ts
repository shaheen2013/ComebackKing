export type Profile = {
  name: string;
  email: string;
  role: string;
  id: number;
  profile_image: any;
  created_at: string;
  updated_at: string;
};

export type ProfileState = {
  profile: Profile | null;
};

export type profileItemType = {
  id: number;
  label: string;
  icon: string;
};

export const listingData: profileItemType[] = [
  {id: 1, label: 'Feedback', icon: 'email'},
  {id: 2, label: 'How it works?', icon: 'video_play'},
  {id: 3, label: 'Settings', icon: 'settings'},
];

export const listingData2: profileItemType[] = [
  {id: 4, label: 'Change Password', icon: 'change_password'},
  {id: 5, label: 'Log Out', icon: 'log_out'},
];
