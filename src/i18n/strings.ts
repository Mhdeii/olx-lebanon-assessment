export const strings = {
  home: {
    en: 'Home',
    ar: 'الرئيسية',
  },
  search: {
    en: 'Search',
    ar: 'بحث',
  },
  settings: {
    en: 'Settings',
    ar: 'الإعدادات',
  },
  profile: {
    en: 'Profile',
    ar: 'الملف الشخصي',
  },
  language: {
    en: 'Language',
    ar: 'اللغة',
  },
  login: {
    en: 'Login',
    ar: 'تسجيل الدخول',
  },
  price: {
    en: 'Price',
    ar: 'السعر',
  },
  categories: {
    en: 'Categories',
    ar: 'الفئات',
  },
  sell: {
    en: 'Sell',
    ar: 'بيع',
  },
  no_results: {
    en: 'No results found',
    ar: 'لا توجد نتائج',
  },
  see_all: {
    en: 'See All',
    ar: 'عرض الكل',
  },
  fresh_recommendations: {
    en: 'Fresh recommendations',
    ar: 'توصيات جديدة',
  },
  search_placeholder: {
    en: 'What are you looking for?',
    ar: 'عن ماذا تبحث؟',
  },
  chats: {
    en: 'Chats',
    ar: 'الدردشات',
  },
  my_ads: {
    en: 'My Ads',
    ar: 'إعلاناتي',
  },
  account: {
    en: 'Account',
    ar: 'الحساب',
  },
  results_for: {
    en: '{{count}} Results for {{query}}',
    ar: '{{count}} نتيجة لـ {{query}}',
  },
  results: {
    en: '{{count}} Results',
    ar: '{{count}} نتيجة',
  },
  see_results: {
    en: 'See {{count}} Results',
    ar: 'عرض {{count}} نتيجة',
  },
  sort_by: {
    en: 'Sort By',
    ar: 'ترتيب حسب',
  },
  elite_ads: {
    en: 'Elite Ads',
    ar: 'إعلانات النخبة',
  },
  view_more: {
    en: 'View more',
    ar: 'عرض المزيد',
  },
  filters: {
    en: 'Filters',
    ar: 'الفلاتر',
  },
  all_country: {
    en: 'All country',
    ar: 'كل البلد',
  },
  all_lebanon: {
    en: 'All Lebanon',
    ar: 'كل لبنان',
  },
  all_categories: {
    en: 'All Categories',
    ar: 'كل الفئات',
  },
  click_to_change: {
    en: 'Click to change',
    ar: 'اضغط للتغيير',
  },
  any: {
    en: 'Any',
    ar: 'الكل',
  },
  clear_all: {
    en: 'Clear all',
    ar: 'مسح الكل',
  },
  change: {
    en: 'Change',
    ar: 'تغيير',
  },
  category: {
    en: 'Category',
    ar: 'الفئة',
  },
  location: {
    en: 'Location',
    ar: 'الموقع',
  },
  price_range: {
    en: 'Price range',
    ar: 'نطاق السعر',
  },
  min: {
    en: 'Min',
    ar: 'الأدنى',
  },
  max: {
    en: 'Max',
    ar: 'الأقصى',
  },
  elite: {
    en: 'Elite',
    ar: 'نخبة',
  },
  verified: {
    en: 'Verified',
    ar: 'موثق',
  },
  call: {
    en: 'Call',
    ar: 'اتصال',
  },
  retry: {
    en: 'Retry',
    ar: 'إعادة المحاولة',
  },
  account_info: {
    en: 'Account Information',
    ar: 'معلومات الحساب',
  },
  buy_packages: {
    en: 'Buy Packages',
    ar: 'شراء باقات',
  },
  billing: {
    en: 'Billing',
    ar: 'الفواتير',
  },
  help_support: {
    en: 'Help & Support',
    ar: 'المساعدة والدعم',
  },
  view_edit_profile: {
    en: 'View and edit profile',
    ar: 'عرض وتعديل الملف الشخصي',
  },
  logout: {
    en: 'Logout',
    ar: 'تسجيل الخروج',
  },
  member_since: {
    en: 'Member since {{date}}',
    ar: 'عضو منذ {{date}}',
  },
} as const;

export type TranslationKey = keyof typeof strings;
