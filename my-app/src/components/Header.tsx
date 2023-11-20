import React from 'react';
import '../css/pico.min.css';
import '../components/components.css'
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <nav className='card-shadow'>
  <ul>
    <li><Image src="AUBH-Logo.svg" alt="Aubh Logo" width={200} height={100} ></Image></li>
  </ul>
  <ul>
    <li ><a href="#" className='NavMenue'>Store</a></li>
    <li ><a href="#" className='NavMenue'>Link</a></li>
    <li ><a href="#" className='NavMenue' id='btn'>Sign up</a></li>
  </ul>
</nav>
  );
};

export default Header;