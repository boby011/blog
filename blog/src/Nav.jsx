import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Blog.css';

const Nav = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('id');

  const handleClick = () => {
    localStorage.clear();
    navigate(`/Login`);
  };

  return (
    <>
      <div className='nav'>
        <div className='head'>
          <h2 className='nav-title'>Writer</h2>
        </div>
        <div className='list'>
          <Link to='/'><span>Home</span></Link>
          <Link to='/blogs'><span>Blogs</span></Link>
          {user ? (
            <>
              <Link to='/create'><span>Create your Blog</span></Link>
              <Link to='/User'><span>Profile</span></Link>
              <button className="logout-btn" onClick={handleClick}>Logout</button>
            </>
          ) : (
            <>
              <Link to='/Login'><span>Login</span></Link>
              <Link to='/Sigin'><span>Signin</span></Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
