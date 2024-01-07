import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Header from '@/components/Header';

enum OrderStatus {
  PRINTING = 'Printing',
  DONE = 'Done Printing',
  ON_WAY = 'On Its Way',
  NOT_STARTED = 'Not Started',
}

const OrderStatusPage: React.FC = () => {
  const getRandomStatus = (): OrderStatus => {
    const statusOptions: OrderStatus[] = [
      OrderStatus.PRINTING,
      OrderStatus.DONE,
      OrderStatus.ON_WAY,
      OrderStatus.NOT_STARTED,
    ];
    const randomIndex = Math.floor(Math.random() * statusOptions.length);
    return statusOptions[randomIndex];
  };

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case OrderStatus.PRINTING:
        return '#ff9800';
      case OrderStatus.DONE:
        return '#4caf50';
      case OrderStatus.ON_WAY:
        return '#2196f3';
      case OrderStatus.NOT_STARTED:
        return '#f44336';
      default:
        return '';
    }
  };

  const status = getRandomStatus();
  const cardColor = getStatusColor(status);

  return (
    <div>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f5f5f5"
      >
        <Box>
          <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', color: 'grey', mb: 3 }}>
            Your Order Status
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Card
              sx={{
                backgroundColor: cardColor,
                width: '300px',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                mr: 2,
              }}
            >
              <CardContent>
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {status}
                </Typography>
              </CardContent>
            </Card>
            <Box ml={2}>
              <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'grey' }}>
                Estimated Arrival Date
              </Typography>
              <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', color: 'black', mt: 2 }}>
                --/--/----
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrderStatusPage;