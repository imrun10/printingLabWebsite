'use client';
import React, { useEffect, useState } from "react";
import { sendEmail } from "@/utils/sendEmail";

export default function Contact() {
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setEmailSent(false);
        }, 3000); // Hide pop-up after 3 seconds

        return () => clearTimeout(timer);
    }, [emailSent]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
        const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)?.value;
        const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)?.value;
        const organization = (form.elements.namedItem("organization") as HTMLInputElement)?.value;
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;

        const emailContent = `
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;

        await sendEmail(emailContent);
        setEmailSent(true);
        form.reset(); // Clear form fields after submission
        // Show pop-up notification
        alert("Notification Sent!");
    };

    return (
        <div className="pt-10 pb-24">  
            <div className="max-w-md mx-auto">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="text" name="firstName" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="First Name" required />
                    <input type="text" name="lastName" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="Last Name" required />
                    <input type="text" name="organization" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="Organization" required />
                    <input type="email" name="email" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="Email" required />
                    <textarea name="message" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="Message" required rows={4}></textarea>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 border border-gray-500 rounded-md text-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

