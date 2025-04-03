import React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { removeMarket } from '@/api/database/save';
import { purchase } from '@/utils/constructs';
import { deletePurchase } from '@/api/database/edit';
import { saveMarket } from '@/api/database/save';

interface CardsProps {
  currentPurchase: purchase;
  isInMarketplace: boolean;

}

const Cards: React.FC<CardsProps> = ({ currentPurchase, isInMarketplace }) => {
  async function deleteOrder() {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      await removeMarket(currentPurchase.id);
      window.location.reload();
    }
  }

  async function onAddToMarketplace() {
    const confirmed = window.confirm("Are you sure you want to add this order to the marketplace?");
    if (confirmed) {
      await saveMarket(currentPurchase);
      window.location.reload();
    }
  }

  return (
    <div>
      <div style={{ background: '#2196f3', padding: '10px', borderRadius: '0px', marginBottom: '10px' }}>
        <Typography level="title-lg" sx={{ color: '#fff' }}>
          Order ID : {currentPurchase.id}
        </Typography>
      </div>
      <div style={{ background: '#f44336', padding: '10px', borderRadius: '0px', marginBottom: '10px' }}>
        <Typography level="body-sm" sx={{ color: '#fff', marginBottom: '5px' }}>
          Material: {currentPurchase.Material}
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff', marginBottom: '5px' }}>
          Finish: {currentPurchase.Finish}
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff', marginBottom: '5px' }}>
          Color: {currentPurchase.Color}
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff', marginBottom: '5px' }}>
          Price: ${currentPurchase.Price}
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff', marginBottom: '5px' }}>
          Progress: {currentPurchase.Progress}
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff', marginBottom: '5px' }}>
          Count: {currentPurchase.Count}
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {isInMarketplace ? (
          <Button
            variant="outlined"
            size="md"
            color="success"
            onClick={deleteOrder}
            sx={{ fontWeight: 600 }}
          >
            Remove from Marketplace
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="md"
            color="primary"
            onClick={onAddToMarketplace}
            sx={{ fontWeight: 600 }}
          >
            Add to Marketplace
          </Button>
        )}
        <Button
          variant="outlined"
          size="md"
          onClick={() => window.open(currentPurchase.STL, "_blank")}
          sx={{ ml: '10px', fontWeight: 600 }}
        >
          View STL
        </Button>
       
      </div>
    </div>
  );
};

export default Cards;
