// functions done on the server 
import { Material, Finish } from "@/utils/constructs";

export async function updatePrice(materials: Material[], finish: Finish[], selectedMaterial: string, selectedFinish: string, size: number[]) { // updates the price the moment the material and finish are selected
    let currentPrice = 0;
  
    if (selectedMaterial) {
      try {
        const material = materials.find((m) => m.Name === selectedMaterial); //find the slected materials
        if (material) {
          currentPrice = material.Price * size[0]*size[1]*size[2] * material.Density * 0.2; // 200 fills per gram
          console.log("currentPrice", currentPrice);
        }
      } catch (error) {
        console.log("Error fetching materials:", error);
        currentPrice = 0;
      }
    }
  
    if (selectedFinish) {
      try {
        const fin = finish.find((f) => f.Name === selectedFinish);
        if (fin) { // same thing as above but this time it just adds to finishes this is fine as finish is always chosen after material
          currentPrice += currentPrice * (fin.Percentage / 100);
        }
      } catch (error) {
        console.log("Error fetching finish:", error);
      }
    }
  
    console.log("currentPrice", currentPrice);
    return currentPrice;



  }

export async function convertFile(file: File): Promise<string> { //converts file to string
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  export function debufferize(arrayBuffer: ArrayBuffer, fileName: string): File {
    // Convert array buffer to Blob
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
  
    // Create File object from Blob
    const file = new File([blob], fileName);
  
    return file;
  }
  
  

// Helper function to convert ArrayBuffer to Base64 string
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const convert = Buffer.from(buffer).toString('base64')
  return convert;
}

// Helper function to convert Base64 string back to ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const arrayBuffer = Buffer.from(base64, 'base64').buffer
  return arrayBuffer;
}
