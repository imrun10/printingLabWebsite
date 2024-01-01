'use client';
import React, { useState, createContext } from 'react';
import StlViewer from '../../components/StlViewer/StlViewer';
import StlFileReader from '../../components/StlViewer/FileReader';
import Header from '@/components/Header';
import "tailwindcss/tailwind.css"
import CardWrapper from '@/components/StlViewer/StlViewLayout';

interface Purchase {
  stlFile: File;
  Price: number;
  Color: string;
  SizeXYZ: number[];

}
const UploadPage: React.FC = () => {



  return (

    <div className='pb-0 mb-0'>
              <header>
        <Header />
      </header>
      
      <div className="content pb-0 mb-0 ">
        <CardWrapper />
        
      </div>

  
    </div>
  );
};

export default UploadPage;