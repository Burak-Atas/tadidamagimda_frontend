import React, { useEffect, useState } from "react";
import { FaBars, FaFilter } from "react-icons/fa"; // İkonları içe aktar
import Home from "../Components/Home";
import { Route, Routes } from "react-router-dom";
import RightSideBar from "../Components/RightSideBar";
import LeftSideBar from "../Components/LeftSideBar";
import Notification from "../Components/Notification";
import Profil from "../Components/Profil";
import PostDetails from "../Components/PostDetails";

export default function DefaulPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sol Sidebar görünürlüğü için state
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false); // Sağ Sidebar mobilde görünürlüğü için state
  const [isMobile, setIsMobile] = useState(false); // Mobil ekran olup olmadığını kontrol etmek için state

  // Ekran boyutuna göre sidebar kontrolü
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
      setIsSidebarOpen(false); // Mobilde sol sidebar kapalı başlasın
      setIsRightSidebarOpen(false); // Sağ sidebar da kapalı başlasın
    } else {
      setIsMobile(false);
      setIsSidebarOpen(true); // Büyük ekranda açık kalsın
      setIsRightSidebarOpen(true); // Büyük ekranda sağ sidebar açık kalsın
    }
  };

  useEffect(() => {
    handleResize(); // Component mount olunca kontrol et
    window.addEventListener("resize", handleResize); // Ekran boyutu değişimini dinle
    return () => {
      window.removeEventListener("resize", handleResize); // Component unmount olunca temizle
    };
  }, []);

  return (
    <div className="w-full h-screen flex bg-gray-100 relative">
      {/* Sol Sidebar */}
      {isSidebarOpen && (
        <div className={`w-3/12 h-screen p-5 flex flex-col items-end border ${isMobile ? 'w-5/12 absolute z-50 bg-white' : ''}`}>
          <LeftSideBar />
        </div>
      )}

      {/* Mobilde Sidebar Toggle Butonu */}
      {isMobile && (
        <button
          className="absolute top-4 left-4 z-50 bg-gray-500 text-white p-2 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars /> {/* Sol Sidebar için Menü İkonu */}
        </button>
      )}

      {/* Ana İçerik */}
      <div className={`"w-6/12 p-5 flex flex-col items-center overflow-y-auto h-screen scrollbar-thin ${isMobile?"w-full p-1":"w-full"}"`}>
        <Routes>
          <Route path="/" element={<Home isMobile={isMobile}/>} />
          <Route path="/notification" element={<Notification ismobile={isMobile}/>} />
          <Route path="/post/:id" element={<PostDetails ismobile={isMobile}/>} />
          <Route path="/profil" element={<Profil ismobile={isMobile}/>} />
        </Routes>
      </div>

      {/* Sağ Sidebar */}
      {!isMobile && (
        <div className="w-3/12 h-screen border p-5 pt-20">
          <RightSideBar />
        </div>
      )}

      {/* Mobilde Sağ Sidebar Aç/Kapa Butonu */}
      {isMobile && (
        <>
          <button
            className="absolute top-4 right-4 z-50 bg-gray-500 text-white p-2 rounded"
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          >
            <FaFilter /> {/* Sağ Sidebar için Filtre İkonu */}
          </button>

          {/* Sağ Sidebar mobilde üst kısımda açılır */}
          {isRightSidebarOpen && (
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-9/12 h-1/2 bg-white z-40 p-5 overflow-auto">
    <RightSideBar />
  </div>
)}

        </>
      )}
    </div>
  );
}
