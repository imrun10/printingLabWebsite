import "../animation.css"

import React, { useEffect, useState } from 'react';
import PaymentOptions from './PaymentOptions';
import "./calender.css"
import GfgDatePicker from './calender';

type Value = ValuePiece | [ValuePiece, ValuePiece];
type ValuePiece = Date | null;

interface BookingFormProps {
  price: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ price }) => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [totalPrice, setTotalPrice] = useState(price.toString());
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform payment processing logic
    console.log('Payment submitted');
  };

  useEffect(() => {
    if (name && university && totalPrice && selectedDate) {
      setShowPaymentOptions(true);
    } else {
      setShowPaymentOptions(false);
    }
  }, [name, university, totalPrice, selectedDate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row items-start">
        <div className="max-w-xl w-full md:w-1/2 bg-white shadow-md p-6 rounded-none">
          <h2 className="text-2xl font-bold mb-4">Booking</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500 ${name && "border-green-500"}`}
            />
          </div>
          <div>
            <label htmlFor="university" className="block text-gray-700 font-bold mb-2">
              University:
            </label>
            <input
              type="text"
              id="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500 ${university && "border-green-500"}`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
              Select a Date:
            </label>
            <GfgDatePicker />
          </div>
        </div>
        <div className="max-w-xl w-full md:w-1/2 bg-white rounded-lg shadow-md p-6  ml-0 md:ml-4">
          {showPaymentOptions ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
              <PaymentOptions handlePaymentSubmit={handlePaymentSubmit} />
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
              <p>Please fill in all the required fields.</p>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-xl bg-white rounded-lg shadow-md p-6 mt-0 mb-6 text-center">
        <h3 className="text-3xl font-bold mb-4">Price: ${price}</h3>
      </div>
    </div>
  );
};

export default BookingForm;