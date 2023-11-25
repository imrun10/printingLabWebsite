import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function PaypalButton()  {
  const clientId = "AY6j69-ffBjNQHC9regAy8cCfijarsSWRM2nRIR3QWFeN_t3H0zc4gwbCm885xy4vKMUZuRgXKY_De48";

  const createOrder = async (data: any, actions: any): Promise<string> => {
    try {
      const response = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include any relevant order details
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order.');
      }

      const order = await response.json();
      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order.');
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const response = await fetch('/api/captureOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to capture order.');
      }

      // Handle the payment completion, e.g., updating order status, showing a success message, etc.
    } catch (error) {
      console.error('Error capturing order:', error);
      // Handle error scenario, e.g., showing an error message to the user
    }
  };

  return (
    <div>
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        currency: 'USD',
        intent: 'capture',
        disableFunding: 'card',



        
      }}
    >
      <PayPalButtons
        style={{
          color: 'gold',
          shape: 'rect',
          label: 'pay',
          height: 50,
        }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
</div>
  );
};

