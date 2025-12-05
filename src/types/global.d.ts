
type RemoveCartItemProps = {
  imageLink: ImageSourcePropType;
  idx: number
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
  email: string , 
  charges: number;
  vatCharge: number;
  discountRate: number;
  homePagediscountRate: number,
  homePagediscountPrice: number,
  restaurantName: string;
  supportMail: string;
  supprotMobile: string
};

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
type menuDataType = {
  id: number,
  name: string,
  description: string[],
  price: number,
  oldPrice: number,
  currency: string,
  tag: string,
  image: Image,
  isFavorite: boolean,
  customizable: boolean,
  categories: string[],
}
type CartItemType = {
  id: number,
  name: string,
  description: string[],
  price: number,
  oldPrice: number,
  tag: string,
  image: Image,
  isFavorite: boolean,
  customizable: boolean,
  categories: string[],
  quantity: number,
}
type OrderHistory = {
  Items: CartItemType[],
  date: string,
  orderId: string,
  status: string,
  paymentMode : string , 
  paymentId : string |undefined
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
  orderId: string|undefined,
  OrderDate: string,
  OrderTime: string,
  paymentMode: string,
  vatAmount: number,
  GrandTotal: number,
  SubTotal: number,
  deliveriCharge: number,
  orderStatus: boolean
}