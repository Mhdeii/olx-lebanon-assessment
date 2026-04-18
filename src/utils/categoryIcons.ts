export const getCategoryIcon = (externalID: string): string => {
  const CATEGORY_ICONS: Record<string, string> = {
    '129': 'car-outline',
    '138': 'business-outline',
    '147': 'phone-portrait-outline',
    '20': 'tv-outline',
    '6': 'bed-outline',
    '17': 'briefcase-outline',
    '14': 'paw-outline',
    '223': 'happy-outline',
    '227': 'basketball-outline',
    '230': 'color-palette-outline',
    '100': 'tie-outline',
    '206': 'shirt-outline',
    '241': 'construct-outline',
  };
  return CATEGORY_ICONS[externalID] || 'cube-outline';
};
