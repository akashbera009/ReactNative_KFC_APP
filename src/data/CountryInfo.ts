import Images from '../utils/LocalImages'

export const CountryInfo: countryType[] = [
    {
        name: 'UAE',
        flag: Images?.UAE_FLAG,
        code: 'uae',
        mobileCode: '+971',
        mobileNoLength: 9,
        mobileNoFraction: 3, 
        currencyCode: 'AED',
    },
    {
        name: 'India',
        flag: Images?.Indian_Flag,
        code: 'in',
        mobileCode: '+91',
        mobileNoLength: 10,
        mobileNoFraction: 5 ,
        currencyCode: 'INR',
    },
    {
        name: 'Kuwait',
        flag: Images?.Kuwait_Flag,
        code: 'kw',
        mobileCode: '+965',
        mobileNoLength: 8,
        mobileNoFraction: 4,
        currencyCode: 'KWD',
    },
]