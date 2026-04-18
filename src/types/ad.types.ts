export interface Ad {
  id: string;
  title: string;
  description: string;
  price: {
    value: number;
    currency: string;
    formatted: string;
  };
  location: {
    name: string;
    externalID: string;
  };
  category: {
    name: string;
    externalID: string;
  };
  images: {
    url: string;
  }[];
  timestamp: string;
  user: {
    name: string;
  };
}

export interface AdResponse {
  hits: {
    hits: {
      _id: string;
      _source: Ad;
    }[];
    total: {
      value: number;
    };
  };
}
