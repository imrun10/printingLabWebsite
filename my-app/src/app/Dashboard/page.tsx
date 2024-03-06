// page.tsx
'use client'
import * as React from 'react';
import AddButton from '@/components/sticky';
import Header from '@/components/Header';
import { fetchUser, fetchPurchase } from '@/api/database/fetch';
import { customer, purchase } from '@/utils/constructs';
import { useAmp } from 'next/amp';
import Cards from '@/components/dashboard/Card';

export default function Dashboard() {
  const [purchases, setPurchases] = React.useState<any>([]);
  const [done, setDone] = React.useState<boolean>(false);


 
  React.useEffect(() => {
    fetchUser()
      .then((user) => {
        if (user) {
          console.log('Signed in already', user.user.id);
          fetchPurchase(user.user.id)
            .then((data) => {
              setPurchases(data || []);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('Not signed in');
        }
      })
      .catch((error) => console.log('Error fetching materials:', error))
      .finally(() => setDone(true));
  }, []);

  React.useEffect(() => {
    console.log(purchases, 'purchases');
  }, [purchases]);

  return (
    <div>
      <Header />
      <div  className="m-4 p-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {purchases.map((purchase: any) => (
          <Cards
            key={purchase.id}
            material={purchase.Material}
            finish={purchase.Finish}
            color={purchase.color}
            price={purchase.Price}
            progress={purchase.progress}
            count={purchase.count}
            stlFile={purchase.stlFile}
          />
        ))}
      </div>
      <AddButton />
    </div>
  );
}