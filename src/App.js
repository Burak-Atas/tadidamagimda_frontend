import { useEffect, useState } from 'react';
import AuthServices from './Services/AuthServices';
import Home from './Pages/DefaulPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LocationBasedPosts from './Pages/LocationBasedPosts';
import DefaulPage from './Pages/DefaulPage';
import { PostProvider } from './Context/PostContext';

function App() {


  const authService = new AuthServices();


  return (
    <div className=''>
      <Router>
        <PostProvider>
          <DefaulPage authService={authService} />
        </PostProvider>
      </Router>

    </div>
  );
}

export default App;
