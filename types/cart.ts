import {Product} from "./product";

export interface CartItem {
    id: number
    product_id: number
    product: Product
    quantity: number
    price: string
    subtotal: string
}

export interface Cart {
    items: CartItem[]
    subtotal: string
    tax: string
    total: string
    items_count: number
}
