import React from 'react';
import './Blog.css';

export const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1 className="login-title">Login</h1>
        <div className='form-grp'>
          <div className='input-group'>
            <label>Username:</label>
            <input type='text' name='username' placeholder='Username'/>
          </div>
          <div className='input-group'>
            <label>Password:</label>
            <input type='password' name='password' placeholder='Password'/>
          </div>
          <div className='input-group'>
            <label>Email:</label>
            <input type='email' name='email' placeholder='Email ID'/>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </div>
      </form>
    </div>
  );
};



