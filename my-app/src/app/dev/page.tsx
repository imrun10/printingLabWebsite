"use client";
import React, { useState, createContext, use, useEffect } from "react";

import Header from "@/components/Header";
import "tailwindcss/tailwind.css";
import CardWrapper from "@/components/StlViewer/StlViewLayout";
import { fetchUser } from "@/api/database/fetch";
import BookingForm from "@/components/Payments/BookingForm";
import "@/app/dev/background.css";
import Checkout from "@/components/paymentT/Checkout";
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

  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (user) {
        console.log("Signed in already", user);
      } else {
        console.log("Not signed in");
      }
      console.log(done);
    };

    checkUser();
  }, []);

  useEffect(() => {
    console.log(materials,"materials")
    }
  , [materials]);

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
            <CardWrapper
              onFinish={setDone}
              onColor={setColor}
              onFile={setStlFile}
              onWeight={setWeight}
              onPrice={setPrice}
              onMaterial={setMaterial}
              onFinishing={setFinishing}
              onSize={setSize}
            />
          ) : (
            <div>
              {" "}
              <Checkout
                              onSuccess={setSuccess}
                              onReturn={setDone}
                              price={price}


                products={{
                  material: materials!,
                  finishing: finishing!,
                  volume: volume?.toString()!,
                  weight: weight?.toString()!,
                }}
                userInfo={{
                  name: ".",
                  lastName: ".",
                  address: ".",
                  mobileNumber: ".",
                  city: ".",
                  Organization: ".",
                  zip: ".",
                  country: ".",
                }}
             />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
