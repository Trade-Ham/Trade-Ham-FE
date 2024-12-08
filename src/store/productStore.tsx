import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./AuthStore"; // AuthStore import

interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  status: string;
  view: number;
  like: number;
  isLiked: boolean;
}

interface ProductState {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

function transformProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    content: () => <p>{product.description}</p>, // description을 content에 매핑
  }));
}

export const useProductStore = create<ProductState>((set) => ({
  products: [
    {
      productId: 1,
      name: "피그마 책",
      description: "피그마 책입니다.",
      price: 10000,
      status: "SELL",
      view: 10,
      like: 5,
      isLiked: true,
    },
    {
      productId: 2,
      name: "혼자서 공부하는 자바",
      description: "자바 책입니다.",
      price: 12000,
      status: "SELL",
      view: 20,
      like: 10,
      isLiked: false,
    },
    // ... 더미 데이터 추가
  ],
  fetchProducts: async () => {
    try {
      // Access token 가져오기
      const { reissueResponse } = useAuthStore.getState();
      const accessToken = reissueResponse?.access;

      // API 호출
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/product/all`,
        {
          headers: {
            "Content-Type": "application/json",
            access: accessToken || "",
          },
        }
      );

      const data = response.data.data;

      const transformedData = transformProducts(data);
      set({
        products: transformedData,
      });

      // Zustand 상태 업데이트
      set({
        products: data,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
}));
