export interface CheckpointI {
  id: number;
  order: OrderI;
  trackingNumber: string;
  location: string;
  timestamp: Date;
  status: string;
  statusText: string;
  statusDetail: string;
}

export interface OrderI {
  id: number;
  orderNumber: string;
  checkpoints: CheckpointI[];
  trackingNumber: string | null;
  courier: string | null;
  street: string;
  zipCode: number;
  city: string;
  destinationCountryIso3: string;
  email: string;
  articleNumber: string;
  articleImageUrl: string | null;
  quantity: number;
  productName: string;
}
