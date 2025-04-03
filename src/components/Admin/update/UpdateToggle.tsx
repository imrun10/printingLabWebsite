'use client'
import React, { useState } from 'react';
import SelectUser from './SelectUser';


export default function  UpdateToggle(){
    const [activeComponent, setActiveComponent] = useState(1);
    const [selectedUser, setSelectedUser] = useState('');


    return(
        <div>

            {activeComponent === 1 && <SelectUser onSelectUser={setSelectedUser}/>}
            
        </div>
    );
};

