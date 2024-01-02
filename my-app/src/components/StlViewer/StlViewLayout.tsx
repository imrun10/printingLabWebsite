"use client";
import React, { use, useEffect, useState } from "react";
import StlViewer from "./StlViewer";
import StlFileReader from "./FileReader";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import ColorPicker from 'react-pick-color';
import { useRouter } from "next/navigation";
import { Material, Finish, Purchase} from "../../utils/constructs";
import { fetchMaterials, fetchFinish,fetchItem } from "../../api/database/fetch";

import Cards from "../Card";
import Link from "next/link";
import { weightCosts } from "@/utils/calcs";

type Value = ValuePiece | [ValuePiece, ValuePiece];
type ValuePiece = Date | null;



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
  const [price, setPrice] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const [size, setSize] = useState<number[]>([0,0,0]);
  const [volume, setVolume] = useState<number>(0);
 

  

    useEffect(() => {
      fetchMaterials()
        .then((data) => setMaterials(data))
        .catch((error) => console.log("Error fetching materials:", error))
        .finally(() => setLoading(false));
  
      fetchFinish()
        .then((data) => setFinish(data))
        .catch((error) => console.log("Error fetching finish:", error))
        .finally(() => setLoading(false));
  
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
  
  
//Update the price
useEffect(() => {
  async function updatePrice(selectedMaterial: string, selectedFinish: string, size: number[]) {
    let currentPrice = 0;
  
    if (selectedMaterial) {
      try {
        const materials = await fetchMaterials();
        const material = materials.find((m) => m.Name === selectedMaterial);
        if (material) {
          currentPrice = material.Price * volume * material.Density * 0.001;
          console.log("currentPrice", currentPrice);
        }
      } catch (error) {
        console.log("Error fetching materials:", error);
      }
    }
  
    if (selectedFinish) {
      try {
        const finishes = await fetchFinish();
        const fin = finishes.find((f) => f.Name === selectedFinish);
        if (fin) {
          currentPrice += currentPrice * (fin.Percentage / 100);
        }
      } catch (error) {
        console.log("Error fetching finish:", error);
      }
    }
  
    console.log("currentPrice", currentPrice);
    return currentPrice;
  }

  //if color

  async function fetchData() {
    try {
      const price = await updatePrice(selectedMaterial, selectedFinish, size);
      setPrice(price);
      console.log("price", price);
    } catch (error) {
      console.log("Error updating price:", error);
    }
  }

  fetchData();
}, [selectedMaterial, selectedFinish]);

  //useEffect(() => {
 //   console.log("Material:", selectedMaterial);
 // }, [selectedMaterial]);

  useEffect(() => {
    const validateFile = async () => {
      console.log("Validating file...");
      if (selectedFile) {
          setValidationResult("Valid STL");  
    };

    validateFile();
  }}, [selectedFile]);

  
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

  function updatePrice(cost:number) {
    setPrice(price+cost)
    console.log("price", price)
  }
    

  useEffect(() => { 
    if(selectedFile){
      setVolume(size[0]*size[1]*size[2])
    }},[size])

  function handleNext() {
  
    if (tab === 1 && selectedFile) {
      setDone(false)
    console.log("size", size)
      console.log("volume", size[0]*size[1]*size[2]);
      console.log("Materials:", materials);


      
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
      purchase.SizeXYZ = size
      purchase.Service = ""
      purchase.Weight = size[0]*size[1]*size[2]*0.000001
      

      setDone(true)



      console.log("price:", price);
      
    }}
    function calc(price: number, density: number) {
      return price*volume*density*0.001;
    }
  return (
    <div className="grid-rows-2 gap-0">
          <div className="h-96 grid grid-cols-4 gap-0 flex-1">
      <div className="container display item-shadow col-span-3 flex flex-col">
        {tab === 1 && selectedFile && <StlViewer file={selectedFile} onData={setSize} onSize={setVolume}/>}
        {tab === 2 &&
          materials.map((material) => {
            return (
              <div key={material.Name} onClick={() => {setSelectedMaterial(material.Name)}} className="flex-auto h-full ">
                <Cards name={material.Name} price={calc(material.Price,material.Density).toFixed(2).toString()+"BHD"} CardSelect={selectedMaterial === material.Name} />
              </div>
            );
          })}
        {tab === 3 &&
          finish.map((fin) => {
            return (
              <div key={fin.Name} onClick={() =>setSelectedFinish(fin.Name)} className="flex-auto h-full border-8">
                <Cards name={fin.Name} price={fin.Percentage.toString()+ '%'} CardSelect={fin.Name === selectedFinish} />
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
            color!="" && tab==4? <Link href={{pathname:"/dev/payment", query: {
              price: price,
              color: color,
              finish: selectedFinish,
              size: size,
              material: selectedMaterial,
            
            }}}><div
            className="item-shadow bg-green-500 text-white font-sans pb-6 font-medium flex items-center justify-center text-center text-lg hover:bg-green-600 hover:opacity-75 hover:transition-opacity duration-300"
            onClick={handleNext}
          >
            Done
          </div></Link>: <div
              className="item-shadow bg-blue-800 text-white font-sans pb-6 font-medium flex items-center justify-center text-center text-lg hover:opacity-75 hover:transition-opacity duration-300"
              onClick={handleNext}
            >
              Next
            </div>
        }
        </div>
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-xl">
      Total: {price.toFixed(2)} BHD
    </div>
  
        <div>
          {tab==1 && <StlFileReader onChange={setSelectedFile} />}
          {tab==1 && selectedFile && <p className="m-0 p-0">{validationResult}</p>}
        </div>
      </div>
      
    
    </div>
  );
}