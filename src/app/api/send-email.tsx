import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function sendEMail(req:NextApiRequest,res:NextApiResponse){
  const { firstName, lastName, organization, email, message } = req.body;

  try {
    // Create a transporter using your email provider credentials
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "musaibra1984@gmail.com",
        pass: "your-email-password",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "your-email@example.com",
      to: "musaibra1984@gmail.com",
      subject: "New Form Submission",
      html: `
        <h3>New Form Submission</h3>
        <p>First Name: ${firstName}</p>
        <p>Last Name: ${lastName}</p>
        <p>Organization: ${organization}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};