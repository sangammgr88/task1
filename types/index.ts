// ─── Product ─────────────────────────────────────────────────────────────────

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

export type SortOrder = "asc" | "desc";
export type Category = string;

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface CartItem extends Product {
  quantity: number;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  username: string;
  email?: string;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  status?: number;
}

// ─── Filters & Params ──────────────────────────────────────────────────────

export interface SearchParams {
  sort?: SortOrder;
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface ProductPageParams {
  sort?: SortOrder;
  page?: number;
  category?: string;
  search?: string;
}
