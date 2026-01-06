import { Product } from './product.interface';

//export type ProductPayload = Omit<Product, 'id' | 'title'>; // Caso precise omitir mais de um campo
export type ProductPayload = Omit<Product, 'id'>;
