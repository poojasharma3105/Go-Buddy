import React from 'react';
import logo from '../assets/logo.webp';

const Header = () => {
  return (
    <header className='flex items-center justify-between p-4 shadow-sm bg-white'>
      <div className='flex items-center'>
        <img src={logo} alt='logo' className='h-10 w-auto' />
        <p>Go Buddy</p>
      </div>
      <nav>
        <ul className='flex space-x-4'>
          <li><a href='/' className='text-gray-700 hover:text-gray-900'>Home</a></li>
          <li><a href='/about' className='text-gray-700 hover:text-gray-900'>About</a></li>
          <li><a href='/services' className='text-gray-700 hover:text-gray-900'>Services</a></li>
          <li><a href='/contact' className='text-gray-700 hover:text-gray-900'>Contact</a></li>
        </ul>
      </nav>
      <div>
        <button className='p-2 bg-gray-300 m-2 rounded-md shadow-sm hover:bg-gray-400 transition cursor-pointer'>Sign In</button>
      </div>
    </header>
  );
};

export default Header;
