
export function weightCosts(volume:number,price:number,density:number){
    const cost = volume * density * price;
    return cost;    
}

export function percentageCost(totalCost:number,percentage:number){
    const cost = totalCost * percentage;
    return cost;
}
