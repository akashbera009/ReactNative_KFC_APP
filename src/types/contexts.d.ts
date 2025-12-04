type ColorContextType = {
  isDarkMode: boolean,
  setIsDarkMode: (mode: boolean) => void;
};
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};
type CountryContextType = {
  countrySelected: countryType;
  setCountrySelected: (con: countryType) => void;
};
type CartContextType = {
  CartItem: CartItemType[],
  setCartItem: React.Dispatch<SetStateAction<CartItemType[]>>
}
type MenuContextType = {
  menuItem : menuDataType[] ; 
  setMenuItem : React.Dispatch<SetStateAction<menuDataType[]>>
}
type countryType = {
  name: string,
  flag: Image,
  code: string,
  mobileCode: string,
  mobileNoLength: number,
  mobileNoFraction: number,
  currencyCode: string
}
type OrderQueueContextType ={
 orderQueueItem : OrderHistory[]
 setOrderQueueItem : React.Dispatch<SetStateAction<OrderHistory[]>>
}