import React, { createContext, ReactNode, useContext, useState } from 'react';
import { menuData } from '../data/MenuData';

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [menuItem , setMenuItem] = useState<menuDataType[]>(menuData);
    return (
        <MenuContext.Provider value={{ menuItem , setMenuItem }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {     
        throw new Error('useMenu must be used within a Menu Provider');
    }
    return context;
}
