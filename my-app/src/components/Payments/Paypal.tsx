import React from 'react';
import { PayPalButton } from "react-paypal-button-v3/src/index"

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any, data: any) => void;
}

const PayPalButtonComponent: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  return (
    <div>
    
        <PayPalButton
          amount={amount}
          onSuccess={(details: any, data: any) => onSuccess(details, data)}
          options={{
            clientId: 'AY6j69-ffBjNQHC9regAy8cCfijarsSWRM2nRIR3QWFeN_t3H0zc4gwbCm885xy4vKMUZuRgXKY_De48',
          }}
        />
    
    </div>
  );
};

export default PayPalButtonComponent;