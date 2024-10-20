import React, { useEffect, useState } from "react";
import { FaBars, FaFilter, FaHome, FaBell, FaUser } from "react-icons/fa";
import Home from "../Components/Home";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import RightSideBar from "../Components/RightSideBar";
import LeftSideBar from "../Components/LeftSideBar";
import Notification from "../Components/Notification";
import Profil from "../Components/Profil";
import PostDetails from "../Components/PostDetails";
import PostServicesSSe from "../Services/PostServicesSSe";
import PrivateRoute from "../Private/PrivateRoute";
import NotLogin from "../Components/NotLogin";
import AuthServices from "../Services/AuthServices";
import { StarIcon } from "@heroicons/react/outline";
import OrderProfil from "../Components/OrderProfil";

export default function DefaulPage( {authService}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sol Sidebar görünürlüğü için state
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false); // Sağ Sidebar mobilde görünürlüğü için state
  const [isMobile, setIsMobile] = useState(false); // Mobil ekran olup olmadığını kontrol etmek için state
  const navigate = useNavigate();
  const location = useLocation(); // Şu anki rotayı almak için


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

  // Login sayfasında sidebar'ları kapat ve içerik tam ekran olsun
  useEffect(() => {
    if (location.pathname === "/login") {
      setIsSidebarOpen(false);
      setIsRightSidebarOpen(false);
    } else {
      handleResize(); // Diğer sayfalarda tekrar boyut kontrolü yap
    }
  }, [location]);

  const sse = new PostServicesSSe("http://localhost:8080/sse");

  return (
    <div className={`w-full h-screen flex bg-gray-100 relative ${location.pathname === "/login" ? "w-full" : ""}`}>
      {/* Sol Sidebar */}
      {isSidebarOpen && !isMobile && (
        <div className="w-3/12 h-screen p-5 flex flex-col items-end border">
          <LeftSideBar />
        </div>
      )}

      {/* Ana İçerik */}
      <div className={`p-5 flex flex-col items-center overflow-y-auto h-screen scrollbar-thin 
        ${isMobile ? "w-full p-1 px-1" : location.pathname === "/login" ? "w-full" : "w-6/12"}`}>
        <Routes>
          <Route path="/" element={<Home isMobile={isMobile} sse={sse} />} />
          <Route path="/notification" element={
            <PrivateRoute authService={authService}>
              <Notification isMobile={isMobile} />
            </PrivateRoute>
          } />
          <Route path="/post/:id" element={<PostDetails isMobile={isMobile} />} />
          <Route path="/profil" element={
            <PrivateRoute authService={authService}>
              <Profil isMobile={isMobile}  authService={authService}  />
            </PrivateRoute>
          } />
          <Route path="/profil/:user_name" element={
            <PrivateRoute authService={authService}>
              <OrderProfil isMobile={isMobile}  authService={authService}  />
            </PrivateRoute>
          } />
          <Route path="/login" element={<NotLogin isMobile={isMobile} sse={sse} />} />
        </Routes>
      </div>

      {/* Sağ Sidebar */}
      {!isMobile && isRightSidebarOpen && location.pathname !== "/login" && (
        <div className="w-3/12 h-screen border p-5 pt-20">
          <RightSideBar />
        </div>
      )}

      {/* Mobilde Sağ Sidebar Aç/Kapa Butonu */}
      {isMobile && location.pathname !== "/login" && (
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

      {/* Mobilde Alt Menü (Iconlar) */}
      {isMobile && location.pathname !== "/login" && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50">
          <button onClick={() => navigate("/")} className="text-gray-600">
            <FaHome size={24} />
          </button>
          <button onClick={() => navigate("/notification")} className="text-gray-600">
            <FaBell size={24} />
          </button>
           <button  onClick={() => navigate("/notification")}  className="flex items-center space-x-1 md:space-x-2 text-sm md:text-lg cursor-pointer hover:bg-gray-600 rounded p-1 md:p-2 hover:text-white font-bold">
          <StarIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
        </button>
          <button onClick={() => navigate("/profil")} className="text-gray-600">
            <FaUser size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
