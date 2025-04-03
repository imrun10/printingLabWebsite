import React, { useEffect, useState } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, Box } from '@mui/material';
import { base64ToArrayBuffer, debufferize } from '@/utils/funcs';
import StlDisplay from '../dashboard/StlDisplay';
import { purchase } from '@/utils/constructs';

interface MarketplaceProps {
  products: purchase[];
}

const Cards: React.FC<MarketplaceProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<purchase | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [stlModalOpen, setStlModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleCardClick = (product: purchase) => {
    setSelectedProduct(product);
    setConfirmationOpen(true);
  };

  const handleAddToPurchase = () => {
    // Handle adding the selected product to the user's purchase
    setConfirmationOpen(false);
  };

  const handleEnlargeStl = () => {
    setStlModalOpen(true);
  };

  const handleCloseStlModal = () => {
    setStlModalOpen(false);
  };

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea onClick={() => handleCardClick(product)}>
              <Box sx={{ height: 200 }}> {/* Box to contain the StlDisplay */}
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.Material} {product.Color}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.Price}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" onClick={() => setShowModal(true)}>
                Enlarge STL
              </Button>
            </CardActions>
          </Card>
          {showModal && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999 }}>
          <div className="modal-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '10px', width: '80%', height: '80%' }}>
            <Button onClick={() => setShowModal(false)} size='small'>Close</Button>
            {/* Render StlDisplay component inside the modal */}
            <StlDisplay file={debufferize(base64ToArrayBuffer(product.STL), "file.stl")} />
          </div>
        </div>
      )}
        </Grid>
        
      ))}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to add {selectedProduct?.Material} {selectedProduct?.Color} to your purchase?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddToPurchase}>Yes</Button>
          <Button onClick={() => setConfirmationOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={stlModalOpen} onClose={handleCloseStlModal}>
        <DialogContent>
          <StlDisplay file={debufferize(base64ToArrayBuffer(selectedProduct?.STL || ''), "file.stl")} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStlModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Cards;
