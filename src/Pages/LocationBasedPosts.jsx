import React, { useState, useEffect } from 'react';

const LocationDisplay = () => {
  const [location, setLocation] = useState({ lat: null, long: null });
  const [error, setError] = useState(null);

  // Konumu alma fonksiyonu
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation(); // Sayfa yüklendiğinde konumu al
  }, []);

  return (
    <div>
      <h1>Bulunduğun Konum</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          Enlem: {location.lat}, Boylam: {location.long}
        </p>
      )}
    </div>
  );
};

export default LocationDisplay;
