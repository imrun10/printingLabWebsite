import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../utils/paypal/index';
import paypal from '@paypal/checkout-server-sdk';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is not POST
    if (req.method !== "POST") {
        return res.status(404).json({ success: false, message: "Not Found" });
    }

    // Check if the required parameters are missing in the request body
    if (!req.body.order_price || !req.body.user_id) {
        return res.status(400).json({ success: false, message: "Please Provide order_price And User ID" });
    }

    try {
        const PaypalClient = client();

        // Create a new PayPal order request
        const request = new paypal.orders.OrdersCreateRequest(); // PayPal SDK method to create order request
        request.headers['Prefer'] = 'return=representation'; // PayPal SDK method to set return url upon payment completion
        request.requestBody({ // Call PayPal SDK method to set order details
            intent: 'CAPTURE', // PayPal SDK order request type
            purchase_units: [ // PayPal SDK method to set purchase units details i.e. item details for which payment is processed
                {
                    amount: {
                        currency_code: 'BHD',
                        value: `${req.body.order_price}`,
                    },
                },
            ],
        });

        // Execute the PayPal order request
        const response = await PaypalClient.execute(request);

        // Check if the order creation was successful
        if (response.statusCode !== 201) {
            console.log("RES: ", response);
            return res.status(500).json({ success: false, message: "Some Error Occurred at the backend" });
        }

        // Your Custom Code for doing something with order
        // Usually Store an order in the database in supabase
        // And send the order data back to the frontend to update the order status

        

        // Return the successful response with the order data
        res.status(200).json({ success: true, data: { order: response.result } });
    } catch (err) {
        console.log("Err at Create Order: ", err);
        return res.status(500).json({ success: false, message: "Could Not Find the user" });
    }
}