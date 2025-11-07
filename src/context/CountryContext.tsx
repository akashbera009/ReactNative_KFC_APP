import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CountryInfo } from '../data/CountryInfo';

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
    const [countrySelected, setCountrySelected] = useState<countryType>(CountryInfo[0]);
    return (
        <CountryContext.Provider value={{ countrySelected, setCountrySelected }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountry = () => {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error('usecountry must be used within a Country   Provider');
    }
    return context;
}
