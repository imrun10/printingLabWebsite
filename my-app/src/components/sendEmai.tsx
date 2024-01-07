'use server';

import {Resend} from "resend"
const resend = new Resend('re_5JKp95pj_LnNmHp7qPBAApvgnRbknn5tE');
import fs from "fs";


export const sendEmail = async (message: string) => {

    resend.emails.send({
        from: "onboarding@resend.dev",
        to: 'nasir.imrun10@gmail.com',
        subject: 'Customer Query',
        html: message,
      });}




      export const sendEmailwAttachment = async (message: string, selectedFile: string) => {
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