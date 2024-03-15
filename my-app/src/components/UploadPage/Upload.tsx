"use client";
import React, { use, useEffect, useState } from "react";
import StlViewer from "./StlViewer";
import StlFileReader from "./FileReader";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

import { useRouter } from "next/navigation";
import { Material, Finish} from "../../utils/constructs";
import { fetchMaterials, fetchFinish,fetchItem } from "../../api/database/fetch";
import Cards from "../Card";
import { updatePrice } from "@/utils/funcs";
import { purchase } from "../../utils/constructs";




interface purchasing { // construct unique to this page to return the purchase object and the done boolean
  onPurchase: (purchase: purchase) => void;
  onDone: (done: boolean) => void;
}

export default function Upload({onPurchase,onDone}:purchasing) {
  const [loading, setLoading] = useState<boolean>(true); // loading boolean (implement loading screen later)
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // selected file
  const [tab, setTab] = useState<number>(0); // tab number
  const [color, setColor] = useState("#fff"); // color (does not update right now)
  const [purchase, setPurchase] = useState<purchase>({} as purchase); // purchase object
  const [materials, setMaterials] = useState<Material[]>([]); // array of materials
  const [selectedMaterial, setSelectedMaterial] = useState<string>(""); // selected material
  const [finish, setFinish] = useState<Finish[]>([]); // array of finishes
  const [selectedFinish, setSelectedFinish] = useState<string>(""); // selected finish
  const [price, setPrice] = useState<number>(0); // price
  const [done, setDone] = useState<boolean>(false); // done boolean
  const [size, setSize] = useState<number[]>([0,0,0]); // size of the model needs to be redone
  const [check, setCheck] = useState<string>(""); // idk
  const router = useRouter();


 
  function complete() {
    onPurchase(purchase);
    onDone(true);
  } // function to run when the purchase is complete
  




    useEffect(() => {
      fetchMaterials() // promise to fetch materials
        .then((data) => setMaterials(data))
        .catch((error) => console.log("Error fetching materials:", error))
        .finally(() => setLoading(false));
  
      fetchFinish() // promise to fetch finishes
        .then((data) => setFinish(data))
        .catch((error) => console.log("Error fetching finish:", error))
        .finally(() => setLoading(false));
  
      console.log("Effect triggered");
    }, []); // does this as soon as the page is rendered (fetches materials and finishes)



  useEffect(() => {
    function defaultTab() {
      setTab(1);
    } 
    defaultTab();
  }, []); // makes sure i am in tab 1
  
  
//Update the price
useEffect(() => { //use memo might be better but idk
   updatePrice(materials, finish, selectedMaterial, selectedFinish, size).then((price) => setPrice(price)); //updates the price then sets price
}, [selectedMaterial, selectedFinish]);




    



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
      purchase.color = color;
      purchase.Finish = selectedFinish;
      purchase.Material = selectedMaterial;
      purchase.Weight = size[0]*size[1]*size[2]*0.000001
      bufferize(selectedFile!).then((data) => {purchase.STL = data!;});

    

      
      complete();

      setDone(true)



      console.log("price:", price);
      
    }}
    function calc(price: number, density: number) {
      return price*volume*density*0.001;
    }
// Function to convert file to string
async function fileToString(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const colors = ["Black","white","Grey","Brown"]
useEffect(() => {
  const convertFileToString = async () => {
    const fileString = await fileToString(selectedFile!);
    setStringFile(fileString);
  };

  if (selectedFile) {
    convertFileToString();
  }
}, [selectedFile]);



  return (
    <div className="grid-rows-2 gap-0">
          <div className="h-96 grid grid-cols-4 gap-0 flex-1">
      <div className="container display item-shadow col-span-3 flex flex-col">
        {tab === 1 && selectedFile && <StlViewer file={selectedFile} onData={setSize} onSize={setVolume} onCheck={setCheck}/>}
        {tab === 2 &&
          materials.map((material) => {
            return (
              <div key={material.Name} onClick={() => {setSelectedMaterial(material.Name)}} className="flex-auto h-full ">
                <Cards name={material.Name} price={price.toFixed(2).toString()+"BHD"} CardSelect={selectedMaterial === material.Name} />
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
          colors.map((col) => {
            return (
              <div key={col} onClick={() => setColor(col)} className="flex-auto h-full">
                <Cards name={col} price="0" CardSelect={col === color} />
              </div>
            );
          }
        ))}
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
        <div className="button-container" style={{ display: 'flex' }}>
        {
  color !== '' && tab === 4 ? (
    <button>
      <div
        className="item-shadow bg-green-500 text-white font-sans font-medium flex items-center justify-center text-center text-lg hover:bg-green-600 hover:opacity-75 hover:transition-opacity duration-300"
        style={{ width: '100%', maxWidth: '100px' }} // Adjust the maxWidth as needed
        onClick={handleNext}
      >
        Done
      </div>
    </button>
  ) : (
    <div
      className="item-shadow bg-blue-800 text-white font-sans h-full font-medium flex items-center justify-center text-center text-lg hover:opacity-75 hover:transition-opacity duration-300"
      onClick={handleNext}
    >
      Next
    </div>
  )
}
</div>
        </div>
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-xl">
      Total: {price.toFixed(2)} BHD
    </div>
  
        <div className=" h-8 pt-1">
          {tab==1 && <StlFileReader onChange={setSelectedFile} />}
        </div>

      </div>
      
    
    </div>
  );
}