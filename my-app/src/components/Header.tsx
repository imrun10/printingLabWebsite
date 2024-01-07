import React, { use, useEffect } from 'react';
import '../css/pico.min.css';
import '../components/componentsCSS/components.css'
import Image from 'next/image';
import { fetchUser } from '@/api/database/fetch';
import { Typography } from '@mui/material';
import Link from 'next/link';

const checkUser = async () => {
  const user = await fetchUser();
  if (user) {
    console.log('Signed in already', user)
  }
  else {
    console.log('Not signed in')
    return user;
  }}

const Header: React.FC = (user) => {
  
  return (
    <nav className='card-shadow'>
  <ul>
    <Link href="/">
    <li><Image src="AUBH-Logo.svg" alt="Aubh Logo" width={200} height={100} ></Image></li>
    </Link>
  </ul>
  <ul>
    <li ><a href="/" className='NavMenue'>Store</a></li>
    <li ><a href="/dev" className='NavMenue'>Order</a></li>
    <li >{user ? <Typography className='NavMenue'> Hey </Typography>: <a href="/login" className='NavMenue' id='btn'>Sign up</a>}</li>
  </ul>
</nav>
  );
};

export default Header;