import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function Cards() {
  return (
    <Card sx={{ width: 320 }}>
      <div style={{ background: '#2196f3', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
        <Typography level="title-lg" sx={{ color: '#fff' }}>
          3D Print Order
        </Typography>
      </div>
      <div style={{ background: '#f44336', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
        <Typography level="body-sm" sx={{ color: '#fff' }}>
          Material: PLA
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff' }}>
          Finish: Matte
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff' }}>
          Color: Red
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff' }}>
          Price: $20
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff' }}>
          Progress: 75%
        </Typography>
        <Typography level="body-sm" sx={{ color: '#fff' }}>
          Count: 5
        </Typography>
      </div>
      <IconButton
        aria-label="bookmark print order"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem', color: '#fff' }}
      >
        <BookmarkAdd />
      </IconButton>
      <AspectRatio minHeight="120px" maxHeight="200px">
 
      </AspectRatio>
      <CardContent orientation="horizontal" sx={{ background: '#fff', borderRadius: '10px' }}>
        <div style={{ padding: '10px', borderRight: '1px solid #ccc' }}>
          <Typography level="body-xs" sx={{ color: '#f44336' }}>
            STL File:
          </Typography>
          <a href="https://example.com/print-order.stl" target="_blank" rel="noopener noreferrer">
            <Typography fontSize="lg" fontWeight="lg">
              Download STL
            </Typography>
          </a>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Track Print Order"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, borderRadius: '0 10px 10px 0' }}
        >
          Track Order
        </Button>
      </CardContent>
    </Card>
  );
}