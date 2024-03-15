"use server";
//rednered on server fo security
import { Resend } from "resend";
const resend = new Resend("re_5JKp95pj_LnNmHp7qPBAApvgnRbknn5tE");

// we need to create our own email server so we can get unlimeted emails on resend. we can use free domains but mr khaled alread has a domain

export const sendEmail = async (message: string) => { // send customer query email (does not work)
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "nasir.imrun10@gmail.com",
    subject: "Customer Query",
    html: message,
  });
};

export const sendEmailwAttachment = async ( // send order email to lab with stl file. we need to add more information to the email
  message: string,
  selectedFile: string
) => {
  try {
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "nasir.imrun10@gmail.com",
      subject: "Order Confirmation",
      html: message,
      attachments: [
        {
          filename: "Content.stl",
          content: selectedFile,
        },
      ],
    });
  } catch (error) {
    console.error("Error sending email with attachment:", error);
  }
};
