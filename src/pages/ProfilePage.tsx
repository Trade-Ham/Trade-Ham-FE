import React from "react";
import Header from "../layout/Header";
import { PurchaseHistoryGridCard } from "../components/purchase-grid-card";
import { SellHistoryGridCard } from "../components/sell-grid-card";
import { FavoriteGridCard } from "../components/favorite-grid-card";
import Profile from "../ui/profile";

const MainPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col box-border overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-center w-full px-6">
        <Profile />
        {/* 구매 목록 헤더 */}
        <div className="w-[80%] mt-8">
          <a className="text-[#121212] text-2xl font-semibold">구매 목록</a>
          <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
        </div>
        {/* 구매 목록 그리드 */}
        <PurchaseHistoryGridCard />
        {/* 판매 목록 헤더 */}
        <div className="w-[80%] mt-8">
          <a className="text-[#121212] text-2xl font-semibold">판매 목록</a>
          <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
        </div>
        {/* 판매 목록 그리드 */}
        <SellHistoryGridCard />
        {/* 좋아요 목록 헤더 */}
        <div className="w-[80%] mt-8">
          <a className="text-[#121212] text-2xl font-semibold">좋아요 목록</a>
          <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
        </div>
        {/* 좋아요 목록 그리드 */}
        <FavoriteGridCard />
      </div>
    </div>
  );
};

export default MainPage;
