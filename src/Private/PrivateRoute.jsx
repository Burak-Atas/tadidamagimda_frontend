import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children,authService }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      authService.FetchUser(token)
      .then((response) => {
        authService.setUser(response.data["user"]);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log("Kullanıcı bilgileri alınamadı", error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);  
      });
    } else {
      setLoading(false);  // Eğer token yoksa direkt yüklemeyi bitir
    }
  }, [token, authService]);

  // Yüklenme süresince gösterilecek içerik
  if (loading) {
    return <div>Loading...</div>;
  }

  // Doğrulama tamamlandıktan sonra yönlendirme yapılıyor
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
