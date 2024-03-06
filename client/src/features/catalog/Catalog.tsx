import { Product } from "../../app/models/interfaces";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import Agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";





export default function Catalog(){
    const [products, setProducts]=useState<Product[]>([]);
    const[Loading, setLoading]=useState(true);

useEffect(()=>{
  Agent.Catalog.list()
  .then(products => setProducts(products)) 
  .catch(error=>console.log(error))
  .finally(()=>setLoading(false)) 
},[])

if(Loading) return <LoadingComponent message="Loading products..."/>

    return(
        <>
        <ProductList products={products}/>
       </>
    )
}