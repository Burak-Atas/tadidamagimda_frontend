import React from 'react'

import { HomeIcon, BellIcon, SearchIcon, StarIcon, UserIcon, PencilAltIcon } from '@heroicons/react/outline'; // Tailwind Heroicons
import { Link } from 'react-router-dom';

export default function LeftSideBar() {
  return (
    <>     
      <h1 className="text-xl md:text-2xl flex w-6/12 md:w-5/12 font-bold mb-6 md:mb-10">Logo</h1> {/* Mobilde başlık boyutu küçültüldü */}
      <ul className="space-y-2 md:space-y-4"> {/* Mobilde daha az boşluk */}
        <Link to={"/"} className="flex items-center space-x-1 md:space-x-2 text-sm md:text-lg cursor-pointer hover:bg-gray-600 rounded p-1 md:p-2 hover:text-white font-bold">
          <HomeIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
          <span>Ana Sayfa</span>
        </Link>
        <Link to={"/notification"} className="flex items-center space-x-1 md:space-x-2 text-sm md:text-lg cursor-pointer hover:bg-gray-600 rounded p-1 md:p-2 hover:text-white font-bold">
          <BellIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
          <span>Bildirimler</span>
        </Link>
        <li className="flex items-center space-x-1 md:space-x-2 text-sm md:text-lg cursor-pointer hover:bg-gray-600 rounded p-1 md:p-2 hover:text-white font-bold">
          <SearchIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
          <span>Keşfet</span>
        </li>
        <li className="flex items-center space-x-1 md:space-x-2 text-sm md:text-lg cursor-pointer hover:bg-gray-600 rounded p-1 md:p-2 hover:text-white font-bold">
          <StarIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
          <span>Fiyat Performans</span>
        </li>
        <Link to={"/profil"} className="flex items-center space-x-1 md:space-x-2 text-sm md:text-lg cursor-pointer hover:bg-gray-600 rounded p-1 md:p-2 hover:text-white font-bold">
          <UserIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
          <span>Profil</span>
        </Link>
      </ul>

      <div className="mt-auto w-32 md:w-44"> {/* Mobilde genişlik küçültüldü */}
        <li onClick={()=>{}} className="flex items-center space-x-1 md:space-x-2 text-sm md:text-lg cursor-pointer hover:bg-gray-600 rounded p-1 md:p-2 hover:text-white font-bold">
          <PencilAltIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
          <span>Post Oluştur</span>
        </li>
        <li onClick={()=>{}} className="flex items-center space-x-1 md:space-x-2 text-sm md:text-lg cursor-pointer hover:bg-gray-600 rounded p-1 md:p-2 hover:text-white font-bold">
          <span>Kullanıcı Adı</span>
        </li>
      </div>
    </>
  )
}
