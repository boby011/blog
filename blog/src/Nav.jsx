import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import './Blog.css'

 const Nav = () => {
  return (
    <>
      <div className='nav'>
      
          <div className='head'>
            <h2 className='nav-title'>BLOG</h2>
          </div>

          <div className='list'>
          <Link to='/'><span style={{color:'white'}}>Home</span></Link>
          <Link to='/Login'><span style={{color:'white'}}>Login</span></Link>
          <Link to='/Sigin'> <span style={{color:'white'}}>Signin</span></Link>
          {/* <Link to='/fav'><span style={{color:'white'}}>Favorite</span></Link>
          <Link to='/coun'> <span style={{color:'white'}}>Country</span></Link> */}
          </div>
        
      </div>
      
      <Outlet />
    </>
  );
};
export default Nav
