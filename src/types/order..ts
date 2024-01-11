import { Items } from "./cart";
import {
  Inventory,
  PriceElement,
  ProductImages,
  Slot,
} from "./products";
import { Address, UserObject } from "./session";

export interface Order {
  success: boolean;
  message: boolean;
  data: OrderData;
}

export interface OrderData {
  id: number;
  user_id: number;
  address_id: number;
  items: OrderItems[];
  type: string;
  discount: number;
  tax: number;
  total: number;
  order_id: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  sub_total: number;
  delivery_fees: number;
  is_instant_requested: number;
  cod_charge: number;
  deleted_at: null;
  user_details: UserObject;
  address_details: Address;
  cart_id: number;
  is_leave_at_door_requested: number;
  channel: string;
  meta_details: MetaDetails;
  instant_not_requested: null;
  item_discount: number;
  order_discount: number;
  notes: null;
  additional_charges: number;
  additional_charges_label: null;
  self_pickup: boolean;
  insurance: number;
  driver_tip: null;
  sub_orders: SubOrder[];
  payment_status: string;
  status_label: string;
  is_order_returnable: boolean;
  address: Address;
  transactions: Transaction[];
}

export interface OrderItems extends Items {
  tax: number;
  bundle_id: string;
  product_details: OrderProductDetails;
  tax_rate: string;
  unit: string;
  is_returnable?: boolean;
  rating?: null;
}

export enum CountryCode {
  AE = "ae",
  Om = "om",
  Sa = "sa",
}

export enum Currency {
  Aed = "AED",
  OMR = "OMR",
  Sar = "SAR",
}

export interface PricePrice {
  offer_price: number;
  regular_price: number;
  member_price: number;
  subscription_price: number;
}

export interface OrderProductDetails {
  id: string;
  title: string;
  inventory: Inventory;
  is_taxable: boolean;
  sku: string;
  active: boolean;
  prices: PriceElement[];
  images: ProductImages;
  type: string;
  slug: string;
  vat_percentage: number;
  maximum_salable_qty: number;
  tax_rate: string;
  unit: string;
}

export interface MetaDetails {
  latitude: string;
  longitude: string;
  created_by: number;
}

export interface SubOrder {
  id: number;
  user_id: number;
  parent_order_id: number;
  address_id: number;
  items: OrderItems[];
  discount: number;
  tax: number;
  total: number;
  net_total: number;
  sub_order_id: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  fulfilment_type: string;
  store_code: string;
  delivery_fees: number;
  cod_charge: number;
  sub_total: number;
  deleted_at: null;
  ax_invoice_number: null;
  ax_status: number;
  ax_logs: string;
  ax_invoice_date: null;
  time_lines: TimeLine[];
  zone_id: null;
  hub_id: null;
  item_discount: number;
  order_discount: number;
  slot: Slot;
  due_time: null;
  type: string;
  additional_charges: null;
  additional_charges_label: null;
  is_cod: null;
  created_by: number;
  slot_time: string;
  status_label: string;
  ax_status_label: string;
  expected_delivery_time: string;
  rating: number;
  channel: string;
  shipment_delivery_label: null;
  shipment: null;
}

export interface TimeLine {
  event_title: string;
  description: string;
  happened: boolean;
  done_by: UserObject | null;
  data: any[];
  timestamp: Date | null;
  status: number;
}

export interface Transaction {
  id: number;
  order_id: number;
  type: string;
  status: number;
  details: Details;
  created_at: Date;
  updated_at: Date;
  method: string;
  user_id: number;
  amount: string;
  purpose: string;
  provider_id: number;
  is_refunded: number;
  remark: null;
  return_order_id: null;
  pgr_aquirer_rrn: null;
  pgr_trans_ref: null;
  pg_apn_aquirer_rrn: null;
  pgr_pr_res_code: null;
  pg_apn_res_pr_res_code: null;
  status_label: string;
}

export interface Details {
  body: any[];
  header: { [key: string]: string[] };
  card_id: null;
  payment_url: string;
  payment_success_url: null;
  payment_fail_url: null;
}
