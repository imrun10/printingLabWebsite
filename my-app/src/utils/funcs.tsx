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