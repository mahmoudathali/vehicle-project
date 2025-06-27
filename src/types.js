export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  bodyType: string;
  images: string[];
  features: string[];
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  vehicle: Vehicle;
  notes?: string;
  timestamp: number;
}