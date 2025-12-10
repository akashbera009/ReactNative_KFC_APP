import { configureStore, combineReducers } from '@reduxjs/toolkit'
// reducers
import menuReducer from '../features/menuSlice'
import cartReducer from '../features/cartSlice'
import orderReducer from '../features/orderSlice'
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
    menuData: menuReducer,
    orders: orderReducer
})
let persistedReducer = persistReducer(persistConfig, roorReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;