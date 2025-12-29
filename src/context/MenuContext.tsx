import React, { createContext, useState, ReactNode, useContext } from 'react';
export const MenuCategoryContext = createContext<MenuCategoryContextType | undefined>(undefined);

export const MenuCategoryProvider = ({  children }: { children: ReactNode }) => {
    const [activeCategory, setActiveCategory] = useState<string>('');
    return (
        <MenuCategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
            {children}
        </MenuCategoryContext.Provider>
    );
};

export const useMenuCategory = () => {
    const context = useContext(MenuCategoryContext);
    if (!context) {
        throw new Error('useMenuCategory must be used within a MenuCategoryProvider');
    }
    return context;
};
