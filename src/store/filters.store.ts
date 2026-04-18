import {create} from 'zustand';
import {FilterState} from '../types/filter.types';

interface FiltersStore {
  filters: FilterState;
  setCategoryId: (id: string | undefined) => void;
  setLocationId: (id: string | undefined) => void;
  setPriceRange: (min: number | undefined, max: number | undefined) => void;
  setQuery: (query: string) => void;
  setDynamicField: (key: string, value: any) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  dynamicFields: {},
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  filters: initialFilters,
  setCategoryId: (id) => 
    set((state) => ({ 
      filters: { ...state.filters, categoryId: id, dynamicFields: {} } 
    })),
  setLocationId: (id) => 
    set((state) => ({ 
      filters: { ...state.filters, locationId: id } 
    })),
  setPriceRange: (min, max) => 
    set((state) => ({ 
      filters: { ...state.filters, minPrice: min, maxPrice: max } 
    })),
  setQuery: (query) => 
    set((state) => ({ 
      filters: { ...state.filters, query } 
    })),
  setDynamicField: (key, value) => 
    set((state) => ({ 
      filters: { 
        ...state.filters, 
        dynamicFields: { ...state.filters.dynamicFields, [key]: value } 
      } 
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));
