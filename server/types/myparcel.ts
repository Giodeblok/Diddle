export type MyParcelCarrier = 1 | 2 | 4;       // 1=PostNL, 2=bpost, 4=DPD
export type MyParcelPackageType = 1 | 2 | 4;   // 1=pakket, 2=brievenbus, 4=brief

export interface MyParcelRecipient {
  cc: string;
  city: string;
  street: string;
  number: string;
  postal_code: string;
  person: string;
  email?: string;
  phone?: string;
}

export interface MyParcelShipmentOptions {
  package_type: MyParcelPackageType;
  only_recipient?: 0 | 1;
  signature?: 0 | 1;
}

export interface MyParcelShipmentInput {
  recipient: MyParcelRecipient;
  options: MyParcelShipmentOptions;
  carrier: MyParcelCarrier;
  reference_identifier?: string;
}

export interface MyParcelCreatedShipment {
  id: number;
  reference_identifier?: string;
  barcode?: string;
  status: number;
  carrier: MyParcelCarrier;
  recipient: MyParcelRecipient;
}

export interface MyParcelShipmentResponse {
  data: {
    ids: Array<{ id: number; reference_identifier?: string }>;
  };
}

export interface MyParcelGetShipmentResponse {
  data: {
    shipments: MyParcelCreatedShipment[];
  };
}

export interface MyParcelTrackTrace {
  barcode: string;
  status: { current: { main: string; final: boolean } };
  history: Array<{ timestamp: string; description: string }>;
}

export interface MyParcelTrackTraceResponse {
  data: {
    tracktraces: MyParcelTrackTrace[];
  };
}

export interface CreateShipmentParams {
  recipient: MyParcelRecipient;
  carrier?: MyParcelCarrier;
  packageType?: MyParcelPackageType;
  onlyRecipient?: boolean;
  requireSignature?: boolean;
  reference?: string;
}
