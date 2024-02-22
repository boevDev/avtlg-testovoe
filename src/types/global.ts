type TechnicalCharacteristics = {
  car_id: number;
  brand: string;
  model: string;
  productionYear: number;
  body: string;
  mileage: number;
};

type Option = {
  option_name: string;
  id: number;
};

type Car = {
  id: number;
  images: string[];
  name: string;
  description: string;
  price: number;
  contacts: string;
  technical_characteristics?: TechnicalCharacteristics;
  options?: Option;
};
