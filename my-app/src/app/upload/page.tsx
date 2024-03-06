"use client";
import React, { useState, createContext, use, useEffect } from "react";

import Header from "@/components/Header";
import "tailwindcss/tailwind.css";
import CardLayout from "@/components/StlViewer/StlViewLayout";
import { fetchCustomer, fetchUser } from "@/api/database/fetch";
import BookingForm from "@/components/Payments/BookingForm";
import "@/app/upload/background.css";
import Checkout from "@/components/paymentT/Checkout";
import { customer } from "@/utils/constructs";
import { purchase } from "@/utils/constructs";

interface Purchase {
  stlFile: File;
  Price: number;
  Color: string;
  SizeXYZ: number[];
}


const UploadPage: React.FC = () => {
  const [done, setDone] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [stlFile, setStlFile] = useState<File | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [materials, setMaterial] = useState<string | null>(null);
  const [size, setSize] = useState<number[]>([0, 0, 0]);
  const [finishing, setFinishing] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [customer, setCustomer] = useState<customer | null>(null);
  const [purchase, setPurchase] = useState<purchase | null>(null);

  useEffect(() => {
      fetchUser()
      .then((user) => {
        if (user) {
          console.log("Signed in already", user.user.id);
          fetchCustomer(user.user.id)
          .then((data) => {setCustomer(data[0]!)}).catch((error) => {console.log(error)});
        } else {
          console.log("Not signed in");
        }
      }) .catch((error) => console.log("Error fetching materials:", error))
      .finally(() => setDone(false));}, []);

  
      useEffect(() => {
        console.log(customer, "customer");
      }
      , [customer]);



  //reload page when done is changed

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
          {!done ? (
            <CardLayout
              onPurchase={setPurchase}
              onDone={setDone}
            />
          ) : (
            <div>
              {" "}
              <Checkout
                              onSuccess={setSuccess}
                              onReturn={setDone}
                              purchase={purchase!}
                              customer={customer!}

             />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
