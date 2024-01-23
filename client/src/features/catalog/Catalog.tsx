import { Product } from "../../app/models/interfaces";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";


interface Props{
    products: Product[];
    addProduct: ()=>void;
}


export default function Catalog({products, addProduct}:Props){
    return(
        <>
        <List>
        {products.map(product=>(
          <ListItem key={product.id}>
            <ListItemAvatar>
                <Avatar src={product.pictureUrl}/>
            </ListItemAvatar>
            <ListItemText>
                {product.name} - {product.price}
            </ListItemText>
          </ListItem> 
        ))}
       </List>
       <Button variant='contained' onClick={addProduct}>Add Product</Button>
       </>
    )
}