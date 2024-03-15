import superbase from "../../databaseInitialise/superbase";
import {fetchUser} from "./fetch";
import { purchase,customer } from "@/utils/constructs";

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


    export async function savePurchase(purchase: purchase, customer: customer) { 
        // saves purchase to purchase table with these fields: id, created_at, STL, Price, Progress, Paid, Material, Finish, Weight, Email, Customer, Count
        const { data, error } = await superbase.from('Purchases').insert([
            {
                created_at: new Date().toISOString(),
                STL: purchase.STL,
                Price: purchase.Price,
                Progress: 'Recieved file',
                Paid: false,
                Material: purchase.Material,
                Finish: purchase.Finish,
                Weight: 0,
                Email: customer.Email,
                Customer_ID: customer.UserID,
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