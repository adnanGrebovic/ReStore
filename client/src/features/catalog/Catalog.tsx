import { Product } from "../../app/models/interfaces";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from "@mui/material";
import ProductList from "./ProductList";


interface Props{
    products: Product[];
    addProduct: ()=>void;
}


export default function Catalog({products, addProduct}:Props){
    return(
        <>
        <ProductList products={products}/>
       <Button variant='contained' onClick={addProduct}>Add Product</Button>
       </>
    )
}