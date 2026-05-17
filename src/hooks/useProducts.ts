import { useState, useEffect } from 'react';
import { products as defaultProducts, type Product } from '../data/products';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then((data: { products?: Array<{ id: string; priceDisplay: string; description: string }> }) => {
        if (!data.products) return;
        setProducts(
          defaultProducts.map((p) => {
            const api = data.products!.find((a) => a.id === p.id);
            return api ? { ...p, priceDisplay: api.priceDisplay, description: api.description } : p;
          })
        );
      })
      .catch(() => {});
  }, []);

  return products;
}
