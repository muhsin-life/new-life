import {
  Inventory,
  Offers,
  PriceElement,
  ProductImages,
  Slot,
} from "./products";

export interface OrderListRes {
  success: boolean;
  message: boolean;
  data: OrderList[];
}

export interface OrderList {
  id: number;
  order_id: string;
  type: string;
  status: number;
  created_at: Date;
  items: OrderItem[];
  status_label_text: string;
  created_at_formatted: string;
  header_title: string;
  sub_orders: SubOrder[];
  status_label: string;
  is_order_returnable: boolean;
  buy_again: boolean;
}

export interface SubOrder {
  id: number;
  header_title: string;
  sub_order_id: string;
  created_at: Date;
  created_at_formatted: string;
  shipment_id: null;
  shipment: null;
  parent_order_id: number;
  due_time: null;
  due_time_formatted: string;
  slot: Slot;
  fulfilment_type: string;
  status: number;
  status_label: string;
  status_label_text: string;
  shipment_delivery_label: null;
  items: SubOrderItem[];
  show_tracker: boolean;
  rating: number;
  time_line: TimeLine[];
  rating_text: RatingText;
}

export interface TimeLine {
  order: number;
  label: TimeLineLabel;
  happened: boolean;
  completed_at: null;
  active: boolean;
}
export enum TimeLineLabel {
  Confirmed = "confirmed",
  Delivered = "delivered",
  Processed = "processed",
  Shipped = "shipped",
}

export interface RatingText {
  title: string;
  footer_text: string;
}

export interface SubOrderItem {
  id: string;
  order_id: number;
  sub_order_id: number;
  product_id: string;
  title: string;
  sku: string;
  slug: string;
  unit_price: number;
  qty: number;
  gross_line_total: number;
  offers: Offers | null;
  discount: number;
  line_total: number;
  tax: string;
  copay: string;
  net_line_total: number;
  shipment_label: string | null;
  type: string;
  bundle_id: string;
  tax_rate_id: number;
  unit: string;
  is_returnable: boolean;
  created_at: Date;
  updated_at: Date;
  source_id: null;
  status: number;
  member_discount: number;
  member_discount_offer_id: null;
  extra_discount: number;
  extra_discount_offer_id: null | string;
  requested_qty: null | string;
  removed_qty: null;
  subscription_discount: number | null;
  vat: string;
  product_details: ProductDetails;
  tax_rate: string;
  rating: null;
}

export interface ProductDetails {
  id: string;
  title: string;
  inventory: Inventory;
  is_taxable: boolean;
  sku: string;
  active: boolean;
  prices: PriceElement[] | null;
  images: ProductImages;
  type: string;
  slug: string;
  vat_percentage: number;
  maximum_salable_qty: number;
  tax_rate: string;
  unit: string;
}

export interface OrderItem {
  id: string;
  title: string;
  featured_image: string;
  sku: string;
  slug?: string;
  unit_price: number;
  qty: number;
  gross_line_total: number;
  offers: Offers | null;
  discount: number;
  member_discount?: number;
  member_discount_offer_id?: null;
  reorder?: string;
  is_subscription_enabled?: boolean;
  subscription_title?: null;
  reorder_label?: null;
  subscription_discount?: number;
  line_member_discount?: number;
  line_total: number;
  ax_price_without_vat?: null;
  vat: number;
  net_line_total: number;
  in_stock?: number;
  shipment_label?: string;
  type: string;
  prices: PriceElement[];
  tax: number;
  bundle_id: string;
  product_details: ProductDetails;
  tax_rate: string;
  unit: string;
  rating: number;
  is_returnable: boolean;
  extra_discount?: number;
  extra_discount_offer_id?: string;
  description?: null;
}
