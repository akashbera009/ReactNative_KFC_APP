import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CountryInfo } from '../data/CountryInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
    const [countrySelected, setCountrySelected] = useState<countryType>(CountryInfo[0]);

    useEffect(() => {
        const getCountryInfo = async () => {
            const countryCode = await AsyncStorage.getItem('countryCode') // only storing countryCOde
            if (countryCode != null) {
                const currentCountry = CountryInfo.find(item => item?.code === countryCode)
                if(currentCountry)
                    setCountrySelected(currentCountry)
            }
        }
        getCountryInfo()
    }, [])
    useEffect(() => {
        AsyncStorage.setItem('countryCode', countrySelected?.code)
    }, [countrySelected])
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
