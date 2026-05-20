import { blokshopProducts } from './blokshop-products';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  priceDisplay: string;
  image: string;
  externalUrl: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  category: string;
}

export const products: Product[] = blokshopProducts;

export const categories = [...new Set(products.map((p) => p.category))];
