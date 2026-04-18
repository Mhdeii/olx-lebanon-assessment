import client from './client';
import {AdResponse, Ad} from '../types/ad.types';
import {FilterState} from '../types/filter.types';

const SEARCH_URL = 'https://search.mena.sector.run/_msearch';
const SEARCH_AUTH = 'Basic b2x4LWxiLXByb2R1Y3Rpb24tc2VhcmNoOj5zK08zPXM5QEk0REYwSWEldWc/N1FQdXkye0RqW0Zy'; // Extracted via web inspection

export const fetchAds = async (
  filters: FilterState,
  from: number = 0,
  size: number = 12
): Promise<Ad[]> => {
  const indexLine = JSON.stringify({ index: 'olx-lb-production-ads-en' });
  
  const query: any = {
    bool: {
      must: [],
    },
  };

  if (filters.categoryId) {
    query.bool.must.push({ term: { 'category.externalID': filters.categoryId } });
  }

  if (filters.locationId) {
    query.bool.must.push({ term: { 'location.externalID': filters.locationId } });
  }

  if (filters.query) {
    query.bool.must.push({ query_string: { query: filters.query } });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.bool.must.push({
      range: {
        'price.value': {
          gte: filters.minPrice,
          lte: filters.maxPrice,
        },
      },
    });
  }

  // Add dynamic filters if any
  Object.keys(filters.dynamicFields || {}).forEach(key => {
    query.bool.must.push({ term: { [`attributes.${key}`]: filters.dynamicFields[key] } });
  });

  const bodyLine = JSON.stringify({
    from,
    size,
    query,
    sort: [{ timestamp: { order: 'desc' } }, { id: { order: 'desc' } }],
  });

  // Elasticsearch _msearch requires a newline at the end of each line, including the last one
  const payload = `${indexLine}\n${bodyLine}\n`;

  const response = await client.post<any>(SEARCH_URL, payload, {
    headers: {
      'Authorization': SEARCH_AUTH,
      'Content-Type': 'application/json'
    }
  });
  
  // _msearch returns an array of responses in 'responses' field
  const adsResponse = response.data.responses[0] as AdResponse;
  
  // Fallback for empty results
  if (!adsResponse.hits || !adsResponse.hits.hits) {
     return [];
  }
  
  return adsResponse.hits.hits.map(hit => ({
    ...hit._source,
    id: hit._id,
  }));
};
