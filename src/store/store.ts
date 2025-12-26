import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
// reducers
import menuReducer from '../features/menuSlice'
import cartReducer from '../features/cartSlice'
import orderReducer from '../features/orderSlice'
import favouriteReducer from '../features/favoriteSlice'
import userReducer from '../features/userSlice'
import BiometricAuthSlice from '../features/biometricSlice'
// persist 
import { persistReducer} from 'redux-persist'
// storage 
import AsyncStorage from '@react-native-async-storage/async-storage'

let persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cart','favourite' ,'orders' ],
    blacklist: ['bioAuth']
}
let rootReducer = combineReducers({
    cart: cartReducer,
    menuData: menuReducer,
    orders: orderReducer,
    favourite: favouriteReducer,
    users: userReducer, 
    bioAuth : BiometricAuthSlice
})
let persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();