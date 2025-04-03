'use client'
import React, { useEffect, useState } from 'react';
import superbase from '@/databaseInitialise/superbase';
import { purchase } from '@/utils/constructs';
import Cards from '@/components/Admin/Cards';
import { fetchItem, fetchRecord } from '@/api/database/fetch';
import { saveMarket } from '@/api/database/save';

async function fetchPurchase() {
  try {
    const { data, error } = await superbase.from("Purchases").select("*");
    if (error) {
      console.log("Error fetching purchase:", error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("Error fetching purchase:", error);
    return [];
  }
}

async function fetchMarket() {
  try {
    const { data, error } = await superbase.from("marketplace").select("*");
    if (error) {
      console.log("Error fetching marketplace:", error);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("Error fetching marketplace:", error);
    return [];
  }
}

async function updateMarket(id: string) {
  try {
    fetchRecord("Purchases", id).catch((error) => {
      console.log("error");
    }).then((data) => {
      saveMarket(data[0]).catch((error) => {
        console.log("Error updating market:", error);
      });
    });
  } catch (error) {
    console.log("Error fetching purchase:", error);
    return [];
  }
}

async function removeMarket(id: string) {
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

export default function Select() {
  const [purchases, setPurchases] = useState<purchase[]>([]);
  const [marketplace, setMarketplace] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const purchaseData = await fetchPurchase();
      const marketData = await fetchMarket();
      setPurchases(purchaseData);
      setMarketplace(marketData.map(item => item.id));
    };
    fetchData();
  }, []);

  const isInMarketplace = (id: string) => {
    return marketplace.includes(id);
  };

  useEffect(() => {
    if (selected && !isInMarketplace(selected)) {
      updateMarket(selected);
    }
  }, [selected]);

  return (
    <div className="m-11">
      <h2 className="text-xl font-bold mb-4">Select items for marketplace</h2>
      <div className="flex overflow-x-scroll space-x-4 p-4">
        {purchases.map((purchase) => {
          const isSelected = true; // Replace this logic with actual selection check if needed
          const isMarket = isInMarketplace(purchase.id);

          return (
            <div
              key={purchase.id}
              onClick={() => setSelected(purchase.id)}
              className={`m-4 border-4 ${isMarket ? 'border-green-500' : 'hover:border-red-500'} transition-all`}
            >
              <Cards currentPurchase={purchase} isInMarketplace={isMarket} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
