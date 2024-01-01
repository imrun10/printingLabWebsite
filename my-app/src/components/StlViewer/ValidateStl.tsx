import React from 'react';
import * as THREE from 'three';
import { StlFileReaderProps } from '../../constructs/constructs';
import axios from 'axios';

export default async function ValidateStl(file: File) {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    // Make an HTTP POST request to the API endpoint
    const response = await axios.post('https://api.stl-validator.com/v2/validate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Check the response for validation errors
    const { data } = response;
    if (data && data.errors && data.errors.length > 0) {
      // If there are errors, return the error messages
      const errorMessages = data.errors.map((error: any) => error.message);
      const validationResult = {
        valid: false,
        errors: errorMessages,
      };
      return validationResult; // Return the validation result
    }

    // If no errors found, return the validation result
    const validationResult = {
      valid: true,
    };
    return validationResult; // Return the validation result
  } catch (error) {
    console.log('Error validating STL file:', error);
    throw error;
  }
}