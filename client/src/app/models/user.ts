import { Basket } from "./basket";

export interface User{
    roles: any;
    email: string;
    token: string;
    basket?: Basket;
}