export interface Order {
    id: number;
    firstName: string;
    lastName: string;
    orderDate: Date;
    phone: string;
    adresLine: string;
    city: string;
    customerId: string;
    orderStatus: number;
    orderItems: OrderItem[];
    subTotal: number;
    deliveryFee: number;
}

export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    productImageUrl: string;
}