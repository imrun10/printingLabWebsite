// page.tsx
'use client'
import * as React from 'react';
import AddButton from '@/components/sticky';
import Header from '@/components/sections/Header';
import { fetchUser, fetchPurchase } from '@/api/database/fetch';
import { customer, purchase } from '@/utils/constructs';
import { useAmp } from 'next/amp';
import Cards from '@/components/dashboard/Card';
import { fetchMaterials } from '@/api/database/fetch';
import { useEffect } from 'react';
export default function Dashboard() {
  const [purchases, setPurchases] = React.useState<purchase[]>([]);
  const [done, setDone] = React.useState<boolean>(false);




  useEffect(() => {
    fetchUser()
      .then((user) => {
        if (user) {
          console.log('Signed in already', user.user.id);
          console.log(user.user.email);
          fetchPurchase(user.user.email)
            .then((data) => {
              setPurchases(data || []);
            })
            .catch((error) => {
              console.log(error);
            }); console.log(purchases)
        } else {
          console.log('Not signed in');
        }
      })
      .catch((error) => console.log('Error fetching materials:', error))
      .finally(() => setDone(true));
  }, []);

  useEffect(() => {
    console.log(purchases, 'purchases');
  }, [purchases]);

  return (
    <div>
      <Header />
      <div  className="m-4 p-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {purchases.map((purchase: any) => (
          <Cards
            key={purchase.id}
            currentPurchase={purchase}
          />
        ))}
      </div>
      <AddButton />
    </div>
  );
}