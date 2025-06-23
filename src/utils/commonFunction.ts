import {SocialMediaItem} from '../types/socialMedia';

export const isSameDomain = (
  url: string,
  selectedSocial: SocialMediaItem,
): boolean => {
  try {
    const parsedUrl = new URL(url.trim());
    const hostname = parsedUrl.hostname.toLowerCase();
    const baseDomain = selectedSocial.domain.toLowerCase();

    return hostname === baseDomain || hostname.endsWith(`.${baseDomain}`);
  } catch (error) {
    console.error('URL parsing error:', error);
    return false;
  }
};

export const dateStringToDateTitle = (dateString: string): string => {
  const input = new Date(dateString);
  const today = new Date();

  // Use UTC to avoid timezone-related bugs
  const inputUTC = Date.UTC(
    input.getFullYear(),
    input.getMonth(),
    input.getDate(),
  );
  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const diffDays = Math.floor((todayUTC - inputUTC) / 86400000); // 60 * 60 * 1000 * 24

  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 30) {
    return `${diffDays} Days ago`;
  }

  const diffMonths =
    (today.getFullYear() - input.getFullYear()) * 12 +
    (today.getMonth() - input.getMonth());
  if (diffMonths === 1) {
    return '1 Month ago';
  }
  if (diffMonths < 12) {
    return `${diffMonths} Months ago`;
  }

  const diffYears = today.getFullYear() - input.getFullYear();
  if (diffYears === 1) {
    return '1 Year ago';
  }
  return `${diffYears} Years ago`;
};
