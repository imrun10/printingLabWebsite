import React, { use, useRef, useEffect, useState } from "react";

interface StlFileReaderProps {
  onChange: (file: File | null) => void;
}

const StlFileReader: React.FC<StlFileReaderProps> = ({ onChange }) => {
  const [filled, hasFile]= useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    hasFile(true);
    onChange(file);
  };

  const handleClearFile = () => {

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
      hasFile(false);
    }
    onChange(null);
    hasFile(false);
  };

  //useffect to check if file is uploaded
  

  return (
    <div>
      {filled ? (
        <button className="bg-red-500 rounded-none hover:bg-red-400 text-white justify-center h-full w-full p-20 font-bold py-1.5 px-4 border-0 "onClick={handleClearFile}>Clear File</button>
      ) : (
        <label className="bg-green-500 hover:bg-green-400 text-white justify-center h-full w-full p-20 font-bold py-2 px-4 ">
          Upload File
          <input
          
            type="file"
            accept=".stl"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      )}
    </div>
  );
};

export default StlFileReader;