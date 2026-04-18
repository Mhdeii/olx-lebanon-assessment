import client from './client';
import {CategoryTree} from '../types/category.types';

const CATEGORIES_URL = 'https://www.olx.com.lb/api/categories';

export const fetchCategories = async (): Promise<CategoryTree> => {
  const response = await client.get<CategoryTree>(CATEGORIES_URL);
  return response.data;
};

export const fetchCategoryFields = async (categoryIds: string[]): Promise<any> => {
  const baseUrl = 'https://www.olx.com.lb/api/categoryFields';
  const params = new URLSearchParams({
    includeChildCategories: 'true',
    splitByCategoryIDs: 'true',
    flatChoices: 'true',
    groupChoicesBySection: 'true',
    flat: 'true',
  });
  
  // Note: For simplicity in this demo, we fetch for the specific category IDs requested
  // In a real app, you might want to cache this extensively
  const url = `${baseUrl}?${params.toString()}`;
  const response = await client.get(url);
  return response.data;
};
