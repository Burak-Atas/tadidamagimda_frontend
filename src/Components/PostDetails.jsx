import React, { useEffect, useState } from "react"; // useState ve useEffect ekledik
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams(); // Yönlendirme ile gelen post id
  const [data, setData] = useState([]); // Yorumları saklamak için state
  const [loading, setLoading] = useState(true); // Yükleme durumu için state

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/post/${id}`); // Yorumları çekecek API
        const data = await response.json();
        console.log("deneme",data)
        setData(data); // Yorumları state'e kaydediyoruz
      } catch (error) {
        console.error("Yorumlar alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchComments();
  }, [id]); 

  return (
    <div>
      <h1>Yorumlar - Post ID: {id}</h1>
      {loading ? ( 
        <p>Yükleniyor...</p>
      ) : (
        <div>
          <div>
            {data.Text}
            <img src={data.ImageUrl} alt="" />
          </div>
          <ul>
            {data.Comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.SenderId}</strong> {comment.Text} {/* Yorum içeriği */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
