import client from '../../utils/paypal/index';
import paypal from '@paypal/checkout-server-sdk'
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handles the request to capture an order and complete the payment.
 * 
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 * @returns A JSON response indicating the success or failure of the request.
 */
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {

    // Check if the request method is POST
    if(req.method != "POST")
        return res.status(404).json({success: false, message: "Not Found"})

    // Check if the orderID is provided in the request body
    if(!req.body.orderID)
        return res.status(400).json({success: false, message: "Please Provide Order ID"})

    // Capture order to complete payment
    const { orderID } = req.body
    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({
        "amount": {
            "currency_code": "BHD",
            "value": "220.00"
        }
    })
    const response = await PaypalClient.execute(request)

    // Check if the response is empty
    if (!response) {
        return res.status(500).json({success: false, message: "Some Error Occurred at backend"})
    }

    // Your Custom Code to Update Order Status
    // And Other stuff that is related to that order, like wallet
    // Here I am updating the wallet and sending it back to frontend to update it on frontend

    // Send a JSON response with the captured order data
    res.status(200).json({success: true, data: {order: response.result}})
}