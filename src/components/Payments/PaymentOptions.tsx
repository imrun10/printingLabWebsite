import React, { useState } from 'react';

interface PaymentOptionsProps {
  handlePaymentSubmit: (e: React.FormEvent) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ handlePaymentSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded item-shadow">
      <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Payment Method:</label>
          <select className="form-select block w-full p-2 border border-gray-300 rounded" onChange={handleOptionChange}>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="debit-card">Debit Card</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentOptions;