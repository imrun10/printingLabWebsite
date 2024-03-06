import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { customer,purchase } from '@/utils/constructs';
import { savePurchase } from '@/api/database/save';
import { sendEmailwAttachment } from '@/utils/sendEmai';



interface ReviewProps {
    address: customer;
    purchase: purchase;
    customer: customer;
    }

async function send(file: string, message: any) {
  try {
   

    sendEmailwAttachment(JSON.stringify(message), file)
  } catch (error) {
    console.error("Error buffering file:", error);
  }
}


export default function Review({address, purchase,customer}: ReviewProps) {
  savePurchase(purchase,customer);
  send(purchase.STL, "this is a test message");
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>

   
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={purchase.Material} />
            <ListItemText primary={purchase.Finish} />



          </ListItem>
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {purchase.Price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{customer.Fname}</Typography>
          <Typography gutterBottom>{}</Typography>
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