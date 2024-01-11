import { useState } from "react"





function App() {
 
const [products, setProducts]=useState(
  [
    {name:'product1', price:100},
    {name:'product2', price:200},
  
  ]
);
function addProduct(){
  setProducts(prevState=>
    [...prevState,{name:'product'+(prevState.length+1), price: (prevState.length*100)+100}]);
}
  return (
  
      <div>
        
       <h1>Re-Store</h1>
       <ul>
        {products.map((_item,index )=>(
          <li key={index}>{_item.name} - {_item.price}</li>
        ))}
       </ul>
       <button onClick={addProduct}>Add Product</button>
      </div>
      
  )
}

export default App
