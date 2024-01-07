import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';



interface ReviewProps {
    address: {
      name: string;
      lastName: string;
      address: string;
      mobileNumber: string;
      city: string;
      Organization: string;
      zip: string;
      country: string;};
    products: {material: string; finishing: string; volume: string; weight: string};
    price: number;
    }


export default function Review({address, products, price}: ReviewProps) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>

   
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={products.material} />
            <ListItemText primary={products.finishing} />

            <ListItemText primary={products.volume} />

            <ListItemText primary={products.weight} />

          </ListItem>
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.name}</Typography>
          <Typography gutterBottom>{address.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
         
      
        </Grid>
      </Grid>
    </React.Fragment>
  );
}