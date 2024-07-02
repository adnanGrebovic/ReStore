import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid, Paper } from '@mui/material';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from '../../app/Components/RadioButtonGroup';
import CheckboxButtons from '../../app/Components/CheckboxButtons';
import AppPagination from '../../app/Components/AppPagination';



const sortOptions=[
    {value: 'name', label:"Alphabetical"},
    {value: 'priceDesc', label:"Price - High to Low"},
    {value: 'price', label:"Price - Low to High"}
]

export default function Catalog(){
    const products= useAppSelector(productSelectors.selectAll);
    const{productsLoaded, filtersLoaded, types, brands, productParams, metaData}=useAppSelector(state=>state.catalog);
    const dispatch=useAppDispatch();

useEffect(()=>{
  if(!productsLoaded) dispatch(fetchProductsAsync());
},[productsLoaded, dispatch])

useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchFilters());

},[dispatch, filtersLoaded])


if(!filtersLoaded) return <LoadingComponent message="Loading products..."/>

    return(
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                   <ProductSearch/>
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup
                      selectedValue={productParams.orderBy}
                      options={sortOptions}
                      onChange={(event)=>dispatch(setProductParams({orderBy: event.target.value}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons
                    items={brands}
                    checked={productParams.brands}
                    onChange={(items: string[])=>dispatch(setProductParams({brands: items}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                <CheckboxButtons
                    items={types}
                    checked={productParams.types}
                    onChange={(items: string[])=>dispatch(setProductParams({types: items}))}
                    />
                </Paper>



            </Grid>

             <Grid item xs={9}>
                <ProductList products={products}/>
            </Grid>

            <Grid item xs={3}/>
            <Grid item xs={9} sx={{mb: 2}}>
                {metaData &&
                <AppPagination
                metaData={metaData}
                onPageChnage={(page:number)=>dispatch(setPageNumber({pageNumber: page}))}
                />}
            </Grid> 

        </Grid>
    )
}