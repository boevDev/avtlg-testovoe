type TechnicalCharacteristics = {
  car_id: number;
  brand: string;
  model: string;
  productionYear: number;
  body: string;
  mileage: number;
};

type Option = {
  name: string;
  id: number;
};

type Car = {
  id: number;
  images: string[];
  name: string;
  description: string;
  price: number;
  contacts: string;
  hasTechnicalCharacteristics: boolean;
  technical_characteristics?: TechnicalCharacteristics;
  options?: Option[];
};

type CarQueryParams = {
  name?: string;
  price_gte?: string;
  price_lte?: string;
  'technical_characteristics.model'?: string;
  'technical_characteristics.brand'?: string;
  'technical_characteristics.productionYear'?: string;
  'technical_characteristics.mileage_gte'?: string;
  'technical_characteristics.mileage_lte'?: string;
};
