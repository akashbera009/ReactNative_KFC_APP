import Images from "../utils/LocalImages";

export const menuData: menuDataType[] = [
    {
        id: 1,
        name: "Twister BBQ Box",
        description: [
            "1 Chicken Pc - Org",
            "1 Twister - Org",
            "Paper Jack Cheese Tomato",
            "Fries - Regular"
        ],
        price: 22.30,
        oldPrice: 24.70,
        image:Images?.French_Fries_Coke,
        currency: "AED",
        tag: "Previously Ordered",
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "Slides & Deserts", "For Sharing"]
    },
    {
        id: 2,
        name: "Mighty Twist",
        description: [
            "Mighty Zinger",
            "1 Twister - Org",
            "Fries - Regular",
            "Pepsi - Regular"
        ],
        price: 24.00,
        oldPrice: 24.70,
        currency: "AED",
        tag: "",
        image:Images?.Chicken_Nugedts,
        isFavorite: false,
        customizable: true,
        categories: ["Deals" , "For One"]
    },
    {
        id: 3,
        name: "Super Mega Deal",
        description: [
            "12 Chicken pcs",
            "Family fries"
        ],
        price: 24.00,
        oldPrice: 24.70,
        currency: "AED",
        tag: "",
        image:Images?.KFC_Combo_Pack,
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "For Sharing"]
    },
    {
        id: 4,
        name: "Dinner Meal",
        description: [
            "3 Chicken Pc - Orgl",
            "Fries - Regular",
            "Coleslaw",
            "Bun",
            "Pepsi - Regular"
        ],
        price: 24.00,
        oldPrice: 24.70,
        currency: "AED",
        tag: "",
        image:Images?.Chicken_Roll,
        isFavorite: false,
        customizable: true,
        categories: ["Deals"]
    },
    {
        id: 5,
        name: "Mighty Zinger Box",
        description: [
            "Mighty Zinger Sandwich",
            "1 Chicken pc",
            "1 Pepsi - Regular",
            "Fries - Regular"
        ],
        price: 30.40,
        oldPrice: 24.70,
        currency: "AED",
        tag: "",
        image:Images?.Favourite_Combo_Pack,
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "Slides & Deserts" , "For One"]
    },
    {
        id: 6,
        name: "Mighty Zinger",
        description: [
            "2 Chicken breast fillets with KFC’s Spicy Zinger Recipe",
            "1 Fries - Regular",
            "1 Pepsi - Regular"
        ],
        price: 19.54,
        oldPrice: 24.70,
        currency: "AED",
        tag: "",
        image:Images?.Pepsi_Double_Can,
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "Slides & Deserts"]
    },
];

