import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationCount] = useState(202); // 알림 개수

  const handleProfileClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // 로그아웃 로직 추가
  };

  const handleProfileManagement = () => {
    console.log("Managing profile...");
    // 프로필 관리 로직 추가
  };

  return (
    <header className="w-full bg-[#FFD60A] flex items-center justify-between px-6 py-4 shadow-md">
      {/* 로고 */}
      <div className="flex items-center">
        <div className="h-16 flex items-center justify-center text-lg font-bold text-[#003566]">
          Trade-Ham
        </div>
      </div>

      {/* 프로필 */}
      <div className="relative">
        <button
          onClick={handleProfileClick}
          className="w-16 h-16 bg-transparent rounded-full flex items-center justify-center focus:outline-none border-2 border-[#003566] hover:border-[#9FFDFE] relative"
        >
          <IoPersonOutline
            style={{ width: "24px", height: "24px" }}
            className="text-[#003566]"
          />
          {/* 알림 배지 */}
          {notificationCount > 0 && (
            <div className="absolute bottom-3 right-1 transform translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full z-50">
              {notificationCount > 99 ? "99+" : notificationCount}
            </div>
          )}
        </button>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
            <button
              onClick={handleProfileManagement}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              프로필 관리
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
