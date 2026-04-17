export type ProductModel = 'CONSUMABLE' | 'DURABLE';

export interface ProductBatch {
  id: string;
  name: string;
  model: ProductModel;
  totalItems: number;
  createdAt: string;
  status: 'MANUFACTURING' | 'DISTRIBUTION' | 'READY';
}

export interface ProductItem {
  id: string;
  batchId: string;
  qrCode: string;
  ownerAddress?: string;
  status: 'ACTIVE' | 'BURNED' | 'TRANSFERED';
  trackingHistory: TrackingEvent[];
}

export interface TrackingEvent {
  id: string;
  productId: string;
  location: string;
  timestamp: string;
  status: string;
}

export interface VerificationLog {
  id: string;
  productId: string;
  timestamp: string;
  location: string;
  status: 'VALID' | 'DUPLICATE' | 'INVALID';
}

export interface Alert {
  id: string;
  type: 'DOUBLE_SCAN' | 'INVALID_QR' | 'EXPIRED_TOKEN';
  productId: string;
  timestamp: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}
