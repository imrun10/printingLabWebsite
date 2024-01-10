"use client";
import React from "react";
import Header from "@/components/Header";
import { Button, Typography, Card, CardContent } from "@mui/joy";
import Image from "next/image";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import Link from "next/link";
import Footer from "@/components/footer";
import { send } from "process";
import { sendEmail } from "@/components/sendEmai";
 import { useEffect } from "react";

  

const HomePage = () => {
  const [emailSent, setEmailSent] = React.useState(false);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
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

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="flex flex-col space-y-8 bg">
        <div className="w-full bg-red-600 pb-60 relative">
          <Typography className="text-6xl font-thin text-white absolute right-0 bottom-0 mb-8 mr-8 animate-fade-up animate-ease-in">
            DLabs 3D Printing
          </Typography>
        </div>
        <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl dark:text-white"  >We invest in the world’s potential</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Learn more
            </a>  
        </div>
    </div>
</section>
        <div className="flex  pb-40">
          <div className="flex-grow">
            <div className="flex flex-col space-y-4 w-2/3 pl-10 ml-6 mr-0 pr-0 pt-10">
              <p className="text-base md:text-base pl-2 pr-1 pt-4">
                Hello! Welcome to DLabs 3D Printing. We provide innovative solutions for 3D printing and more.
              </p>
              <div className="flex space-x-4 pl-9 pt-8 w-4/5">
                <Link href="#">
                  <Button color="danger" size="lg" variant="soft">
                    Learn More
                  </Button>
                </Link>
                <Link href="/dev">
                  <Button endDecorator={<KeyboardArrowRight />} color="danger" size="lg" variant="soft">
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-0 m-0 pr-11 mr-10">
            <Image
              src="/Wavy_Bus-10_Single-03.jpg"
              alt="Section 1 Image"
              width={900}
              height={800}
            />
          </div>
        </div>






        <div className="space-y-8 pt-40 pb-40 relative">
          <div
            className="absolute top-0 left-0 w-full h-full"
            
          />
          <div className="flex flex-col space-y-4 pr-14 pl-14">
            <h2 className="text-2xl font-bold text-center">Testimonials</h2>
            <p className="text-lg text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu felis ac metus lacinia commodo.
            </p>
            <p className="text-lg text-center">
              Etiam finibus leo eget est venenatis, non hendrerit nisl faucibus. Nullam vitae consectetur arcu.
            </p>
          </div>
        </div>


   

        <div className="flex flex-col pt-40 space-y-4">
          <h2 className="text-2xl text-center pb-0 mb-0 font-bold">Join our community.</h2>
          <p className="text-sm font-thin text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet mi ut sagittis placerat.
          </p>
          <div className="max-w-md mx-auto">
            <form className="space-y-4"   onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)?.value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)?.value;
    const organization = (form.elements.namedItem("organization") as HTMLInputElement)?.value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;
    setEmailSent(true); 

    const emailContent = `
      <p> ${email}</p>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Organization:</strong> ${organization}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    sendEmail(emailContent);
  }}>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-500 rounded-md"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-500 rounded-md"
                placeholder="Last Name"
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-500 rounded-md"
                placeholder="Organization"
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-500 rounded-md"
                placeholder="Email"
                required
              />
              <textarea
                className="w-full px-4 py-2 border border-gray-500 rounded-md"
                placeholder="Message"
                required
                rows={4}
              ></textarea>
              <button
  type="submit"
  className="w-full px-4 py-2 border border-gray-500 rounded-md text-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out"

>
  Submit
</button>
            </form>
          </div>
          {emailSent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card>
            <CardContent>
              <Typography >Email Sent!</Typography>
              <Typography >Thank you for contacting us.</Typography>
            </CardContent>
          </Card>
        </div>
      )}
        </div>
      </div>
     

<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>


    </div>
  );
};

export default HomePage;