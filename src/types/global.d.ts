
type RemoveCartItemProps = {
  imageLink: string;
  uid: string
};
type BottomCartProps = {
  ButtonType: string;
  navLink: string,
  totalAmount: number,
  discount: number
};

type DeliveryDetailsType = {
  address: string;
  type: string;
  orderId: string;
  date: string;
  orderItem: string;
  beverages: string;
  personName: string;
  mobileNumber: string;
  email: string,
  charges: number;
  vatCharge: number;
  discountRate: number;
  homePagediscountRate: number,
  homePagediscountPrice: number,
  restaurantName: string;
  supportMail: string;
  supprotMobile: string;
  demoPDFurl: string
};
type savedAddress = {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
}
type userDatailsType = {
  id: string,
  name: string | undefined,
  mobileNo: string,
  email?: string | undefined,
  avatar?: string | undefined,
  orderCount?: number;
  address?: savedAddress[]
}
type CategoryFrequency = {
  category: string;
  count: number;
};
type BestSellerMenuType = {
  id: string,
  title: string,
  description: string,
  price: number,
  image: Image,
  category: 'deals' | 'forOne' | 'forSharing' | 'sidesDeserts' | 'beverages' | 'bestSeller',
}
type MenuOptionChoice = {
  id: string;
  name: string;
  image?: Image;
  price?: number;
  default?: boolean;
};

type MenuOptionGroup = {
  id: string;
  title: string;
  type: "single" | "multiple" | "quantity";
  required?: boolean;
  min?: number;
  max?: number;
  choices: MenuOptionChoice[];
};

type menuDataType = {
  uid: string
  id: number,
  name: string,
  description: string[],
  price: number,
  oldPrice: number,
  currency: string,
  tag: string,
  image: Image | string,
  isFavorite: boolean,
  customizable: boolean,
  customization?: MenuOptionGroup[];
  categories: string[],
}

type CartItemType = {
  cartUid: number;
  menuItemUid: string;
  name: string;
  description: string[];
  price: number;
  oldPrice: number;
  image: string;
  categories: string[];
  quantity: number;
  selectedOptions?: {
    groupId?: string;
    choiceId?: string[];
  }[];
};

type OrderHistory = {
  id: number,
  Items: CartItemType[],
  date: string,
  orderId: string,
  status: string,
  paymentMode: string,
  paymentId: string | undefined
}
type DealsAndOffersDataType = {
  title: string,
  desc: string,
  discount: number,
  discountPercentage: number,
  offerCode: string
}
type OrderStatusPageProps = {
  currentOrders: CartItemType[],
  orderId: string | undefined,
  OrderDate: string,
  OrderTime: string,
  paymentMode: string,
  vatAmount: number,
  GrandTotal: number,
  SubTotal: number,
  deliveriCharge: number,
  orderStatus: boolean
}
type FoodCustomizationProps = {
  foodHeaderName: string
}
type CropResult = {
  uri: string;
  width: number;
  height: number;
  target: number;
};

type Coordinate = {
  latitude: number;
  longitude: number;
};
type SearchPageProps = {
  searchTerm: string
}
interface AddressBox {
  address: string;
  buildingName: string;
  flatNo: string;
}
interface PaymentResult {
  success: boolean;
  payment_id?: string;
}
type FaqItem = {
  question: string;
  answer: string;
};
type GradientStop = {
  offset: string;
  color: string;
  opacity: string
};