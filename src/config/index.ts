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
    currency: "AED" as const,
    code: "ae",
  },
  {
    title: "Saudi Arabia",
    icon: Icons.saFlag,
    currency: "SAR" as const,
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
    data: [
      {
        _id: "6076a3d012f9fb2ba456c55a",
        id: "79476454-f401-4d5f-901a-88eccadb7bbc",
        title: "Vicks Steam Inhaler + Vapopads 2's",
        inventory: {
          sku: "117291",
          quantity: null,
          upc: "4022167130211",
        },
        is_taxable: true,
        sku: "117291",
        active: true,
        category: [],
        brand: {
          _id: "61023fb894b76077e663e0ae",
          id: "857b8ae5-5033-4679-8e4e-440f03bdc958",
          name: "VICKS",
          name_ar: null,
          description:
            '<p>Introducing Vicks, the Brand that Delivers Quality and Style.&nbsp;</p><p>At Life Pharmacy, we are dedicated to providing our customers with the best Medicines products online from trusted brands.</p><p><strong>&nbsp;About Vicks&nbsp;</strong></p><p>Vicks is a well-known brand of over-the-counter <a href="https://www.lifepharmacy.com/category/medicines/self-medications/cough-remedies">cough and cold remedies</a>, including cough drops, vapor rubs, and humidifiers. Their products are designed to relieve symptoms associated with coughs, colds, and congestion, providing relief for respiratory discomfort.</p><p>Our product range includes a wide variety of Medicines products, including Vicks Vaporub 100G, Vicks Steam Inhaler + Vapopads 2S, and Vicks Sinus Inhaler. Each product has been carefully designed and tested to ensure that it meets our high standards. All of our products are available in a wide range so customers can choose the one that best fits their needs.</p><p><strong>Where to Buy?</strong></p><p>Vicks products are available at Life Pharmacy, both online and offline. Check out our website for a wide range of products to choose from and get them delivered to your doorsteps!<br>&nbsp;</p>',
          description_ar: null,
          active: true,
          images: {
            logo: "https://life-cdn.lifepharmacy.com/brand-logos/vicks.png",
            banner: null,
          },
          seo: {
            seo_title:
              "Vicks - Buy Vicks Products Online At Best Price in UAE | Life Pharmacy",
            seo_description:
              "Vicks - Buy Vicks Products online from Life Pharmacy, UAE's trusted online pharmacy. Explore a wide range of Vicks products at best price. Shop Now!",
            seo_title_ar: null,
            seo_description_ar: null,
          },
          updated_at: "2023-07-31T10:10:39.245000Z",
          created_at: "2021-07-29T05:42:16.290000Z",
          slug: "vicks",
          featured: false,
          short_description:
            "Vicks is a well-known brand of over-the-counter cough and cold remedies, including cough drops, vapor rubs, and humidifiers. Their products are designed to relieve symptoms associated with coughs, colds, and congestion, providing relief for respiratory discomfort.",
          short_description_ar: null,
          visibility: 2,
          brand_url: "brand/vicks",
        },
        price: "28.5200000000000000",
        description:
          "<p>Personal steam inhaler to inhale vapors in conditions such a common cold,cough and flu. Provides a soothing steam that quickly opens the blocked nose. 2 vicks vapo pads included in box.</p><p>Vicks Steam Inhaler allows you to breathe in soothing vapors of VapoPads. Its unique concept melts soothing scents with hot steam to relieve coughing and colds.</p><h4>It works as follows:</h4><ul><li>Simply fill the inhaler xith hot water and add Vicks Vapopads (deux included: mint and rosemary-lavender).</li><li>The scents are melted with hot water steam</li><li>Cone shape designed like a fulnnel to release easily the vapour</li><li>Soothing vapors help relieve nasal and sinus congestion and parched throat.</li></ul><h4>How To Use:</h4><p>Fill the device with hot water, and add the Vapopads. Put your face over the device and breathe in.</p>",
        short_description:
          "<ul><li>Add one Vicks scent pad at every use, to create soothing vapors that penetrate nasal, throat and sinus passages to instantly relieve cold and flu symptoms</li><li>Easy to use and store</li><li>Leak proof design prevents spills</li><li>Compact, ideal for home or travel use</li><li>Dishwasher safe</li><li>2 scent pads included</li></ul>",
        images: {
          featured_image:
            "https://life-cdn.lifepharmacy.com/archieved-images/media/catalog/product/1/1/117291-vicks_steam_inhaler_vapopads_2s2.jpg",
          other_images: [],
          gallery_images: [
            {
              image:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads-1024x1024.jpg",
              thumbnail:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads-150x150.jpg",
              medium:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads-300x300.jpg",
              full: "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads-1024x1024.jpg",
            },
            {
              image:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_2s2-1024x1024.jpg",
              thumbnail:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_2s2-150x150.jpg",
              medium:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_2s2-300x300.jpg",
              full: "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_2s2-1024x1024.jpg",
            },
            {
              image:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_2s03-1024x1024.jpg",
              thumbnail:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_2s03-150x150.jpg",
              medium:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_2s03-300x300.jpg",
              full: "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_2s03-1024x1024.jpg",
            },
            {
              image:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_24-1024x1024.jpg",
              thumbnail:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_24-150x150.jpg",
              medium:
                "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_24-300x300.jpg",
              full: "https://life-cdn.lifepharmacy.com/images/products/117291-vicks_steam_inhaler_vapopads_24-1024x1024.jpg",
            },
          ],
        },
        updated_at: "2024-01-10T05:20:28.416000Z",
        created_at: "2021-04-14T08:12:00.224000Z",
        categories: [
          {
            id: "e3d599ae-61a1-435c-a856-e753ff8f6c2f",
            name: "Cold & Flu",
            slug: "cold-flu",
          },
        ],
        ranking: 8,
        rankings: 15410,
        slug: "vicks-steam-inhaler-vapopads-2-s",
        filter_price: 29.95,
        collection: {
          _id: "6134803b573ba3780a102daf",
          id: "9697e666-58a2-44da-bf13-79aeed25e33a",
          name: "Save more with life",
          name_ar: null,
          active: true,
          images: {
            logo: null,
            banner: null,
          },
          seo: {
            seo_title: null,
            seo_description: null,
            seo_title_ar: null,
            seo_description_ar: null,
          },
          parent_id: null,
          updated_at: "2021-09-05T08:30:51.800000Z",
          created_at: "2021-09-05T08:30:51.800000Z",
        },
        out_of_stock: false,
        collections: [
          {
            id: "097d3db7-9bce-4e3e-bf90-d094b64e6849",
            name: "Deals Under 49",
            slug: "deals-under-49",
          },
          {
            id: "1abb6e11-97a4-4bd1-ae4a-c42b1908bd3a",
            name: "Mega Discount",
            slug: "mega-discount",
          },
          {
            id: "46e050d5-8b8f-4f34-a622-19dbd18fb340",
            name: "Deals",
            slug: "deals",
          },
          {
            id: "8723d872-454b-409c-bc73-b0a6a4ffa9ce",
            name: "Winter Special Deals",
            slug: "special-deals",
          },
          {
            id: "97ae3e3f-15f2-4e40-9ef2-369b864e779d",
            name: "Saudi Top Sellers",
            slug: "saudi-top-sellers",
          },
          {
            id: "d3543d82-b65b-4aec-b433-7c6ea737e7a4",
            name: "Price Drop",
            slug: "price-drop",
          },
          {
            id: "ec6c2b5e-d1b4-4462-ab52-e2182f7176a1",
            name: "Winter Essentials",
            slug: "winter-essentials",
          },
          {
            id: "da408b4b-3271-4d5c-8ff5-7a35d4bb67f5",
            name: "DSF Special Deals",
            slug: "dsf-special-deals",
          },
        ],
        description_ar:
          "<p>جهاز استنشاق بخار شخصي لاستنشاق الأبخرة في ظروف مثل نزلات البرد والسعال والإنفلونزا. يوفر بخارا مهدئا يفتح الأنف المسدود بسرعة. 2 فيك منصات فابو المدرجة في مربع.</p><p>يسمح لك جهاز الاستنشاق بالبخار Vicks بالتنفس في أبخرة مهدئة من VapoPads. مفهومها الفريد يذوب الروائح المهدئة مع البخار الساخن لتخفيف السعال ونزلات البرد.</p><p>وهو يعمل على النحو التالي:</p><p>-ما عليك سوى ملء جهاز الاستنشاق بالماء الساخن وإضافة Vicks Vapopads (بما في ذلك: النعناع وإكليل الجبل والخزامى).<br>-تذوب الروائح ببخار الماء الساخن<br>-شكل مخروطي مصمم مثل الفولنيل لإطلاق البخار بسهولة<br>-تساعد الأبخرة المهدئة على تخفيف احتقان الأنف والجيوب الأنفية وجفاف الحلق.</p><p>طريقة الاستخدام:</p><p>املأ الجهاز بالماء الساخن ، وأضف Vapopads. ضع وجهك على الجهاز وتنفس فيه.</p>",
        is_express_disabled: false,
        is_instant_disabled: false,
        max_salable_qty: null,
        options: [
          {
            key: "",
            value: "",
            order: 1,
          },
        ],
        seo: {
          seo_title: "Buy Vicks Steam Inhaler + Vapopads 2's | Life Pharmacy",
          seo_description:
            "Buy Vicks Steam Inhaler + Vapopads 2's at best price from Life Pharmacy. Choose from wide range of Cold & Flu products from all the Top brands. Delivered in 30 minutes at your doorstep. Shop Now!",
          seo_title_ar: "فيكس جهاز الاستنشاق بالبخار + Vapopads 2",
          seo_description_ar: "<p>فيكس جهاز الاستنشاق بالبخار + Vapopads 2</p>",
        },
        short_description_ar:
          "<p>-أضف وسادة عطر Vicks واحدة في كل استخدام ، لإنشاء أبخرة مهدئة تخترق ممرات الأنف والحلق والجيوب الأنفية لتخفيف أعراض البرد والإنفلونزا على الفور<br>-سهل الاستخدام والتخزين<br>-تصميم مقاوم للتسرب يمنع الانسكابات<br>-صغير الحجم ومثالي للاستخدام المنزلي أو السفر<br>-آمن للغسل في غسالة الصحون<br>-يشمل 2 وسادات عطرية</p>",
        tags: null,
        title_ar: "فيكس جهاز الاستنشاق بالبخار + Vapopads 2",
        label: null,
        unitprice: 28.52,
        vat_p: 5,
        popularity: -78,
        tax_rate: "VAT5%",
        unit: "Each",
        availability: {
          instant: {
            is_available: false,
            qty: 0,
            store_code: null,
          },
          express: {
            is_available: false,
            qty: 0,
            store_code: "ECOM",
          },
          standard: {
            is_available: false,
            qty: 0,
            store_code: null,
          },
        },
        ax_price_without_vat: null,
        sale_price: 22,
        wh_type: null,
        offers: {
          id: "LPH-D-003564",
          start_at: "2023-12-26 00:00:00",
          end_at: "2024-01-31 00:00:00",
          is_special: "20.95",
          test_text_do_not_use: "20.95",
          exclude: false,
          type: "flat_percentage_discount",
          value: 26.542,
          offer_amount: "7.56",
          deleted_at: null,
        },
        prices: [
          {
            country_code: "ae",
            currency: "AED",
            price: {
              offer_price: 22,
              regular_price: 29.95,
              member_price: 0,
              subscription_price: 22,
            },
          },
          {
            country_code: "sa",
            currency: "SAR",
            price: {
              offer_price: 29.95,
              regular_price: 29.95,
              member_price: 0,
              subscription_price: 22,
            },
          },
          {
            country_code: "om",
            currency: "OMR",
            price: {
              offer_price: 2.99,
              regular_price: 2.99,
              member_price: 0,
              subscription_price: 22,
            },
          },
        ],
        disable_intl: false,
        hide_from_search: false,
        min_cart_value: 0,
        min_salable_qty: 0,
        pre_order: false,
        standard_only: false,
        type: "otc",
        weight: 0,
        is_subscription_enabled: false,
        schedule: null,
        qty: 0,
        reorder: "",
        availability_new: [
          {
            slot: {
              id: 382,
              geofence_id: 247,
              slot_meta_id: 8,
              active: true,
              active_from: null,
              active_till: null,
              created_at: "2023-04-10T10:02:54.000000Z",
              updated_at: "2023-04-10T10:02:54.000000Z",
              fees: "30.00",
              title: "Intl Delivery | 2-3 Days",
              subtitle: "Delivery fee varies by weight",
              label: null,
              in_minutes: 4320,
              selected: null,
              unavailable_text: null,
              created_by: 1,
              shipment_label: "standard",
              surcharge: "5.00",
              min_cart_total: "1.00",
              time: "2 - 3 days",
              time_label: "IN 2 - 3 days",
              self_pickup_label: null,
            },
            store_code: "ECOM",
            qty: 2274,
          },
        ],
        in_stock: 10,
        rating: "3.9",
        vat_percentage: 5,
        maximum_salable_qty: 10,
        search_offer: null,
        product_url: "product/vicks-steam-inhaler-vapopads-2-s",
        oos: true,
        unit_price: 29.95,
        offer_price: 22,
        member_price: 0,
      },
    ],
  },
};

const currentDate = new Date();

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
