import {create} from 'zustand';
import {Ad} from '../types/ad.types';
import {fetchAds} from '../api/ads.api';
import {FilterState} from '../types/filter.types';

interface AdsStore {
  ads: Ad[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  loadAds: (filters: FilterState, refresh?: boolean) => Promise<void>;
}

export const useAdsStore = create<AdsStore>((set, get) => ({
  ads: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,
  loadAds: async (filters, refresh = false) => {
    const {page, ads, loading, hasMore} = get();
    
    if (loading || (!hasMore && !refresh)) return;

    set({loading: true, error: null});

    try {
      const nextPage = refresh ? 0 : page;
      const size = 12;
      const newAds = await fetchAds(filters, nextPage * size, size);

      set({
        ads: refresh ? newAds : [...ads, ...newAds],
        page: nextPage + 1,
        hasMore: newAds.length === size,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to fetch ads',
        loading: false,
      });
    }
  },
}));
