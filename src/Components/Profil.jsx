import React, { useEffect, useState } from 'react';
import ProfilService from '../Services/ProfilService';

export default function Profil() {
  
  const [posts,setPOsts] = useState([]);

  useEffect(()=>{
    const profilSerice = new ProfilService();
    profilSerice.getProfilDetails().then((response)=>{
      console.log("dönen sonuç",response);
    }).catch((error)=>{
      
    })
  },[])

  
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="max-w-4xl mx-auto">
        {/* Cover Photo */}
        <div className="h-48 bg-blue-500"></div>

        {/* Profile Section */}
        <div className="relative">
          <div className="absolute -top-16 left-4">
            {/* Profile Picture */}
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-full border-4 border-white w-32 h-32"
            />
          </div>

          {/* Edit Profile Button */}
          <div className="flex justify-end pr-4 mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold">
              Edit Profile
            </button>
          </div>
        </div>

        {/* User Information */}
        <div className="mt-16 px-4">
          <h2 className="text-2xl font-bold">Burak</h2>
          <p className="text-gray-600">@burak</p>
          <p className="mt-2">Software Developer | Cybersecurity Enthusiast | Golang, React, Flutter</p>

          {/* Follow Info */}
          <div className="flex mt-4 space-x-4 text-gray-600">
            <div>
              <span className="font-bold">500</span> Following
            </div>
            <div>
              <span className="font-bold">1.2K</span> Followers
            </div>
          </div>
        </div>

        {/* Tabs (Tweets, Replies, Media, etc.) */}
        <div className="border-b mt-6">
          <ul className="flex space-x-8 px-4">
            <li className="text-blue-500 border-b-2 border-blue-500 pb-3">Tweets</li>
            <li className="text-gray-600 hover:text-blue-500">Replies</li>
            <li className="text-gray-600 hover:text-blue-500">Media</li>
            <li className="text-gray-600 hover:text-blue-500">Likes</li>
          </ul>
        </div>

        {/* Tweets List */}
        <div className="px-4 py-6">
          <div className="border-b pb-4 mb-4">
            <p>Just finished my new project! #webdevelopment #react</p>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </div>

          <div className="border-b pb-4 mb-4">
            <p>Loving the new Go features in the latest update! #golang</p>
            <span className="text-gray-500 text-sm">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
