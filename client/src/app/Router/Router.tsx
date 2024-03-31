import { ContactPage } from "@mui/icons-material";
import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../../features/About/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ServerError from "../errors/ServerError";
import App from "../layout/App";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";


export const Router=createBrowserRouter(([
    {
    path: '/',
    element:<App/>,
        children:[
            { path: '/catalog', element: <Catalog/> },
            { path: '/catalog/:id', element: <ProductDetails/> },
            { path: '/about', element: <AboutPage/> },
            { path: '/contact', element: <ContactPage/> },
            { path: '/server-error', element: <ServerError/> },
            { path: '/basket', element: <BasketPage/>},
            { path: '/checkout', element: <CheckoutPage/>},
            { path: '*', element: <NotFound/>}
            
        ]
    }
]));