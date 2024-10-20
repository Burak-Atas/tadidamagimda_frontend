import React, { useEffect, useState } from 'react'; // useState eklenmesi gerekiyor
import { useFetcher, useParams } from 'react-router-dom';
import ProfilService from '../Services/ProfilService'; // Bu import kullanılmıyor, silinebilir
import OrderProfilservice from '../Services/OrderProfilService';

export default function OrderProfil({ handleLike, handlePage }) {
  const { user_name } = useParams();
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const orderProfilservice = new OrderProfilservice();
    orderProfilservice.getOrderProfil(user_name)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.post);
      })
      .catch((error) => {
        console.error("Hata:", error); 
      });
  }, []);

  return (
    <>
      {posts && posts.map((post, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={post.image_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-800">{post.user_name}</h4>
              <span className="text-gray-500 text-sm">
                {new Date(post.Timestamp).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="w-full mb-3">
            <h4 className="text-lg font-medium text-gray-900">{post.Text}</h4>
          </div>
          <div className="w-full h-60">
            <img
              src={post.image_url}
              alt="post"
              className="w-full max-h-60 object-cover rounded-lg" // object-fit yerine object-cover kullanılmalı
            />
          </div>
          <div className="mt-3 text-gray-500 text-sm">
            Yüklenme Tarihi: {new Date(post.CreatedAt).toLocaleString()}
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center space-x-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleLike(post.PostId)}
              >
                Beğen
              </button>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handlePage(post.PostId)}
              >
                Yorum Yap {post.Comments.length}
              </button>
            </div>
            <span className="text-gray-500">{post.CountLike} Beğeni</span>
          </div>
        </div>
      ))}
    </>
  );
}
