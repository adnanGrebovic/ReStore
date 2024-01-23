import { useEffect, useState } from "react"
import { Product } from "../models/interfaces";
import Catalog from "../../features/catalog/Catalog";
import { Typography } from "@mui/material";





function App() {
 
const [products, setProducts]=useState<Product[]>([]);
const [counter, setCounter] = useState(0);

useEffect(()=>{
  fetch("http://localhost:5047/api/products")
  .then(response=> {
    // console.log(response)
    return response.json();
  })
  .then(data=>setProducts(data))
},[])


function addProduct(){
 setCounter(counter+1);
 console.log(counter);
 
 const product : Product = {
   id: counter,
   name: "NOVI PROIZVOD",
   description: "",
   price: counter,
   pictureUrl: "http://picsum.photos/200",
   type: "",
   brand: "",
   quantityInStock: 0
 }
//  const newProducts: Product[] = [...products, product]; 
 setProducts([...products, product]);
}
  return (
  
      <>
        
       <Typography variant='h1'>Re-Store</Typography>
       <Catalog products={products} addProduct={addProduct}/>
       
      </>
      
  )
}

export default App
