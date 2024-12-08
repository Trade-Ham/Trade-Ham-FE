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
  content?: () => JSX.Element; // description을 매핑한 필드
}

interface ProductState {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

// transformProducts 함수: description을 content로 매핑
function transformProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    content: () => <p>{product.description}</p>, // description을 content에 매핑
  }));
}

// Zustand Store
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
    // ... 추가 더미 데이터
  ],
  fetchProducts: async () => {
    try {
      // Access token 가져오기
      const { reissueResponse } = useAuthStore.getState();
      const accessToken = reissueResponse?.access || ""; // Access token이 없으면 빈 문자열 사용

      console.log("Making API call with access token:", accessToken);

      // API 호출
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/product/all`,
        {
          headers: {
            "Content-Type": "application/json",
            access: accessToken,
          },
        }
      );

      console.log("API response:", response);

      const data = response.data.data;

      // 데이터 변환 및 상태 업데이트
      const transformedData = transformProducts(data);
      set({
        products: transformedData,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
}));
