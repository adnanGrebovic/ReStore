import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";





export default function Catalog(){
    const products= useAppSelector(productSelectors.selectAll);
    const{productsLoaded, status}=useAppSelector(state=>state.catalog);
    const dispatch=useAppDispatch();

useEffect(()=>{
  if(!productsLoaded) dispatch(fetchProductsAsync());
},[productsLoaded, dispatch])

if(status.includes("pending")) return <LoadingComponent message="Loading products..."/>

    return(
        <>
        <ProductList products={products}/>
       </>
    )
}