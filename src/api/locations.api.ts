import client from './client';
import { Location } from '../types/location.types';
import { ENV } from '../config/env';

export const fetchLocations = async (parentId?: string, level: number = 2): Promise<Location[]> => {
  const indexLine = JSON.stringify({ index: 'olx-lb-production-locations-en' });
  
  const must: any[] = [{ term: { level } }];
  
  if (parentId) {
    must.push({ term: { 'hierarchy.externalID': parentId } });
  }

  const queryLine = JSON.stringify({
    from: 0,
    size: 1000,
    track_total_hits: false,
    query: { bool: { must } },
    sort: [{ name: { order: 'asc' } }],
    timeout: '5s'
  });

  const payload = `${indexLine}\n${queryLine}\n`;

  const response = await client.post(ENV.SEARCH_URL, payload, {
    headers: {
      'Content-Type': 'application/x-ndjson'
    }
  });

  const hits = response.data?.responses?.[0]?.hits?.hits || [];
  return hits.map((hit: any) => hit._source);
};
