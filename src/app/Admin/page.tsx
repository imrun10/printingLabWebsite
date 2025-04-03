import React from 'react';
import superbase from '@/databaseInitialise/superbase';
import { purchase } from '@/utils/constructs';
import Select from '@/components/Admin/Select';
import Header from '@/components/sections/Header';

import UpdateToggle from '@/components/Admin/update/UpdateToggle';

//list that shows all the purchases done by everyone 

export function Admin() {
  return (
    <div>
      <Header/>
      <Select/>
      <UpdateToggle />
      <h1> </h1>
    </div>
  );
}

export default Admin;