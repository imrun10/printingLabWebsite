'use client';
import React, { useState } from 'react';
import StlViewer from '../../components/StlViewer';
import StlFileReader from '../../components/FileReader';
import Header from '@/components/Header';

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="content">
        <h1>Upload STL File</h1>
        <StlFileReader onChange={handleFileChange} />
        {selectedFile && <StlViewer file={selectedFile} />}
      </div>

  
    </div>
  );
};

export default UploadPage;