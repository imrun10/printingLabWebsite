import React, { useState, useEffect } from 'react';
import { ensureManifoldness } from '@jscad/io-utils';
const scadApi = require('@jscad/scad-api')
const stlDeserializer = require('@jscad/stl-deserializer')


interface StlFileReaderProps {
  file: File;
}

function StlValidation({ file }: StlFileReaderProps) {
  const [error, setProb] = useState<string | null>(null);

  useEffect(() => {
    const validateStlFile = async () => {
      try {
        console.log('Validating STL file:', file);
        const fileContent = await readThreeJsFile(file);
        console.log('File content:', fileContent);
        const geometry = stlDeserializer.deserialize({output: 'geometry', filename: 'file.stl'}, fileContent)
        console.log('Geometry:', geometry);
        const solid = scadApi.create(geometry);
        console.log('Solid:', solid);
        const validatedSolid = ensureManifoldness(solid);

        const isWatertight = validatedSolid.validate().watertight;
        const hasSelfIntersections = validatedSolid.validate().intersect;

        if (!isWatertight || hasSelfIntersections) {
          setProb('Invalid STL due to self-intersections or non-watertightness');
        } else {
          setProb(null);
        }
        console.log('Validation result:', isWatertight, hasSelfIntersections);
      } catch (error) {
        console.error('Error validating STL file:', error);
        setProb('Failed to validate STL file');
      }
    };

    validateStlFile();
  }, []);

  const readThreeJsFile = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      {error ? <h1>{error}</h1> : <h1>Valid STL</h1>}
    </div>
  );
}

export default StlValidation;