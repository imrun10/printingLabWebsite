"use client";
import React, { use, useContext, useEffect, useState } from "react";
import StlViewer from "./StlViewer";
import StlFileReader from "./FileReader";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import ColorPicker from 'react-pick-color';
import DatePicker from "react-date-picker";
import { useRouter } from "next/navigation";
import { cookies } from 'next/headers'
import Router from "next/router";



import Cards from "./Card";
import superbase from "../app/utils/superbase";
import Link from "next/link";
import { NoColorSpace } from "three";
type Value = ValuePiece | [ValuePiece, ValuePiece];
type ValuePiece = Date | null;

interface Material {
  Name: string;
  Price: number;
}
interface Finish {
  Name: string;
  Percentage: number;
}

interface Purchase {
  stlFile: File;
  Price: number;
  Color: string;
  SizeXYZ: number[];
  Finish: string;
  Quantity: number;
  Service: string;
}

export default function CardLayout() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tab, setTab] = useState<number>(0);
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const [finish, setFinish] = useState<Finish[]>([]);
  const [color, setColor] = useState("#fff");
  const [purchase, setPurchase] = useState<Purchase>({} as Purchase);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [ready, setReady] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const [size, setSize] = useState<number[]>([0,0,0]);
 

  function getTotalPrice(selectedMaterial: string, selectedFinish: string) {
    for (let i = 0; i < materials.length; i++) {
      if (materials[i].Name === selectedMaterial) {
        for (let j = 0; j < finish.length; j++) {
          if (finish[j].Name === selectedFinish) {
            setPrice(materials[i].Price + (materials[i].Price * (finish[j].Percentage/100)))
          }
        }
      }
    }}

  async function getMaterials() {
    try {
      const { data, error } = await superbase.from("Materials").select("*");
      if (error) {
        throw new Error(error.message);
      }
      setMaterials(data as Material[]);
    } catch (error) {
      console.log("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getFinish() {
    try {
      const { data, error } = await superbase.from("Finish").select("*");
      if (error) {
        throw new Error(error.message);
      }
      setFinish(data as Finish[]);
    } catch (error) {
      console.log("Error fetching finish:", error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    getMaterials();
    getFinish();
    console.log("Effect triggered");
  }, []);

  // purchase object: {file: stl file, material: string, xyzSize = {x: number, y: number, z: number}, finishing: string, quantity: number, color: string, service: string cost: number}
  // material cost {material: string, cost: number}

  async function defaultTab() {
    setTab(1);
  }

  useEffect(() => {
    defaultTab();
  }, []);

  //useEffect(() => {
 //   console.log("Material:", selectedMaterial);
 // }, [selectedMaterial]);

  useEffect(() => {
    const validateFile = async () => {
      console.log("Validating file...");
      if (selectedFile) {
        try {
          await validateSTLFile(selectedFile);
          setValidationResult("Valid STL");
        } catch (error) {
          setValidationResult((error as Error).message);
        }
      }
    };

    validateFile();
  }, [selectedFile]);

  function validateSTLFile(selectedFile: File) {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        const arrayBuffer = reader.result as ArrayBuffer;
        const loader = new STLLoader();
        try {
          loader.parse(arrayBuffer);
          resolve();
        } catch (error) {
          reject(new Error("Invalid STL file"));
        }
      };
      reader.onerror = function () {
        reject(new Error("Failed to read file"));
      };
      reader.readAsArrayBuffer(selectedFile);
    });
  }
  const router = useRouter();
  useEffect(() => {
    getTotalPrice(selectedMaterial, selectedFinish) 
  },[tab])


  function handleNext() {
  
    if (tab === 1 && selectedFile && validationResult === "Valid STL") {
      setDone(false)
      
      setTab(2);
    } else if (tab === 2 && selectedMaterial) {
      setDone(false)

      setTab(3);
    } else if (tab === 3 && selectedFinish) {

      setTab(4);

    } else if (tab === 4 && color) {
      purchase.Price = price;
      purchase.Color = color;
      purchase.Finish = selectedFinish;
      purchase.SizeXYZ = [1,2,3]
      setDone(true)



      console.log("price:", price);
    }}
  return (
    <div className="grid-rows-2 gap-0">
          <div className="h-96 grid grid-cols-4 gap-0 flex-1">
      <div className="container display item-shadow col-span-3 flex flex-col">
        {tab === 1 && selectedFile && <StlViewer file={selectedFile} />}
        {tab === 2 &&
          materials.map((material) => {
            return (
              <div key={material.Name} onClick={() => setSelectedMaterial(material.Name)} className="flex-auto h-full ">
                <Cards name={material.Name} price={material.Price} CardSelect={selectedMaterial === material.Name} />
              </div>
            );
          })}
        {tab === 3 &&
          finish.map((fin) => {
            return (
              <div key={fin.Name} onClick={() =>setSelectedFinish(fin.Name)} className="flex-auto h-full border-8">
                <Cards name={fin.Name} price={fin.Percentage} CardSelect={fin.Name === selectedFinish} />
              </div>
            );
          })}
        {tab === 4 && (
          <ColorPicker
            color={color}
            onChange={(color) => setColor(color.hex)}
          />
        )}
      </div>

        <div className="grid grid-rows-4 grid-flow-col gap-0">
        <div
            className={`flex-1 item-shadow ${
              tab === 1 ? "bg-blue-500 text-white" : ""
            } flex items-center justify-center`}
            onClick={() => setTab(1)}
          >
            Upload Model
          </div>

          <div
            className={`flex-1 item-shadow ${
              tab === 2 ? "bg-blue-500 text-white" : ""
            } flex items-center justify-center`}
            onClick={() => selectedFile ? setTab(2): null}
          >
            Select Material
          </div>
          <div
            className={`flex-1 item-shadow ${
              tab === 3 ? "bg-blue-500 text-white" : ""
            } flex items-center justify-center`}
            onClick={() => setTab(3)}
          >
            Select Finish
          </div>
          <div
            className={`flex-1 item-shadow ${
              tab === 4 ? "bg-blue-500 text-white" : ""
            } flex items-center justify-center`}
            onClick={() => setTab(4)}
          >
            Select Color
          </div>
        </div>
      </div>

      <div className="row-span-1 grid-cols-4">
        
        <div className="col-span-1 pb-0 mb-0 ">
          {
            done ? <Link href={{pathname:"/dev/payment", query: {
              

            }}}><div
            className="item-shadow bg-blue-800 text-white font-sans pb-6 font-medium flex items-center justify-center text-center text-lg hover:opacity-75 hover:transition-opacity duration-300"
            onClick={handleNext}
          >
            Next
          </div> </Link>: <div
              className="item-shadow bg-blue-800 text-white font-sans pb-6 font-medium flex items-center justify-center text-center text-lg hover:opacity-75 hover:transition-opacity duration-300"
              onClick={handleNext}
            >
              Next
            </div>
        }
        </div>
        <div>
          {tab==1 && <StlFileReader onChange={setSelectedFile,setSize} />}
          {tab==1 && selectedFile && <p className="m-0 p-0">{validationResult}</p>}
        </div>
      </div>
      
    
    </div>
  );
}