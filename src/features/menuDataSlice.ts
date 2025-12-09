import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuDate:[{
        id: 1 , 
        text: '',
        isFavourite : false
    }]
}

const menuDataSlice = createSlice({
    name: 'menuData',
    initialState,
    reducers:(create)=>({
        addMenu : create.preparedReducer(
            (text: string , isFavorite: boolean)=>{
                return {payload:{
                    id: Date.now(), 
                    text , 
                    isFavourite : isFavorite ?? false
                }}
            },
            (state , action )=>{
                state.menuDate.push(action.payload)
            }
        )
    })
})
export const {addMenu} = menuDataSlice.actions
export default menuDataSlice.reducer ;