import React, { useEffect, useState } from 'react';
import Modal from './paymentPopUp';
import PayPalButtonComponent from './Paypal';
import GfgDatePicker from '../calender';
import '../animation.css';
import './calender.css';

type Value = ValuePiece | [ValuePiece, ValuePiece];
type ValuePiece = Date | null;

interface BookingFormProps {
  price: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ price }) => {
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [totalPrice, setTotalPrice] = useState(price.toString());
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [universityValid, setUniversityValid] = useState(false);

  function handlepaymentSuccess() {
    console.log('Success');
  }

  function handleFailure() {
    console.log('Failure');
  }

  const handleSuccess = () => {
    console.log('Payment submitted');
  };

  useEffect(() => {
    if (name.length >= 4 && university.length >= 4) {
      setNameValid(true);
      setUniversityValid(true);
    } else {
      setNameValid(false);
      setUniversityValid(false);
    }

    if (name && university && totalPrice && selectedDate) {
      setShowPaymentOptions(true);
    } else {
      setShowPaymentOptions(false);
    }
  }, [name, university, totalPrice, selectedDate]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen">
      <div className="max-w-xl bg-white shadow-md p-6 m-0 h-96 w-96 rounded-lg relative">
        <h2 className="text-3xl font-bold mb-4">Booking</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              nameValid ? 'border-green-500' : ''
            }`}
          />
          {name.length > 0 && name.length < 4 && (
            <p className="text-red-500 text-sm mt-1">Name must be at least 4 characters</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="university" className="block text-gray-700 font-bold mb-2">
            University:
          </label>
          <input
            type="text"
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              universityValid ? 'border-green-500' : ''
            }`}
          />
          {university.length > 0 && university.length < 4 && (
            <p className="text-red-500 text-sm mt-1">University must be at least 4 characters</p>
          )}
        </div>
        <div className="mb-4 mt-3">
          <GfgDatePicker setSelectedDate={setSelectedDate} />
        </div>
        <div className="absolute bottom-4 right-4">
        
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Price:</h3>
              <div className="flex items-baseline">
                <h4 className="text-4xl font-bold">${price}</h4>
              </div>
            </div>
  
          {showPaymentOptions && nameValid && universityValid && (
            <Modal showModal={showPaymentOptions} onSuccess={handlepaymentSuccess} onFailure={handleFailure} amount={price} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;