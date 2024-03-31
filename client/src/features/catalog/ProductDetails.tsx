import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/interfaces";
import Agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails(){
    const{basket, setBasket, removeItem}=useStoreContext();
    const {id}=useParams<{id:string}>();
    const[product,setProduct]=useState<Product | null>(null);
    const[loading,setLoading]=useState(true);
    const[quantity, setQuantity]=useState(0);
    const[submitting, setSubmitting]=useState(false);
    const item=basket?.items.find(i=>i.productId===product?.id);

 useEffect(()=>{
    if(item) setQuantity(item.quantity);
    Agent.Catalog.details(Number(id))
    .then(response=>setProduct(response))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
},[id, item])

function handleInputChange(event: any){
    if(event.target.value>=0){
    setQuantity(parseInt(event.target.value));
    }
}

function handleUpdateCart(){
    setSubmitting(true);
    if(!item || quantity>item.quantity){
        const updatedQuantity=item ? quantity-item.quantity : quantity;
        Agent.Basket.addItem(product?.id!, updatedQuantity)
        .then(basket=>setBasket(basket))
        .then(error=>console.log(error))
        .finally(()=>setSubmitting(false))
    }
    else{
        const updatedQuantity=item.quantity-quantity;
        Agent.Basket.addItem(product?.id!, updatedQuantity)
        .then(()=>removeItem(product?.id!, updatedQuantity))
        .catch(error=>console.log(error))
        .finally(()=>setSubmitting(false))
    }
}

if (loading) return <h3><LoadingComponent message="Loading product..."/></h3>
if (!product) return <h3><NotFound/></h3>


    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width:'100%', paddingRight:15}}/>
            </Grid>
            <Grid xs={6}>
                <Typography variant='h3' style={{padding:15}}>{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant='h4' color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody style={{paddingRight:15}}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container>
                    <Grid item xs={5}>
                        <TextField onChange={handleInputChange} variant="outlined" type="number" label="Quantity in Cart" fullWidth value={quantity}/>
                    </Grid>
                    <Grid item xs={6}>
                    <LoadingButton disabled={item?.quantity===quantity || !item && quantity===0} loading={submitting} onClick={handleUpdateCart} sx={{height: '55px'}} color="primary" size="large" variant="contained" fullWidth>
                        {item? 'Update Cart' : 'Add to Cart'}
                    </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}