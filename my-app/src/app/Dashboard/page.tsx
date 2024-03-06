'use client'
import React, { use, useEffect } from 'react';
import AddButton from '@/components/sticky';
import Header from '@/components/Header';
import { fetchUser, fetchPurchase } from '@/api/database/fetch';
import Cards from '@/components/dashboard/Card';

export default function Dashboard(){

    const [purchases, setPurchases] = React.useState([]);
    useEffect(() => {
    fetchUser().then((user) => {
        console.log(user!.user.id, "session");
        fetchPurchase(user!.user.id).then((data) => {
            setPurchases(data!);
            console.log(data!)
        } ) 

    }
    )}, []);
    


    return(<div>
        <Header />
        <Cards />
        <AddButton />
    </div>)
}