import React, { useEffect, useState } from "react";
import "./Home.css";
import { LocationMarkerIcon, PhotographIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import PostService from "../Services/PostService";
import Post from "./Post";

export default function Home({ isMobile, sse }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState(false);
  const [postContent, setPostContent] = useState({
    image: "",
    text: "",
    name: "",
    region: "",
    location: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const ps = new PostService();

  // Yeni gönderi işleme
  const handleSubmit = () => {
  
    console.log("Post:", postContent);

    ps.Addpost(postContent).then((response)=> {
      console.log(response)
    })

    setNewPost(false);
    setPostContent({ image: "", text: "", name: "", region: "", location: "" });
  };

  const handleInputChange = (e) => {
    setPostContent({
      ...postContent,
      [e.target.name]: e.target.value,
    });
  };

  // Yorum sayfasına yönlendirme
  const handlePage = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const response = await ps.AddImage(formData); 
        console.log(response.data["url"])
        if (response.data["url"]) {
          console.log(response);
          setPostContent({ ...postContent, image: response.data["url"] }); 

        } else {
          console.error("Resim yükleme başarısız oldu");
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };
  

  useEffect(() => {
    const handleNewMessage = (data) => {
      console.log("Yeni gönderi:", data);
      setPosts(data);
      setLoading(false);
    };

    const handleError = (error) => {
      setError("Bağlantı hatası!");
      console.error(error);
    };

    sse.start(handleNewMessage, handleError);

    return () => {
      sse.stop();
    };
  }, []);

  // Beğeni işlevi
  const handleLike = (id) => {
    console.log(id)
    ps.LikeRequest({ postID: id }).then((response)=>{
      console.log(response)
    })
  };

  // Gönderileri yenileme işlevi
  const handleRefresh = () => {
    setPosts(sse.newData);
    console.log("sse içindeki new data verileir", sse.newData.length);
    console.log("home page yenilendi");
  };

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className=" mt-5 space-y-4 w-9/12">
          {/* Yenile Butonu */}
          {sse.newData.length >= 2 && (
             <button
             onClick={handleRefresh}
             className={`absolute top-10 left-1/2 bg-blue-500 text-white p-2 rounded mb-4 ${
               sse.newData.length >= 5 ? "opacity-100" : "opacity-50 cursor-not-allowed"
             }`}
             disabled={sse.newData.length < 5}
           >
             Yenile
           </button>
       
          )}

          <Post posts={posts} handleLike={handleLike} handlePage={handlePage} />
        </div>
      )}

      {/* Gönderi İkonu */}
      <div
        className={`absolute bottom-10 ${isMobile ? "right-5" : "right-1/4 "}`}
      >
        <button
          onClick={() => setNewPost(!newPost)}
          className={`flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-200`}
        >
          +
        </button>
      </div>
      {newPost && (
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            className={`bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 text-gray-200 ${
              isMobile ? "w-10/12" : ""
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Yeni Gönderi Oluştur</h2>
            <div className="flex items-center space-x-4 mb-4">
              <input
                name="name"
                value={postContent.name}
                onChange={handleInputChange}
                placeholder="İsim"
                className="w-1/2 p-2 border border-gray-600 bg-gray-700 rounded"
              />
              <input
                name="region"
                value={postContent.region}
                onChange={handleInputChange}
                placeholder="Bölge"
                className="w-1/2 p-2 border border-gray-600 bg-gray-700 rounded"
              />
            </div>
            <textarea
              name="text"
              value={postContent.text}
              onChange={handleInputChange}
              placeholder="Bir şeyler yazın..."
              className="w-full h-32 p-2 border border-gray-600 bg-gray-700 rounded mb-4"
            />
            <div className="flex items-center justify-between mb-4">
              <label className="cursor-pointer flex items-center space-x-2">
                <PhotographIcon className="h-6 w-6 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span>Resim Ekle</span>
              </label>
              <div className="flex items-center space-x-2">
                <LocationMarkerIcon className="h-6 w-6 text-gray-800" />
                <input
                  type="text"
                  name="location"
                  value={postContent.location}
                  onChange={handleInputChange}
                  placeholder="Konum"
                  className="p-2 border border-gray-600 bg-gray-700 rounded"
                />
              </div>
            </div>
            {postContent.image && (
              <img
                src={postContent.image}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setNewPost(false)}
                className="bg-red-600 text-white p-2 rounded"
              >
                İptal
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white p-2 rounded"
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
