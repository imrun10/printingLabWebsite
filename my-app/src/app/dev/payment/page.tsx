"use client";
import React from 'react';
import BookingForm from '../../../components/Payments/BookingForm';
import Header from '../../../components/Header';
import "./background.css";

const Page: React.FC = () => {
  return (
    <div className='diagonal-container'>

      <BookingForm price = {240}/>
    </div>
  );
};

export default Page;