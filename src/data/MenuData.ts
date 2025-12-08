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
        image: Images?.French_Fries_Coke,
        currency: "AED",
        tag: "Previously Ordered",
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "Slides & Deserts", "For Sharing", "Shrimp"],
        customization: [
            {
                id: "box_size",
                title: "Choose your Box Size",
                type: "single",
                required: true,
                choices: [
                    { id: "medium", name: "Medium Box", default: true },
                    { id: "large", name: "Large Box", price: 4.00 }
                ]
            },
            {
                id: "chicken_flavour",
                title: "Chicken Flavour",
                type: "single",
                required: true,
                choices: [
                    { id: "original", name: "Chicken Pc Original" },
                    { id: "spicy", name: "Chicken Pc Spicy", default: true },
                    { id: "mix", name: "Chicken Pc Mix" }
                ]
            },
            {
                id: "twister_flavour",
                title: "Twister Flavour",
                type: "single",
                choices: [
                    { id: "twister_org", name: "Twister Original" },
                    { id: "twister_spicy", name: "Twister Spicy" },
                    { id: "bbq_org", name: "Twister BBQ Original", default: true },
                    { id: "bbq_spicy", name: "Twister BBQ Spicy" }
                ]
            },
            {
                id: "condiments",
                title: "Customize your Condiments",
                type: "multiple",
                min: 0,
                max: 5,
                choices: [
                    { id: "lettuce", name: "Lettuce" },
                    { id: "american_cheese_regular", name: "American Cheese (Regular)", price: 2, default: true },
                    { id: "american_cheese_extra", name: "American Cheese (Extra)", price: 4 },
                    { id: "pepper_jack", name: "Pepper Jack Cheese", price: 2 },
                    { id: "tomato", name: "Tomato", price: 2 }
                ]
            },
            {
                id: "sides",
                title: "Select one of your Favorite Sides",
                type: "single",
                required: true,
                choices: [
                    { id: "medium_fries", name: "Medium Fries", default: true },
                    { id: "spicy_medium_fries", name: "Spicy Medium Fries", price: 1 },
                    { id: "coleslaw", name: "Coleslaw Salad Small" },
                    { id: "loaded_fries", name: "Loaded Fries", price: 1 }
                ]
            },
            {
                id: "beverage",
                title: "Select Your Favorite Beverage",
                type: "single",
                required: true,
                choices: [
                    { id: "pepsi", name: "Pepsi (Medium)", default: true },
                    { id: "mirinda", name: "Mirinda (Medium)" },
                    { id: "mntdew", name: "Mountain Dew (Medium)" },
                    { id: "diet_pepsi", name: "Diet Pepsi (Medium)" }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Mighty Twist",
        description: [
            "Mighty Zinger",
            "1 Twister - Org",
            "Fries - Regular",
        ],
        price: 24.00,
        oldPrice: 24.70,
        currency: "AED",
        tag: "",
        image: Images?.Chicken_Nugedts,
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "For One"],

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
        image: Images?.KFC_Combo_Pack,
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "For Sharing"],

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
        image: Images?.Chicken_Roll,
        isFavorite: false,
        customizable: true,
        categories: ["Deals"],
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
        image: Images?.Favourite_Combo_Pack,
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "Slides & Deserts", "For One", "SandWich"],

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
        image: Images?.Pepsi_Double_Can,
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "Slides & Deserts", "Shrimp",],
    },
    {
        id: 10,
        name: "Super Bucket 15 Pieces",
        description: [
            "2 Chicken breast fillets with KFC’s Spicy Zinger Recipe",
            "1 Fries - Regular",
            "1 Pepsi - Regular"
        ],
        price: 44.60,
        oldPrice: 54.70,
        currency: "AED",
        tag: "",
        image: Images.Chicken_Bucket,
        isFavorite: false,
        customizable: true,
        categories: ["Deals", "Slides & Deserts", "Shrimp",],
        customization: [
            {
                id: "pieces",
                title: "Total Pieces : 15 Pieces",
                type: "quantity",
                min: 15,
                max: 15,
                choices: [
                    { id: "twister_original", name: "Twister Original" },
                    { id: "twister_spicy", name: "Twister Spicy" }
                ]
            }
        ]
    }

];

