import { configureStore, combineReducers } from '@reduxjs/toolkit'
import menuDataReducer from '../features/menuDataSlice'
import cartReducer from '../features/cartSlice'
// persist 
import { persistReducer} from 'redux-persist'
// storage 
import AsyncStorage from '@react-native-async-storage/async-storage'

let persistConfig = {
    key: 'root',
    storage: AsyncStorage
}
let roorReducer = combineReducers({
    cart: cartReducer,
    menuData: menuDataReducer
})
let persistedReducer = persistReducer(persistConfig, roorReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})