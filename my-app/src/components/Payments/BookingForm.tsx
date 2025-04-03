import React, { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import Modal from './paymentPopUp';
import PayPalButtonComponent from './Paypal';
import GfgDatePicker from '../calender';
import '../componentsCSS/animation.css';
import '../componentsCSS/calender.css';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

type Value = ValuePiece | [ValuePiece, ValuePiece];
type ValuePiece = Date | null;

interface BookingFormProps {
  price: number;
  onReturn: (done: boolean) => void;
  onSuccess: (success: boolean) => void;
}


const BookingForm: React.FC<BookingFormProps> = ({ price,onReturn,onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [address, setAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState(price.toString());
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [universityValid, setUniversityValid] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [showDineButton, setShowDineButton] = useState(false);
  const [stlFile, setStlFile] = useState<File | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams()



  function handlepaymentSuccess() {
    console.log('Success');
  }

  function stringToFile(fileString:string, fileName:string) {
    const byteString = atob(fileString.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const selectedFile = new Blob([ab], { type: 'application/octet-stream' });
    return selectedFile;
  }


  function handleFailure() {
    console.log('Failure');
  }

  const handleSuccess = () => {
    console.log('Payment submitted');
  };

  useEffect(() => {
    if (name.length >= 4 && university.length >= 4 && address.length >= 4) {
      setNameValid(true);
      setUniversityValid(true);
      setAddressValid(true);
    } else {
      setNameValid(false);
      setUniversityValid(false);
      setAddressValid(false);
    }

    if (name && university && address && totalPrice && selectedDate) {
      setShowPaymentOptions(true);
    } else {
      setShowPaymentOptions(false);
    }

    if (nameValid && universityValid && addressValid && selectedDate) {
      setShowDineButton(true);
    } else {
      setShowDineButton(false);
    }
  }, [name, university, address, totalPrice, selectedDate]);

  const handleDineBeforePayment = () => {
    console.log('Dine before payment');
    // Implement your dine before payment logic here
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen">
      <Card sx={{ width: 600, height: 700, '--Card-radius': '0px' }}>
        <CardContent>
          <Typography component="div">
            Booking
          </Typography>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name:
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                nameValid ? 'border-green-500' : ''
              }`}
            />
            {name.length > 0 && name.length < 4 && (
              <Typography className="text-red-500 text-sm mt-1">Name must be at least 4 characters</Typography>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="university" className="block text-gray-700 font-bold mb-2">
              University:
            </label>
            <Input
              type="text"
              id="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                universityValid ? 'border-green-500' : ''
              }`}
            />
            {university.length > 0 && university.length < 4 && (
              <Typography className="text-red-500 text-sm mt-1">University must be at least 4 characters</Typography>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address:
            </label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                addressValid ? 'border-green-500' : ''
              }`}
            />
            {address.length > 0 && address.length < 4 && (
              <Typography className="text-red-500 text-sm mt-1">Address must be at least 4 characters</Typography>
            )}
          </div>
          <div className="mb-4 mt-3">
            {/* Include Google Maps integration here */}
            {/* Replace the placeholder component with the actual Google Maps component */}
            <div>Google Maps</div>
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Price:</h3>
              <div className="flex items-baseline">
                <h4 className="text-4xl font-bold">${price}</h4>
              </div>
            </div>
            {showPaymentOptions && nameValid && universityValid && (
              <Modal
                showModal={showPaymentOptions}
                onSuccess={handlepaymentSuccess}
                onFailure={handleFailure}
                amount={price}
              />
            )}
            {showDineButton && (
              <Button onClick={handleDineBeforePayment} color="primary">
                Done
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;