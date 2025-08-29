export interface CartItem
{
    imageUrl:string
    name:string
    price: number
    productId: number
    quantity: number
}
export interface Cart
{
    cartId: number;
    customerId: string;
    cartItems: CartItem[];
}
