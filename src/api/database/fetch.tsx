//Fetch requests to the database


import superbase from "../../databaseInitialise/superbase";


export async function fetchItem(table:string, coloumn:string) { //generic fetech request that u pass in coloumn and table
  try {
    const { data, error } = await superbase.from(table).select(coloumn);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("Error fetching",coloumn, "from", table, error);
    return [];
  }
}

export async function fetchRecord(table:string, id:string) { //fetches all records from a table
  try {
    const { data, error } = await superbase.from(table).select("*").eq("id", id);
    if (error) {
      console.log("jksvjhlkblhjb")
      console.log(error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("Error fetching record:", error);
    return [];
  }
}

export async function fetchItemFromData(table:string, coloumn:string, dataVal:string, dataName:string) { //fetches item from data
  try {
    const { data, error } = await superbase.from(table).select(coloumn).eq(dataName, dataVal);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("Error fetching",coloumn, "from", table, error);
    return [];
  }
}

export async function fetchMaterials() { //fetches all materials
  try {
    const { data, error } = await superbase.from("Materials").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("Error fetching materials:", error);
    return [];
  }
}

export async function fetchCustomer(userid:string) { //fetches customer (information on the user) the by user id
  try {
    const { data, error } = await superbase.from("Customer").select("*").eq("UserID", userid);
    if (error) {
      console.log("Error fetching customer:", error);

      throw new Error(error.message);
    }
    return data;

  } catch (error) {
    console.log("Error fetching customer:", error);
    return [];
  }

}



export async function fetchPurchase(userid:string) { //fetches purchase by user id
  try {
    const { data, error } = await superbase.from("Purchases").select("*").eq("Email", userid);
    if (error) {
      console.log("Error fetching purchase:", error);
      throw new Error(error.message);
    }
    else{
      console.log(data, "data")
    }
    return data;
  } catch (error) {
    console.log("Error fetching purchase:", error);
    return [];
  }
}
export async function fetchUser() { //fetches user for the user ID
  const { data: { session }, error } = await superbase.auth.getSession()
  if (error) {
    console.log("Error fetching user:", error);
    return error;
  }
  console.log(session)

  return session;
}
export async function fetchFinish() { //fetches all finishes
  try {
    const { data, error } = await superbase.from("Finish").select("*");
    if (error) {
      console.log("Error fetching finish:", error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("Error fetching finish:", error);
    return [];
  }
}