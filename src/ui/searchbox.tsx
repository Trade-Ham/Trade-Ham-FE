import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbox = () => {
  return (
    <div className="relative w-screen flex items-center justify-between mt-6 px-10">
      {/* 검색 창 */}
      <div className="relative w-[80%] ml-[10%]">
        <input
          type="text"
          placeholder="포스트 검색"
          className="w-full h-12 bg-white rounded-full border border-[#b4b4b4] px-6 text-lg text-[#121212] font-['Inter'] shadow-md"
        />
        {/* IoSearch 아이콘 */}
        <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#b4b4b4] text-2xl" />
      </div>
    </div>
  );
};

export default Searchbox;
