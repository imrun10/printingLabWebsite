import superbase from "../../database/superbase";

export async function fetchMaterials() {
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

export async function fetchItem(table:string, coloumn:string) {
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

export async function fetchCustomer(userid:string) {
  console.log(userid,"idfjns")
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


export async function fetchPurchase(userid:string) {
  try {
    const { data, error } = await superbase.from("Purchases").select("*").eq("Customer_ID", userid);
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
export async function fetchUser() {
  const { data: { session }, error } = await superbase.auth.getSession()
  if (error) {
    console.log("Error fetching user:", error);
    return error;
  }
  console.log(session)

  return session;
}
export async function fetchFinish() {
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