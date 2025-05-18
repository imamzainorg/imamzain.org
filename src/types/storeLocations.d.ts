export type StoreLocation = {
  city: string;
  sellpoints: SellPoint[];
};

export type SellPoint = {
  name: string;
  location: string;
  phone: string;
  id: number;
  gps?: string;
};
