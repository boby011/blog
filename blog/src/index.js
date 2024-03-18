import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Blog.css';
import Nav from './Nav';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { Login } from './Login';
import { Sigin } from './Sigin';
import { Home } from './Home';
import { User } from './User';
import { Create } from './Create';
import { Bview } from './Bview';
import { Bdetails } from './Bdetails.jsx';
import { Userblogs } from './Userblogs.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your component tree with Provider */}
      <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route path='/' element={<Nav />} >
            <Route index element={<Home />} />
            <Route path='Login' element={<Login />} />
            <Route path='Sigin' element={<Sigin />} /> {/* Corrected to Signin */}
            <Route path='User' element={<User />} />
            <Route path='create' element={<Create/>}/>
            <Route path='blogs' element={<Bview/>}/>
            <Route path='blogdetails/:id' element={<Bdetails/>}/>
            <Route path='userblogs/:id' element={<Userblogs/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
