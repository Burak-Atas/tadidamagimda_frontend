import React from "react";
import { Link } from "react-router-dom";

export default function Post({posts,handleLike,handlePage}) {
  return (
    <>
      {posts&&posts.map((post, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Link to ={`profil/${post.user_name}`}>
            <img
              src={post.image_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-800">{post.user_name}</h4>
            </div>
            </Link>
          </div>
          <div className="w-full mb-3">
            <h4 className="text-lg font-medium text-gray-900">{post.post.Text || post.Text}</h4>
          </div>
          <div className="w-full h-60">
            <img
              src={post.image_url}
              alt="post"
              className="w-full max-h-60 object-fit rounded-lg"
            />
          </div>
          <div className="mt-3 text-gray-500 text-sm">
            Yüklenme Tarihi: {new Date(post.post.CreatedAt).toLocaleString()}
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center space-x-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleLike(post.post.PostId)}
              >
                Beğen
              </button>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handlePage(post.post.PostId)}
              >
                Yorum Yap {post.post.Comments.length}
              </button>
            </div>
            <span className="text-gray-500">{post.post.CountLike} Beğeni</span>
          </div>
        </div>
      ))}
    </>
  );
}
