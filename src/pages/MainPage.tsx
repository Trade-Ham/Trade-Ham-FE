import React from "react";
import Header from "../layout/Header";
import { GridCard } from "../components/grid-card";
import Searchbox from "../ui/searchbox";

const MainPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col box-border overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-center mt-8">
        <Searchbox />
        <div className="w-[80%] mt-16">
          <a className="text-[#121212] text-2xl font-semibold">등록된 상품 목록</a>
          <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
        </div>
        <GridCard />
      </div>
    </div>
  );
};

export default MainPage;
