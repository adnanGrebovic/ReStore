import { Product } from "../../app/models/interfaces";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ProductList from "./ProductList";
import { useState, useEffect } from "react";





export default function Catalog(){
    const [products, setProducts]=useState<Product[]>([]);

useEffect(()=>{
  fetch("http://localhost:5047/api/products")
  .then(response=> {
    // console.log(response)
    return response.json();
  })
  .then(data=>setProducts(data))
},[])



    return(
        <>
        <ProductList products={products}/>
       </>
    )
}