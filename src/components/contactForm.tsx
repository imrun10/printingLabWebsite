'use client'
import React, { useEffect } from "react";
import { sendEmail } from "@/utils/sendEmail";

export default function Contact() {
    const [emailSent, setEmailSent] = React.useState(false);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                emailSent &&
                event.target.closest(".pop-up") === null
            ) {
                setEmailSent(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [emailSent]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
        const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)?.value;
        const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)?.value;
        const organization = (form.elements.namedItem("organization") as HTMLInputElement)?.value;
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;

        const emailContent = `
            <p> ${email}</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;

        sendEmail(emailContent);
        window.alert('Thank you for your submission!');
        form.reset(); // Reset the form fields
        setEmailSent(true);
    };

    return (
        <div className="pt-10 pb-24">  
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="text" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="First Name" required />
                    <input type="text" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="Last Name" required />
                    <input type="text" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="Organization" required />
                    <input type="text" className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="Email" required />
                    <textarea className="w-full px-4 py-2 border border-gray-500 rounded-md" placeholder="Message" required rows={4}></textarea>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 border border-gray-500 rounded-md text-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
