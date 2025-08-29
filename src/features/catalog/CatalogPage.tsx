
import ProductList from "./ProductList.tsx";
import { CircularProgress } from "@mui/material";
import { fetchProducts, selectAllProducts } from "./catalogSlice.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";



export default function CatalogPage()
{
      const products = useAppSelector(selectAllProducts);
      const { status, isLoaded } = useAppSelector(state => state.catalog);
      const dispatch = useAppDispatch();
      
      useEffect(() => {
            if(!isLoaded){
                  dispatch(fetchProducts());
            }
          
      }, [isLoaded]);
          if(status === "pendingFetchProducts") return <CircularProgress />
         
      return (
            <ProductList products={products} />
      );
}