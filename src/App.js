import { useEffect, useState } from 'react';
import AuthServices from './Services/AuthServices';
import Home from './Pages/DefaulPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LocationBasedPosts from './Pages/LocationBasedPosts';
import DefaulPage from './Pages/DefaulPage';

function App() {
  const auth = new AuthServices();

  const [currentUser, setCurrentUser] = useState(false); // currentUser state'i oluşturuldu

  useEffect(() => {
    const user = auth.currentUser(); // Kullanıcıyı al
    setCurrentUser(user.id); // State'i güncelle
  }, []);

  return (
    <div className=''>
      <Router> {/* Router ile Routes'u sarmalayın */}
       <DefaulPage/>
      </Router>
    </div>
  );
}

export default App;
