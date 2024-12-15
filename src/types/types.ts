// Product 타입
export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  status: string;
  view: number;
  like: number;
  isLiked: boolean;
  ctaLink?: string;
  content?: () => JSX.Element; // description을 매핑한 필드
}

// PurchaseProduct 타입
export interface PurchaseProduct {
  product_id: number;
  name: string;
  price: number;
  status: string;
  updated_at: string;
}

// SellProduct 타입
export interface SellProduct {
  product_id: number;
  name: string;
  description: string; // 설명 필드
  price: number;
  status: string;
  updated_at: string;
}

export interface FavoriteProduct {
  productId: number;
  name: string;
  description: string;
  price: number;
  status: string;
  view: number;
  like: number;
  isLiked: boolean;
}
