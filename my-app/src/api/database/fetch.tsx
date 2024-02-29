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

export async function fetchCuctomer() {
  fetchUser().then((user) => {
    try {
      const { data, error } = superbase.from("Customer").select("*").eq("UserID", user!.user.id);
      if (error) {
        console.log("Error fetching customer:", error);
      }
      return data;
    } catch (error) {
      console.log("Error fetching customer:", error);
      return [];
    }
  })}

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
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("Error fetching finish:", error);
    return [];
  }
}