

import React from 'react';
import AddButton from '@/components/sticky';
import Header from '@/components/Header';
import { fetchUser } from '@/api/database/fetch';


export default function Dashboard(){

    fetchUser().then((session) => {
        console.log(session)
    }
    )
    


    return(<div>
        <Header />
        <h1>Dashboard</h1>
        <AddButton />
    </div>)
}