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