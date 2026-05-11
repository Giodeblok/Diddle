// bol.com Retailer API v10 — TypeScript types

export interface BolToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number; // timestamp we add ourselves
}

// ---- Offers ----

export type FulfilmentMethod = 'FBR' | 'FBB';
export type Condition = 'NEW' | 'AS_NEW' | 'GOOD' | 'REASONABLE' | 'MODERATE';

export interface BundlePrice {
  quantity: number;
  unitPrice: number;
}

export interface CreateOfferRequest {
  ean: string;
  condition: Condition;
  reference?: string;
  onHoldByRetailer?: boolean;
  unknownProductTitle?: string;
  pricing: {
    bundlePrices: BundlePrice[];
  };
  stock: {
    amount: number;
    managedByRetailer?: boolean;
  };
  fulfilment: {
    method: FulfilmentMethod;
    deliveryCode?: string;
  };
}

export interface UpdateOfferRequest {
  onHoldByRetailer?: boolean;
  pricing?: {
    bundlePrices: BundlePrice[];
  };
  stock?: {
    amount: number;
    managedByRetailer?: boolean;
  };
  fulfilment?: {
    method: FulfilmentMethod;
    deliveryCode?: string;
  };
}

export interface Offer {
  offerId: string;
  ean: string;
  reference?: string;
  onHoldByRetailer: boolean;
  pricing: {
    bundlePrices: BundlePrice[];
  };
  stock: {
    amount: number;
    correctedStock: number;
    managedByRetailer: boolean;
  };
  fulfilment: {
    method: FulfilmentMethod;
    deliveryCode: string;
  };
  condition: Condition;
  mutationDateTime: string;
}

// ---- Orders ----

export type OrderStatus = 'OPEN' | 'SHIPPED' | 'ALL';

export interface OrderItem {
  orderItemId: string;
  ean: string;
  title: string;
  quantity: number;
  unitPrice: number;
  fulfilmentMethod: FulfilmentMethod;
  latestDeliveryDate?: string;
}

export interface Order {
  orderId: string;
  orderPlacedDateTime: string;
  customerDetails?: {
    shipmentDetails?: {
      salutationCode?: string;
      firstName?: string;
      surname?: string;
      streetName?: string;
      houseNumber?: string;
      zipCode?: string;
      city?: string;
      countryCode?: string;
      email?: string;
    };
  };
  orderItems: OrderItem[];
}

export interface OrdersPage {
  orders: Order[];
}

// ---- Shipments ----

export interface CreateShipmentRequest {
  orderItems: Array<{
    orderItemId: string;
    quantity: number;
  }>;
  shipmentReference?: string;
  shippingLabelId?: string;
  transport?: {
    transporterCode: string;
    trackAndTrace: string;
  };
}

// ---- Process Status ----

export type ProcessStatusType = 'PENDING' | 'SUCCESS' | 'FAILURE' | 'TIMEOUT';

export interface ProcessStatus {
  processStatusId: string;
  entityId?: string;
  eventType: string;
  description: string;
  status: ProcessStatusType;
  errorMessage?: string;
  createTimestamp: string;
  links: Array<{ rel: string; href: string; method: string }>;
}

// ---- Webhooks ----

export type SubscriptionEvent =
  | 'PROCESS_STATUS'
  | 'ORDER_PLACED'
  | 'SHIPMENT_CUSTOMER_DELIVERED'
  | 'RETURN_REQUESTED'
  | 'RETURN_HANDLED';

export interface CreateSubscriptionRequest {
  url?: string;
  enabled: boolean;
  resources: SubscriptionEvent[];
}

export interface Subscription {
  subscriptionId: string;
  url?: string;
  enabled: boolean;
  resources: SubscriptionEvent[];
}
