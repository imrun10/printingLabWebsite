
export function weightCosts(volume:number,price:number,density:number){
    const cost = volume * density * price;
    return cost;    
}

export function percentageCost(totalCost:number,percentage:number){
    const cost = totalCost * percentage;
    return cost;
}


export function FiletoString(file:File){
    const reader = new FileReader();
    reader.onload = function(e){
        const text = reader.result;
        return text;
    }
    reader.readAsText(file);
}

export async function stlTobuffer(file:File){
        const arrayBuffer = await file.arrayBuffer();
      const buffert = Buffer.from(arrayBuffer);
      console.log("PREBuffer:", buffert);
      const content = buffert.toString('base64')
      return content;

}

export function StringtoSTLFile(string:string){
    const file = new Blob([string], {type: 'text/plain'});
    return file;
}