"use client";
//client rendered upload and pay stage



import React, { useState, createContext, use, useEffect } from "react";

import Header from "@/components/sections/Header";
import "tailwindcss/tailwind.css";
import Upload from "@/components/UploadPage/Upload";
import { fetchCustomer, fetchUser } from "@/api/database/fetch";
import BookingForm from "@/components/Payments/BookingForm";
import "@/app/upload/background.css";
import Checkout from "@/components/paymentT/Checkout";
import { customer } from "@/utils/constructs";
import { purchase } from "@/utils/constructs";



const UploadPage: React.FC = () => {
  const [done, setDone] = useState<boolean>(false); // boolean to switch between the upload and pay stage
  const [success, setSuccess] = useState<boolean>(false); // boolean to check if the payment was successful
  const [customer, setCustomer] = useState<customer | null>(null); // customer object
  const [purchase, setPurchase] = useState<purchase | null>(null); // purchase object

  useEffect(() => {
      fetchUser() // promise to get customer data from the database
      .then((user) => {
        if (user) { // checks if the user is already signed in
          console.log("Signed in already", user.user.id); // log the user id
          fetchCustomer(user.user.id) //promises to get the customer data from the database
          .then((data) => {setCustomer(data[0]!)}).catch((error) => {console.log(error)}); // if it does, set the customer object to the data. ! means that the data is not null
        } else {
          console.log("Not signed in"); // not signed in. it should instead rerout you to the sign in page
        }
      }) .catch((error) => console.log("Error fetching materials:", error)) // if there is an error, log the error
      .finally(() => setDone(false));}, []); // finally, set done to false (no need for this section really but it is there for good measure

  
      useEffect(() => {
        console.log(customer, "customer"); // double checks the customer object
      }
      , [customer]);
useEffect(() => {
  console.log(purchase, "purchase") // double checks the purchase object
}
, [purchase]);



  return (
    <div className="pb-0 mb-0">
      <header>
        <Header />
      </header>

      <div
        className="content pb-0 mb-0"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }} 
      >
        <div
          style={{
            width: "90%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {!done ? (  // this will essentially check if the upload stage is done 
            <Upload
              onPurchase={setPurchase} // this will return the purchase object
              onDone={setDone} //This will retyrn the done object and it should be set to true
            />
          ) : (
            <div>
              
              <Checkout
                              onSuccess={setSuccess}
                              onReturn={setDone}
                              purchase={purchase!}
                              customer={customer!}

             />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
