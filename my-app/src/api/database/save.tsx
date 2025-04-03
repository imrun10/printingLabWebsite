import { Color } from "three";
import superbase from "../../databaseInitialise/superbase";
import {fetchUser} from "./fetch";
import { purchase,customer } from "@/utils/constructs";
import { arrayBufferToBase64 } from "@/utils/funcs";

export async function saveUser(user: any) { //save the information of the user to the customer table

    const { data, error } = await superbase.from('Customer').insert([
        {
            UserID: user.id,
            Fname: user.Fname,
            Lname: user.Lname,
            Org: user.org,
            Add1: user.address,
            Add2: user.address2,
            zip: user.zip,
            MobileNumber: user.mobileNumber,
            Email: user.email
        }

    ]); 
    if (error) {

        console.log(user.id, user.Fname, user.Lname, user.org, user.address, user.address2, user.zip, user.mobileNumber, user.email)
        console.error('Error saving user:', error.message);}
        else {
            console.log('User saved successfully');
        }
    };

    export async function removeMarket(id: string) { //removes the purchase from the marketplace table
        try {
            const { data, error } = await superbase.from("marketplace").delete().eq("id", id);
            if (error) {
                console.error('Error removing item from marketplace:', error.message);
            } else {
                console.log('Item removed from marketplace successfully');
            }
        } catch (error) {
            console.error('Error removing item from marketplace:', error.message);
        }
    }
    export async function saveMarket(purchases: purchase) { //saves the purchase to the purchase table
        console.log(purchases)
        const {data, error} = await superbase.from('marketplace').insert([

            {
                id: purchases.id,
                created_at: purchases.created_at,
                STL: purchases.STL,
                Price: purchases.Price,
                Progress: purchases.Progress,
                Paid: purchases.Paid,
                Material: purchases.Material,
                Finish: purchases.Finish,
                Weight: purchases.Weight,
                Email: purchases.Email,
                Count: purchases.Count,
                Color: purchases.Color
            }
        ]);
    if (error) {
        console.error('Error saving market:', error.message);
    }
    }

    export async function savePurchase(purchase: purchase, customer: customer) { 
        console.log("PURCHASE", purchase)
        console.log(arrayBufferToBase64(purchase.STL))
        // saves purchase to purchase table with these fields: id, created_at, STL, Price, Progress, Paid, Material, Finish, Weight, Email, Customer, Count
        const { data, error } = await superbase.from('Purchases').insert([
            {
                created_at: new Date().toISOString(),
                STL: arrayBufferToBase64(purchase.STL),
                Price: purchase.Price,
                Progress: 'Recieved file',
                Paid: false,
                Material: purchase.Material,
                Finish: purchase.Finish,
                Weight: 0,
                Email: customer.Email,
                Color: purchase.color,
                Count: 1
            }
    
        ]); 
        if (error) {
            console.error('Error saving purchase:', error.message);}
            else {
                console.log('Purchase saved successfully');
            }
        }