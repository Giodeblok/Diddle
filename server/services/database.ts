import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getSupabaseClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(Math.random() * 9000) + 1000;
  return `EDB-${year}-${suffix}`;
}

export interface CreateOrderInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  postalCode: string;
  city: string;
  productId: string;
  productName: string;
  productSubtitle: string;
  productPrice: number;
  shippingOption: 'standard' | 'express';
  shippingPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  product_price: number;
  shipping_price: number;
  total_price: number;
  shipping_option: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_subtitle: string | null;
  unit_price: number;
  quantity: number;
  created_at: string;
}

export async function createOrder(input: CreateOrderInput): Promise<{ orderId: string; orderNumber: string }> {
  const supabase = getSupabaseClient();
  const orderNumber = generateOrderNumber();

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      status: 'pending',
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      address: input.address,
      postal_code: input.postalCode,
      city: input.city,
      product_price: input.productPrice,
      shipping_price: input.shippingPrice,
      total_price: input.totalPrice,
      shipping_option: input.shippingOption,
    })
    .select('id')
    .single();

  if (orderError) {
    throw new Error(`Kon bestelling niet opslaan: ${orderError.message}`);
  }

  const { error: itemError } = await supabase
    .from('order_items')
    .insert({
      order_id: order.id,
      product_id: input.productId,
      product_name: input.productName,
      product_subtitle: input.productSubtitle,
      unit_price: input.productPrice,
      quantity: 1,
    });

  if (itemError) {
    throw new Error(`Kon bestelregel niet opslaan: ${itemError.message}`);
  }

  return { orderId: order.id, orderNumber };
}

export async function getWebsiteOrders(options: {
  status?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{ orders: Order[]; count: number }> {
  const supabase = getSupabaseClient();
  const limit = options.limit ?? 20;
  const offset = options.offset ?? 0;

  let query = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (options.status) {
    query = query.eq('status', options.status);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Kon bestellingen niet ophalen: ${error.message}`);
  }

  return { orders: (data as Order[]) ?? [], count: count ?? 0 };
}

export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    throw new Error(`Kon status niet bijwerken: ${error.message}`);
  }
}

export async function updateOrderStatusByOrderNumber(orderNumber: string, status: string): Promise<void> {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('order_number', orderNumber);

  if (error) {
    throw new Error(`Kon status niet bijwerken: ${error.message}`);
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = getSupabaseClient();

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (orderError) {
    if (orderError.code === 'PGRST116') return null;
    throw new Error(`Kon bestelling niet ophalen: ${orderError.message}`);
  }

  const { data: items } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  return { ...(order as Order), items: (items as OrderItem[]) ?? [] };
}
