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
      <div className="flex flex-col items-center">
        <Searchbox />
        <GridCard />
      </div>
    </div>
  );
};

export default MainPage;
