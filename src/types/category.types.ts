export interface Category {
  id: number;
  name: string;
  name_l1: string; // Arabic name
  externalID: string;
  slug: string;
  level: number;
  parentID: number | null;
  children: Category[];
}

export type CategoryTree = Category[];
