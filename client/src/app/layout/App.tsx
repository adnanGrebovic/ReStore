import { useEffect, useState } from "react"
import { Product } from "../models/interfaces";





function App() {
 
const [products, setProducts]=useState<Product[]>([]);
const [counter, setCounter] = useState(0);

useEffect(()=>{
  fetch("http://localhost:5047/api/products")
  .then(response=>response.json())
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
       <ul>
        {products.map(product=>(
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
       </ul>
       <button onClick={addProduct}>Add Product</button>
      </div>
      
  )
}

export default App
