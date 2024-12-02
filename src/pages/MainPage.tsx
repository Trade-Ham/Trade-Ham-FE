import React from "react";
import Header from "../layout/Header"; // Header 컴포넌트 import (경로는 프로젝트 구조에 맞게 수정)
import { GridCard } from "../components/grid-card";

const MainPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col box-border overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to MainPage</h1>
      </div>
      <GridCard />
    </div>
  );
};

export default MainPage;
