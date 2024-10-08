import React, { useState } from 'react'

export default function RightSideBar() {
    const [radius, setRadius] = useState(50); // Radius state
  
    return (
    <div>  <h2 className="text-xl font-bold text-gray-800">Filtreler</h2>

    {/* Ayarlanabilir Çubuk */}
    <div className="mt-5">
      <label className="block text-gray-700 mb-2" htmlFor="radius">
        Çevre: {radius} km
      </label>
      <input
        id="radius"
        type="range"
        min="1"
        max="50"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        className="w-full accent-blue-600" // Accent rengi için Tailwind CSS özelliği
        aria-labelledby="radius"
      />
    </div>
  
    {/* Şehir Seç */}
    <div className="mt-5">
      <label htmlFor="city" className="block text-gray-700 mb-2">
        Şehir Seç
      </label>
      <select
        id="city"
        className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-gray-200"
        aria-required="true"
        onChange={(e) => console.log('Seçilen şehir:', e.target.value)}
      >
        <option value="">Seçiniz...</option>
        <option value="istanbul">İstanbul</option>
        <option value="ankara">Ankara</option>
        <option value="izmir">İzmir</option>
        <option value="bursa">Bursa</option>
        <option value="antalya">Antalya</option>
        {/* İstediğiniz kadar şehir ekleyebilirsiniz */}
      </select>
    </div>
  
    {/* Yemek Adı Input */}
    <div className="mt-5">
      <label htmlFor="food" className="block text-gray-700 mb-2">
        Yemek Adı
      </label>
      <input
        type="text"
        id="food"
        placeholder="Yemek adını girin..."
        className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-gray-200 focus:ring focus:ring-blue-400 transition duration-200" // Fokus durumunu ekledim
        aria-label="Yemek adı girişi"
      />
    </div>
  
    <div className="mt-5">
      <button
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        onClick={() => {
          // Burada filtre uygulama işlemi yapılabilir.
          console.log('Filtreler uygulandı:', { radius });
        }}
        aria-live="polite" // Buton ile ilgili bilgi güncellemeleri için ekledim
      >
        Filtreleri Uygula
      </button>
    </div></div>
  )
}
