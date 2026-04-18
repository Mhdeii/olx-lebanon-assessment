export interface FilterState {
  categoryId?: string;
  locationId?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
  dynamicFields: Record<string, any>;
}

export type FieldType = 'dropdown' | 'checkbox' | 'range' | 'text';

export interface DynamicField {
  id: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  required: boolean;
}
