
export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
}

export interface AuthResponse {
  token: string;
}

export type SortOrder = 'asc' | 'desc';

export interface SearchParams {
  sort?: SortOrder;
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}
