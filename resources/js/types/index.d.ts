export interface User {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    email_verified_at: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    education?: 'Basic' | 'Secondary' | 'Higher';
    hobbies?: string[];
    role: 'admin' | 'user';
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface Cart {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    cart_product?: CartProduct[];
}

export interface CartProduct {
  cart_id: number;
  product_id: number;
  quantity: number;
  product: Product;
  created_at: string;
  updated_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    completed_at: string | null;
    order_product?: OrderProduct[];
    user?: User;
}

export interface OrderProduct {
    order_id: number;
    product_id: number;
    quantity: number;
    product: Product;
    created_at: string;
    updated_at: string;
}