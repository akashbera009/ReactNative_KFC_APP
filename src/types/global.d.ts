
type RemoveCartItemProps = {
    imageLink: ImageSourcePropType;
    // onConfirmDelete: ()=>void
    idx: number
};
type BottomCartProps = {
  ButtonType: string;
  navLink: string,
  totalAmount: number
};

type DeliveryDetailsType = {
  address: string;
  type: string;
  orderId: string;
  date: string;
  orderItem: string;
  beverages: string;
  personName: string;
  mobileNumber: string ; 
  charges: number;
  vatCharge: number; 
  discountRate: number
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
  id: number , 
  name: string,
  description: string[],
  price: number,
  oldPrice: number,
  tag: string,
  image: Image,
  isFavorite: boolean,
  customizable: boolean,
  categories: string[],
  quantity : number, 
}
