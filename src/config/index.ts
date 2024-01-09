import { Icons } from "@/components/Icons";
import { Modals } from "@/components/modals/modals";
import { CountryCode } from "@/types/products";
import { Address, Type } from "@/types/session";

export const CATGEORY_ITEMS = ["BRANDS", "OFFERS", "HEALTH PACKAGES"];

export const SORT_BY_ITEMS = [
  { id: 1, slug: "popularity", label: "Most Popular" },
  { id: 2, slug: "most-rated", label: "Most Rated" },
  { id: 3, slug: "price-asc", label: "Price: Low to High" },
  { id: 4, slug: "price-desc", label: "Price: High to Low" },
];

export const LIST_VIEW_TYPES = [
  { id: 1, slug: "list", label: "View by row" },
  { id: 2, slug: "cols", label: "View by cols" },
];

export const FALLBACK_SETTINGS = {
  desktop: {
    row: 1,
    column: 1,
  },
  mobile: {
    row: 1,
    column: 1,
  },
  autoplay: false,
  background_color: "white",
};

export const SERVICES = [
  {
    title: "Free Delivery",
    description: "For all orders over AED 29",
    img_slug: "ecommerce-gift",
  },
  {
    title: "Easy Return",
    description: "Easy return and refund",
    img_slug: "ecommerce-return",
  },
  {
    title: "Secure Payments",
    image_src: "https://www.lifepharmacy.com/images/payment-method.svg",
    img_slug: "ecommerce-shield",
  },
  {
    title: "24/7 Support",
    description: "Dedicated Support",
    img_slug: "ecommerce-phone",
  },
];

export const COUNTRIES = [
  {
    title: "United Arab Emirates",
    icon: Icons.aeFlag,
    currency: "AED",
    code: "ae",
  },
  {
    title: "Saudi Arabia",
    icon: Icons.saFlag,
    currency: "AED",
    code: "sa",
  },
];

export const LANGUAGES = [
  { title: "العربية", code: "ar", openGraphLocale: "ar_EG" },
  { title: "English", code: "en", openGraphLocale: "en_US" },
];

export const STORE_DATA_INIT = {
  user: {},
  auth: {
    busy: false,
    deliver: "",
    loggedIn: false,
    redirect: "/dashboard",
    strategy: "local",
    user: false,
  },
  geoLocation: {
    country: "ae" as CountryCode,
    dismiss: true,
    label: "",
    language: "en",
    latitude: 25.095437,
    longitude: 55.152684,
    new_method: true,
    type: "default",
  },
  boostiny: {
    click_id: null,
    traffic_source: null,
  },
  cart: {
    cart: null,
    cartId: 0,
    data: [],
    deliveryAllTogether: false,
    deliveryFee: {
      express: false,
      instant: false,
    },
    gtmOrders: [],
  },
  clinic: {
    clinic: null,
    patient: null,
  },
  compare: {
    data: [],
  },
  demo: {
    campaign: 0,
    region: true,
    showNewsletter: true,
  },
  i18n: {
    routeParams: {},
  },
  queryId: null,
  utm: {
    campaign_id: null,
    expiry_date: null,
    referrer: null,
    utm_campaign: null,
    utm_medium: null,
    utm_source: null,
  },
  wishlist: {
    data: [],
  },
};

const currentDate = new Date()

export const DEFAULT_ADDRESS: Address = {
  name: "",
  phone: "",
  longitude: "55.276383",
  latitude: "25.192622",
  type: "Home" as Type,
  country: "United Arab Emirates",
  state: "Business Bay",
  city: "Business Bay",
  area: "",
  street_address: "",
  building: "",
  flat_number: "",
  suitable_timing: "Morning",
  created_at: currentDate.toISOString(),
  updated_at: currentDate.toISOString(),
  google_address: "Dubai, United Arab Emirates",
  additional_info: "",
  belongs_to: "user",
  deleted_at: null,
  is_validated: 0,
  area_name: null,
};

export const DELIVERY_OPTIONS = [
  {
    title: "Home Delivery",
    value: "home_delivery",
  },
  {
    title: "Collect From Store",
    value: "collect_from_store",
  },
];

export const ADDRESS_TYPES = [
  {
    title: "Home",
  },
  {
    title: "Work",
  },
  {
    title: "Other",
  },
];
