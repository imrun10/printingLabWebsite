import superbase from "../../databaseInitialise/superbase";


// edit the database


// delete an order

export async function deletePurchase(orderid: string) {
    try {
        console.log("Deleeeeeeeting order:", orderid)
        const { data, error } = await superbase.from("Purchases").delete().eq("id", orderid);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.log("Error deleting order:", error);
        return [];
    }
}