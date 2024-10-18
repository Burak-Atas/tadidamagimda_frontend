import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams(); // URL'den gelen post id'si
  const [postData, setPostData] = useState(null); // Post ve yorum verileri
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [newComment, setNewComment] = useState(""); // Yeni yorum state'i
  const [comments, setComments] = useState([]); // Yorumları saklama

  useEffect(() => {
    // API'den post ve yorumları çeken fonksiyon
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/post/${id}`);
        const data = await response.json();
        setPostData(data); // Post verilerini kaydediyoruz
        setComments(data.Comments || []); // Yorumları kaydediyoruz
      } catch (error) {
        console.error("Yorumlar alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchPostDetails();
  }, [id]);

  // Yorum gönderme fonksiyonu
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return; // Boş yorum engelleniyor

    try {
      const response = await fetch(`http://localhost:8080/post/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment }),
      });
      
      const commentData = await response.json();
      
      // Yeni yorum listeye ekleniyor
      setComments([...comments, commentData]);
      setNewComment(""); // Yorum alanı sıfırlanıyor
    } catch (error) {
      console.error("Yorum gönderilirken bir hata oluştu:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p className="text-gray-500">Yükleniyor...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          {postData && (
            <>
              <div className="mb-4">
                <p className="text-lg mb-2">{postData.Text}</p>
                {postData.ImageUrl && (
                  <img
                    src={postData.ImageUrl}
                    alt="Post görseli"
                    className="w-full rounded-lg"
                  />
                )}
              </div>
              <hr className="my-6" />
              <h2 className="text-2xl font-semibold mb-4">Yorumlar</h2>
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment.id} className="border p-4 rounded-lg">
                    <strong>{comment.SenderId}</strong>: {comment.Text}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleCommentSubmit} className="mt-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Yorumunuzu yazın"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Yorum Gönder
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
