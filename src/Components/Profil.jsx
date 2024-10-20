import React, { useEffect, useState } from 'react';
import ProfilService from '../Services/ProfilService';
import Post from './Post';
import { FaCamera } from 'react-icons/fa'; // İkon için react-icons kütüphanesini kullanabilirsiniz.
import PostProfil from './PostProfil';

export default function Profil({ authService }) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [isEditing, setIsEditing] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false); // State for image editing

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authService.CurrentUser()) {
        const token = localStorage.getItem("token");
        try {
          const response = await authService.FetchUser(token);
          authService.setUser(response.data["user"]);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }

      const profilService = new ProfilService(authService);
      try {
        const response = await profilService.getProfilDetails();
        if (response.status) {
          setPosts(response.data["post"]);
          console.log(posts)

          const user = response.data["user"];
          setUserData({
            user_name: user ? user.user_name : '',
            bio: user ? user.bio : '',
          });
          // Mevcut profil resmi
          setProfileImage(user ? user.profile_image : null);
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
        setPosts([]);
      }
    };

    fetchUserData();
  }, [authService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0])); // Seçilen dosyayı URL olarak ayarlayın
    setIsImageEditing(false); // Resim düzenleme modunu kapat
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  

  const currentUser = authService.CurrentUser();

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="max-w-4xl mx-auto">
        <div className="h-48 bg-blue-500"></div>
        <div className="relative">
          <div className="absolute -top-16 left-4">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full border-4 border-white w-32 h-32"
            />
            <label htmlFor="profileImageInput" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer">
              <FaCamera className="text-white w-6 h-6" />
            </label>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="flex justify-end pr-4 mt-4">
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* User Information */}
        <div className="mt-16 px-4">
          <h2 className="text-2xl font-bold">{currentUser?.first_name || 'Unknown User'}</h2>
          <p className="text-gray-600">@{currentUser.user_name}</p>
          <p className="mt-2">{currentUser?.bio}</p>
        </div>

        <div className="border-b mt-6">
          <ul className="flex space-x-8 px-4">
            <li className="text-blue-500 border-b-2 border-blue-500 pb-3">Tweets</li>
            <li className="text-gray-600 hover:text-blue-500">Media</li>
          </ul>
        </div>
        {posts && posts.length > 0 && (
          <PostProfil posts={posts} handleLike={() => { }} handlePage={() => { }} />
        )}
      </div>

      
    </div>
  );
}
