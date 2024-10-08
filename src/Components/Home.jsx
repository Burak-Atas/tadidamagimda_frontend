import React, { useEffect, useState } from "react";
import './Home.css'
import PostServicesWs from "../Services/PostServicesWs";
import { LocationMarkerIcon, PhotographIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom"; // Yeni ekleme

export default function Home({isMobile}) {
  const [posts, setPosts] = useState([]); // Gönderileri tutmak için state
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [newPost, setNewPost] = useState(false);
  const [postContent, setPostContent] = useState({
    image: "",
    text: "",
    name: "",
    region: "",
    location: "",
  });
  const handleSubmit = () => {
    console.log("Post:", postContent); // Post içeriğini işlemek için burada backend'e gönderilebilir.
    setNewPost(false); // Post oluştuktan sonra modalı kapat
  };

  const handleInputChange = (e) => {
    setPostContent({
      ...postContent,
      [e.target.name]: e.target.value,
    });
  };
  // Diğer state ve fonksiyonlar...
  const navigate = useNavigate(); // Yeni ekleme

  const handlePage = (postId) => {
    navigate(`/post/${postId}`); // Yorum sayfasına yönlendirme
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostContent({ ...postContent, image: URL.createObjectURL(file) });
    }
  };

  const ws = new PostServicesWs();

  useEffect(() => {
    // WebSocket bağlantısını aç
    ws.connect();

    // WebSocket'tan gelen mesajları dinle
    ws.onMessage((message) => {
      // Mesajı al ve gönderi listesine ekle
      const newPost = JSON.parse(message.data); // JSON formatında geldiğini varsayıyoruz
      console.log(newPost)
      setPosts( newPost);
    });

    // Yüklenme durumunu false yap
    setLoading(false);

    // Bileşen unmount olduğunda WebSocket'i kapat
    return () => {
      ws.disconnect();
    };
  }, []);

  // Yükleniyorsa yükleme mesajını göster
  if (loading) {
    return <div>Yükleniyor...</div>; // Yüklenme mesajı
  }

  return (
    <>
      {/* Burada ana içerik yer alacak */}
        {/* Gönderileri göster */}
        <div className="mt-5 space-y-4 w-full">
  {/* Gönderileri göster */}
  {posts.map((post, index) => (
  <div key={index} className="bg-white border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center space-x-3 mb-3">
      {/* Kullanıcı avatarı ve ismi */}
      <img 
        src={post.ImageUrl} 
        alt="User Avatar" 
        className="w-10 h-10 rounded-full" 
      />
      <div>
        <h4 className="font-semibold text-gray-800">{post.Username}</h4>
        <span className="text-gray-500 text-sm">{new Date(post.Timestamp).toLocaleString()}</span>
      </div>
    </div>
    <div className="w-full mb-3">
      <h4 className="text-lg font-medium text-gray-900">{post.Text}</h4>
    </div>
    <div className="w-full h-60">
      <img 
        src={post.ImageUrl} 
        alt="post" 
        className="w-full max-h-60	 object-fit rounded-lg" 
      />
    </div>
    <div className="mt-3 text-gray-500 text-sm">
      Yüklenme Tarihi: {new Date(post.CreatedAt).toLocaleString()}
    </div>
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center space-x-2">
        <button className="text-blue-500 hover:underline">Beğen</button>
        <button className="text-blue-500 hover:underline" onClick={()=>handlePage(post.PostId)}>Yorum Yap {post.Comments.length}</button>
        </div>
      <span className="text-gray-500">{post.CountLike} Beğeni</span>
    </div>
  </div>
))}

</div>


      {/* Gönderi İkonu */}
      <div className={`absolute bottom-10  ${isMobile?'right-1/4':'right-'}`}>
        <button
        onClick={()=>setNewPost(!newPost)}
          className={`flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-200 ${isMobile?'':''}`}
          aria-label="Yeni gönderi oluştur"
        >
          +
        </button>
      </div>
      {newPost && (
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 text-gray-200">
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

              {/* Konum Ekleme */}
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
