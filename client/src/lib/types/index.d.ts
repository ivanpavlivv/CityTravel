type City = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  createDate: string;
  updateDate: string;
  details?: Details;
};

type Details = {
  id: string;
  costOfFood: number;
  taxiCost: number;
  apartmentCost: number;
  rentCost: number;
  createDate: string;
  updateDate: string;
  cityId: string;
};

type LocationIQSuggestion = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: LocationIQAddress;
  boundingbox: string[];
};

export type LocationIQAddress = {
  name: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  town?: string;
  village?: string;
  city?: string;
  city_district: string;
  county: string;
  state: string;
  state_district: string;
  postcode?: string;
  country: string;
  country_code: string;
};

export interface CostOfLiving {
  city: string;
  currency: string;
  costs: Cost[];
}

export interface Cost {
  item: string;
  cost: string;
  range: Range;
}

export interface Range {
  low: string;
  high?: string;
}
