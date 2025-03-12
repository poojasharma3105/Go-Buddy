import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white p-4 mt-10'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <p className='text-sm'>&copy; {new Date().getFullYear()} Go Buddy. All rights reserved.</p>
        <div className='flex gap-4'>
          <a href='#' className='hover:text-blue-400'><FaFacebook /></a>
          <a href='#' className='hover:text-blue-400'><FaTwitter /></a>
          <a href='#' className='hover:text-pink-400'><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
