import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { deletePurchase } from '@/api/database/edit';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { purchase } from '@/utils/constructs';
import { base64ToArrayBuffer, debufferize } from '@/utils/funcs';
import StlDisplay from './StlDisplay';

interface CardsProps {
  currentPurchase: purchase;
}

const Cards: React.FC<CardsProps> = ({ currentPurchase }) => {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  async function deleteOrder() {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    
    if (confirmed) {
      console.log(currentPurchase.id);
      await deletePurchase(currentPurchase.id);
      window.location.reload();
    }
  }

  async function downloadStl() {
    const element = document.createElement("a");
    const stlBlob = new Blob([base64ToArrayBuffer(currentPurchase.STL)], { type: 'text/plain' });
    element.href = URL.createObjectURL(stlBlob);
    element.download = `${currentPurchase.id}.stl`;
    document.body.appendChild(element);
    element.click();
  }

  return (
    <Card sx={{ width: 320, borderRadius: '0px' }}>
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


      <CardContent orientation="horizontal" sx={{ background: '#fff', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <a href={currentPurchase.STL} download={`${currentPurchase.id}.stl`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="md">
              <Typography fontSize="lg" fontWeight="lg">
                Download STL
              </Typography>
            </Button>
          </a>
        </div>
        <div>
          <Button variant="outlined" size="md" onClick={() => setShowModal(true)}>
            View STL
          </Button>
          <Button variant="outlined" size="md" color="danger" aria-label="Delete" onClick={deleteOrder}>
            Delete
          </Button>
        </div>
      </CardContent>

      {/* Add a modal dialog */}
      
      {showModal && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999 }}>
          <div className="modal-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '10px', width: '80%', height: '80%' }}>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            {/* Render StlDisplay component inside the modal */}
            <StlDisplay file={debufferize(base64ToArrayBuffer(currentPurchase.STL), "file.stl")} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default Cards;
