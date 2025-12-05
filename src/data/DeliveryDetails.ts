import Images from "../utils/LocalImages";
import { useStrings } from "../utils/Strings";
const DeliveryDetails: DeliveryDetailsType = {
    address: 'H1-H2, Second floor, Malviya Nagar, SL Marg, Lal Bahadur Nagar, Jaipur, Rajasthan 302018',
    type: 'work',
    orderId: 'UAE-528',
    date: '22 Oct 2019',
    orderItem: "2 Twister BBQ Box , 1 Twister BBQ Box",
    beverages: 'Pepsi - Medium ',
    personName: 'Akash Bera',
    mobileNumber: '75860 68924',
    email: 'akashbera102003@gmail.com',
    charges: 40,
    vatCharge: 5,
    discountRate: 4,
    homePagediscountRate: 10,
    homePagediscountPrice: 100,
    restaurantName: "Shop no. 1, Al Diyafah Bldg, Hana Center - Al Mankhool Rd - Dubai - United Arab Emirates",
    supportMail: 'support@americana-food.com',
    supprotMobile: '600522252'
}
const savedCards = [
    {
        bank: 'Emirates Investment Bank',
        last: '9675',
        type: 'Credit Card',
        color: '#6dc8f9ff'
    },
    {
        bank: 'Emirates Investment Bank',
        last: '4411',
        type: 'Credit Card',
        color: '#a46ef7ff'
    },
    {
        bank: 'Mashreq Bank',
        last: '5521',
        type: 'Credit Card',
        color: '#fc8a8aff'
    }
];
const otherPaymentOption =
    [ 
        { icon: Images.CredtiCardStack, label: 'Add Credit/Debit Card' },
        { icon: Images.ApplePay, label: 'Samsung Pay', offer: '15% Off on Samsung Pay' },
        { icon: Images.ClickToPay, label: 'Click to pay' },
        { icon: Images.CashIcon, label: 'Pay By Cash'}
    ]

export { DeliveryDetails, savedCards, otherPaymentOption }; 