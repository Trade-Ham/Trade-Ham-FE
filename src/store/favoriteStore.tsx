import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./AuthStore";

interface FavoriteProduct {
  productId: number;
  name: string;
  description: string;
  price: number;
  status: string;
  view: number;
  like: number;
  isLiked: boolean;
}

interface FavoriteState {
  favorites: FavoriteProduct[];
  fetchFavorites: () => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [
    {
      productId: 1,
      name: "피그마 책",
      description: "피그마 책입니다.",
      price: 10000,
      status: "SELL",
      view: 0,
      like: 0,
      isLiked: true,
    },
    {
      productId: 2,
      name: "혼자서 공부하는 자바",
      description: "자바 책입니다.",
      price: 12000,
      status: "SELL",
      view: 0,
      like: 0,
      isLiked: true,
    },
    {
      productId: 3,
      name: "UI/UX 피그마 완전 정복",
      description: "피그마 책입니다.",
      price: 15000,
      status: "SELL",
      view: 0,
      like: 0,
      isLiked: true,
    },
  ],
  fetchFavorites: async () => {
    try {
      const { reissueResponse } = useAuthStore.getState();
      const accessToken = reissueResponse?.access || "";

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/my/likes`,
        {
          headers: {
            "Content-Type": "application/json",
            access: accessToken,
          },
        }
      );

      const data = response.data.data;

      if (data && data.length > 0) {
        set({ favorites: data });
      } else {
        console.warn("No favorites found, keeping default data.");
      }
    } catch (error) {
      console.error("Failed to fetch favorite history:", error);
    }
  },
}));
