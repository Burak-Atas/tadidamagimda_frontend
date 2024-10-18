import { useEffect, useState } from 'react';
import AuthServices from './Services/AuthServices';
import Home from './Pages/DefaulPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LocationBasedPosts from './Pages/LocationBasedPosts';
import DefaulPage from './Pages/DefaulPage';

function App() {

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      const authService = new AuthServices()

      authService.FetchUser(token)
      .then((response)=>{
        console.log(response);
        authService.setUser(response.data);
      })
      .catch((error)=>{
        console.log("sistemsel bir hata olutşu.");
      })
    }
  },[])

  return (
    <div className=''>
      <Router> {/* Router ile Routes'u sarmalayın */}
       <DefaulPage/>
      </Router>
    </div>
  );
}

export default App;
