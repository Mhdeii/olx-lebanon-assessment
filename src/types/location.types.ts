export interface Location {
  id: number;
  name: string;
  name_l1: string;
  externalID: string;
  level: number;
  slug: string;
}

export interface LocationResponse {
  responses: [
    {
      hits: {
        hits: {
          _source: Location;
        }[];
      };
    }
  ];
}
