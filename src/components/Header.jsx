import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='flex items-center justify-between p-4 shadow-sm bg-white'>
      <div className='flex items-center'>
        <div onClick={() => navigate('/')} className='flex items-center'>
        <img src={logo} alt='logo' className='h-10 w-auto cursor-pointer' />&nbsp;
        <p>Go Buddy</p>
        </div>
      </div>
      <div>
        <button 
          onClick={() => navigate('/')} 
          className='p-2 bg-[#f56551] text-white m-2 rounded-md shadow-sm transition cursor-pointer'
        >
          Home
        </button>
      </div>
    </header>
  );
};

export default Header;
