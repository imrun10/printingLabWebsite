import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/database/superbase';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [residenceType, setResidenceType] = useState('');
  const [flatNumber, setFlatNumber] = useState('');

  const handleSignUp = async (e:any) => {
    e.preventDefault();

    const flat = residenceType === 'apartment' ? flatNumber : 'None';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          university,
          address,
          mobileNumber,
          residenceType,
          flat,
        },
      },
    });

    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('Signed up successfully');
      router.push('/');
    }
  };

  return (
    <Container
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card style={{ width: '80%', height:'60%' ,padding: '20px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
            </Box>
            <form className="form" onSubmit={handleSignUp}>
              <Typography variant="h5" component="h1" align="center" gutterBottom>
                Sign Up
              </Typography>
              <TextField
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="text"
                label="University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="text"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="text"
                label="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <InputLabel id="residence-type-label">Residence Type</InputLabel>
              <Select
                labelId="residence-type-label"
                id="residence-type"
                value={residenceType}
                onChange={(e) => setResidenceType(e.target.value)}
                required
                fullWidth
                className='mb-4'
              >
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="apartment">Apartment</MenuItem>
              </Select>
              {residenceType === 'apartment' && (
                <TextField
                  type="text"
                  label="Flat Number"
                  value={flatNumber}
                  onChange={(e) => setFlatNumber(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
              )}<Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: 'blue' }}
              fullWidth
              className="submitButton"
            >
              Sign Up
            </Button>
            <Typography variant="body2" align="center" gutterBottom>
              <Link href="/signin">Already have an account? Sign In</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  </Container>
);
}