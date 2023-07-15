const { createSlice } = require("@reduxjs/toolkit");


const filterSlice=createSlice({
    name:"filter",
    initialState:{
        products: [],
        onlyInStock: false,
        bestSellerOnly: false,
        sortBy: null,
        ratings: null
    },
    reducers:{
        initialProductList(state,action){
           const updatedProductList=action.payload;
            return {...state,products:updatedProductList}
        },
       
         bestSeller(state){
            state.bestSellerOnly=!state.bestSellerOnly;
        },
        inStock(state){
            state.onlyInStock = !state.onlyInStock;
        },
         sort(state,action){
            state.sortBy = action.payload;
        },
         rating(state,action){
            state.ratings=action.payload;
        },
        clear(state,action){
            state.onlyInStock= false;
            state.bestSellerOnly= false;
            state.sortBy=null;
            state.ratings= null;
        }


    }
})

export const { initialProductList,bestSeller,inStock,sort,rating,updatedFilterList ,clear} = filterSlice.actions;

export const filterReducer=filterSlice.reducer;