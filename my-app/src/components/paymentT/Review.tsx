import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { customer, purchase } from '@/utils/constructs';
import { savePurchase } from '@/api/database/save';
import { sendEmail } from '@/utils/sendEmail';

interface ReviewProps {
  address: customer;
  purchase: purchase;
  customer: customer;
}

async function send(file: string, message: any) {
  try {
    console.log(file);
    sendEmail(JSON.stringify(message));
  } catch (error) {
    console.error("Error buffering file:", error);
  }
}

const Review: React.FC<ReviewProps> = React.memo(({ address, purchase, customer }) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      console.log('useEffect triggered');
      savePurchase(purchase, customer);
      send(JSON.stringify(purchase.STL), "this is a test message");
    }
  }, [purchase, customer]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
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
          <Typography gutterBottom>{customer.Fname} {customer.Lname}</Typography>
          <Typography gutterBottom>{customer.Add1}</Typography>
          {customer.Add2 && <Typography gutterBottom>{customer.Add2}</Typography>}
          <Typography gutterBottom>{customer.Zip}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          {/* Add payment details here if necessary */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

Review.displayName = "Review";

export default Review;
