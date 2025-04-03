import React from 'react';

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any, data: any) => void;
}

const PayPalButtonComponent: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  return (
    <div>
    
        
    
    </div>
  );
};

export default PayPalButtonComponent;