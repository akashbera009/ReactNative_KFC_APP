import React, { createContext, ReactNode, useContext, useState } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [CartItem, setCartItem] = useState<CartItemType[]>([]);
    return (
        <CartContext.Provider value={{ CartItem, setCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {     
        throw new Error('useCart must be used within a Cart Provider');
    }
    return context;
}
