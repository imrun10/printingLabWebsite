"use client";
import React, { useEffect, useState } from 'react';
import superbase from '@/databaseInitialise/superbase';
import Cards from './Cards';
import { purchase } from '@/utils/constructs';

const Marketplace: React.FC = () => {
  const [marketItems, setMarketItems] = useState<purchase[]>([]);

  useEffect(() => {
    const fetchMarketItems = async () => {
      try {
        const { data, error } = await superbase.from('marketplace').select('*');
        if (error) {
          console.error('Error fetching market items:', error.message);
        } else {
          setMarketItems(data);
          console.log('Market items fetched successfully:', data)
        }
      } catch (error:any) {
        console.error('Error fetching market items:', error.message);
      }
    };

    fetchMarketItems();
  }, []);

  return (
    <div className="marketplace-container">
      <h1>Marketplace</h1>
      <div className="marketplace-items m-10 p-10">
        <Cards products={marketItems} />
      </div>
    </div>
  );
};

export default Marketplace;
