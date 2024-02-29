import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import { BADHINTS } from 'dns';

interface MaterialsProps {
  name: string;
  price: string;
  CardSelect: boolean;
}

const PriceBubble = styled('div')({
    background: '#4C4B57',
    color: 'white',
    borderRadius: '10%',
    padding: '6px',
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '8px',
  });

const Cards: React.FC<MaterialsProps> = ({ name, price, CardSelect }) => {


  return (
    <Box sx={{ width: '100%', height: '100%', border: 'none', margin: 0 }}>
      {CardSelect && (
        <Card sx={{ width: '100%', height: '100%', background: '#2977F5', color: 'white', borderRadius: 0, border: 'none', margin: 0 }} className="flex justify-center items-center">
          <span>{name}</span>
        </Card>
      )}
      {!CardSelect && (
        <Card sx={{ width: '100%', height: '100%', borderRadius: 0, border: 'none' }} className="flex justify-center items-center">
          <span>{name}</span>
        </Card>
      )}
    </Box>
  );
};

export default Cards;