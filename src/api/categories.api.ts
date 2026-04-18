import client from './client';
import { CategoryTree } from '../types/category.types';

const CATEGORIES_URL = '/categories';

export const fetchCategories = async (): Promise<CategoryTree> => {
  const response = await client.get<CategoryTree>(CATEGORIES_URL);
  return response.data;
};

export const fetchCategoryFields = async (categoryIds: string[]): Promise<any> => {
  const baseUrl = '/categoryFields';
  const params = new URLSearchParams({
    includeChildCategories: 'true',
    splitByCategoryIDs: 'true',
    flatChoices: 'true',
    groupChoicesBySection: 'true',
    flat: 'true',
  });

  const url = `${baseUrl}?${params.toString()}`;
  const response = await client.get(url);
  return response.data;
};
