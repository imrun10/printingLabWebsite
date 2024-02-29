import superbase from "../../database/superbase";
import {fetchUser} from "./fetch";

export async function saveUser(user: any) {
    // saves user to customer table with these fields: UserId(foreign key for user table), Fname, Lname, Org, Add1, Add2, Zip, MobileNumber, Email
    // it needs to get user id first
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