import React, { useState } from 'react';

export default function NotLogin() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCodeSent, setCodeSent] = useState(false); // Kod gönderildikten sonraki durumu takip eden state
  const [email, setEmail] = useState(''); // Email state
  const [verificationCode, setVerificationCode] = useState(''); // Doğrulama kodu state
  const [newPassword, setNewPassword] = useState(''); // Yeni şifre state

  return (
    <div className='w-full h-screen flex relative'>
      <div className='w-1/2 bg-cover bg-center' style={{ backgroundImage: "url('https://marketplace.canva.com/EAEv8Ro3O0o/1/0/1600w/canva-ye%C5%9Fil-tipografik-ev-yemekleri-lokantas%C4%B1-logosu-logo-DIjEwIAhYd8.jpg')" }}>
      </div>
      <div className='w-1/2 flex items-center justify-center bg-gray-50'>
        <div className='w-3/5'>
          <h2 className='text-5xl font-bold text-gray-800 mb-8'>Nerde Ne Yenir Merak Ediyor musun?</h2>
          
          {/* Kullanıcı Adı Alanı */}
          <div className='my-5'>
            <label htmlFor="username" className='block text-lg font-semibold text-gray-600 mb-2'>Kullanıcı Adı</label>
            <input 
              type="text" 
              name='username' 
              placeholder='Kullanıcı adı' 
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>
          
          {/* Şifre Alanı */}
          <div className='my-5'>
            <label htmlFor="password" className='block text-lg font-semibold text-gray-600 mb-2'>Şifre</label>
            <input 
              type="password" 
              name='password' 
              placeholder='Şifre' 
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          {/* Şifremi Unuttum Kısmı */}
          <div className='text-right mb-5'>
            <button 
              className='text-sm text-green-500 hover:underline' 
              onClick={() => setModalOpen(true)}
            >
              Şifremi unuttum
            </button>
          </div>

          {/* Giriş Yap Butonu */}
          <button className='w-full bg-green-500 text-white p-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300 mb-2'>
            Giriş Yap
          </button>

          {/* Veya */}
          <div className='my-5 text-center text-gray-500'>
            <span>Veya</span>
          </div>

          {/* Google ile Giriş */}
          <button className='w-full bg-red-500 text-white p-2 rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-300 flex items-center justify-center mb-4'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' alt='Google Logo' className='w-5 h-5 mr-3' />
            Google ile Giriş Yap
          </button>

          {/* Kaydol Butonu */}
          <button className='w-full bg-blue-500 text-white p-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300'>
            Kaydol
          </button>
        </div>
      </div>

      {/* Şifremi Unuttum Modal'ı */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg w-1/3 relative'>
            
            {/* Modal Kapatma Düğmesi */}
            <button 
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              onClick={() => setModalOpen(false)}
            >
              X
            </button>

            {!isCodeSent ? (
              // E-posta Formu (Kod gönderilmeden önce)
              <>
                <h3 className='text-2xl font-semibold mb-4 text-center'>Şifrenizi mi Unuttunuz?</h3>
                <p className='text-gray-600 mb-5 text-center'>Şifrenizi sıfırlamak için e-posta adresinizi girin.</p>
                <input 
                  type="email" 
                  placeholder='E-posta adresiniz' 
                  className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className='flex justify-center'>
                  <button 
                    className='bg-green-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300'
                    onClick={() => setCodeSent(true)} // Kod gönderildiğinde modal içeriğini değiştiriyoruz
                  >
                    Gönder
                  </button>
                </div>
              </>
            ) : (
              // Doğrulama Kodu Girişi ve Yeni Şifre Alanı
              <>
                <h3 className='text-2xl font-semibold mb-4 text-center'>Doğrulama Kodu</h3>
                <p className='text-gray-600 mb-5 text-center'>E-posta adresinize gönderilen doğrulama kodunu girin ve yeni şifrenizi oluşturun.</p>
                
                {/* Doğrulama Kodu Alanı */}
                <input 
                  type="text" 
                  placeholder='Doğrulama kodu' 
                  className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                
                {/* Yeni Şifre Alanı */}
                <input 
                  type="password" 
                  placeholder='Yeni şifre' 
                  className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className='flex justify-center'>
                  <button 
                    className='bg-green-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300'
                    onClick={() => {
                      // Doğrulama kodu ve yeni şifre işleme mantığı buraya gelecek
                      alert(`Doğrulama Kodu: ${verificationCode}\nYeni Şifre: ${newPassword}`);
                      setModalOpen(false); // Modal'ı kapatıyoruz
                    }}
                  >
                    Doğrula ve Şifreyi Güncelle
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
