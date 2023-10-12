'use client'
import React, { useState } from 'react';

interface StlFileReaderProps {
  onChange: (file: File) => void;
}

const StlFileReader: React.FC<StlFileReaderProps> = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setSelectedFile(file);
    onChange(file); // Call the onChange prop with the selected file
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      console.log('Selected File:', selectedFile);
      // Add your logic here to handle the file
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".stl" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default StlFileReader;