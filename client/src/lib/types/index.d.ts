type City = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  createDate: string;
  updateDate: string;
  details: Details;
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
