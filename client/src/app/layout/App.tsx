import { useEffect, useState } from "react"
import { Product } from "../models/interfaces";
import Catalog from "../../features/catalog/Catalog";





function App() {
 
const [products, setProducts]=useState<Product[]>([]);
const [counter, setCounter] = useState(0);

useEffect(()=>{
  fetch("http://localhost:5047/api/products")
  .then(response=> {
    console.log(response)
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
   pictureUrl: "",
   type: "",
   brand: "",
   quantityInStock: 0
 }
//  const newProducts: Product[] = [...products, product]; 
 setProducts([...products, product]);
}
  return (
  
      <div>
        
       <h1>Re-Store</h1>
       <Catalog products={products} addProduct={addProduct}/>
       
      </div>
      
  )
}

export default App
