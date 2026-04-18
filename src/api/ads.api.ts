import client from './client';
import { AdResponse, Ad } from '../types/ad.types';
import { FilterState } from '../types/filter.types';
import { ENV } from '../config/env';

const mapSourceToAd = (hit: any): Ad => {
  const source = hit._source;
  const idStr = source.id ? String(source.id) : hit._id;

  const photos = source.photos || [];
  const images = photos.map((p: any) => ({
    url: `https://images.olx.com.lb/thumbnails/${p.id}-400x300.webp`
  }));

  if (images.length === 0) {
    images.push({ url: 'https://www.olx.com.lb/static/olxlb/naspers/images/category_placeholder.png' });
  }

  const catLevel = source.category ? source.category[source.category.length - 1] : { name: 'Unknown', externalID: '' };
  const locLevel = source.location ? source.location[source.location.length - 1] : { name: 'Unknown', externalID: '' };
  const priceValue = source.extraFields?.price ?? source.price ?? 0;

  return {
    id: hit._id || idStr,
    title: source.title || '',
    description: source.description || '',
    price: {
      value: priceValue,
      currency: 'USD',
      formatted: priceValue ? `$${priceValue.toLocaleString()}` : 'Contact for Price'
    },
    location: {
      name: locLevel.name,
      externalID: locLevel.externalID
    },
    category: {
      name: catLevel.name,
      externalID: catLevel.externalID
    },
    images: images,
    timestamp: source.createdAt ? new Date(source.createdAt * 1000).toISOString() : new Date().toISOString(),
    user: {
      name: source.contactInfo?.name || source.agency?.name || 'Private Seller',
      contactInfo: source.contactInfo
    },
    formattedExtraFields: source.formattedExtraFields
  };
};

const buildSearchQuery = (filters: FilterState, from: number = 0, size: number = 12, trackTotalHits = true) => {
  const must: any[] = [];

  if (filters.categoryId) {
    must.push({ term: { 'category.externalID': filters.categoryId } });
  }

  if (filters.locationId) {
    must.push({ term: { 'location.externalID': filters.locationId } });
  }

  if (filters.query) {
    must.push({ match: { title: filters.query } });
  }

  if (filters.dynamicFields) {
    Object.keys(filters.dynamicFields).forEach(key => {
      const val = filters.dynamicFields![key];
      if (val !== undefined && val !== null && val !== '') {
        must.push({ term: { [`extraFields.${key}`]: val } });
      }
    });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const range: any = {};
    if (filters.minPrice !== undefined) range.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) range.lte = filters.maxPrice;
    must.push({ range: { 'extraFields.price': range } });
  }

  const queryObj = must.length > 0 ? { bool: { must } } : { match_all: {} };

  return JSON.stringify({
    from,
    size,
    track_total_hits: trackTotalHits,
    query: queryObj,
    sort: [{ timestamp: { order: "desc" } }]
  });
};

export const fetchAds = async (
  filters: FilterState,
  from: number = 0,
  size: number = 12
): Promise<Ad[]> => {
  const indexLine = JSON.stringify({ index: 'olx-lb-production-ads-en' });
  const queryLine = buildSearchQuery(filters, from, size);
  const payload = `${indexLine}\n${queryLine}\n`;

  const response = await client.post(ENV.SEARCH_URL, payload, {
    headers: { 'Content-Type': 'application/x-ndjson' }
  });

  const hits = response.data?.responses?.[0]?.hits?.hits || [];
  return hits.map(mapSourceToAd);
};

export const fetchAdsCount = async (filters: FilterState): Promise<number> => {
  const indexLine = JSON.stringify({ index: 'olx-lb-production-ads-en' });
  const queryLine = buildSearchQuery(filters, 0, 0, true);
  const payload = `${indexLine}\n${queryLine}\n`;

  const response = await client.post(ENV.SEARCH_URL, payload, {
    headers: { 'Content-Type': 'application/x-ndjson' }
  });

  return response.data?.responses?.[0]?.hits?.total?.value || 0;
};

