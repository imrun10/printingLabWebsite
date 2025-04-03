"use client"
import React from 'react';
import { Button } from '@mui/joy';
import { useRouter } from 'next/navigation';


const AddButton = () => {
    const router = useRouter();


    const addNew = () => {
        router.push('/upload');
        
    };
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '50px',
        right: '50px',
      }}
    >
      <Button onClick={addNew} className='  bg-green-400'>+</Button>
    </div>
  );
};

export default AddButton;