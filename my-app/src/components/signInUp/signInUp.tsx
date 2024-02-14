import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/database/superbase';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Fname, setFName] = useState('');
  const [Lname, setLName] = useState('');
  const [org, setOrg] = useState('');
  const [address2, setAddress2] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSignUp = async (e:any) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    }).then(() => {
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
        <Card style={{ width: '80%', padding: '20px' }}>
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
                label="First Name"
                value={Fname}
                onChange={(e) => setFName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="text"
                label="Last Name"
                value={Lname}
                onChange={(e) => setLName(e.target.value)}
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
                label="Organization/University"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
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
              <TextField
                type="text"
                label="Address Line 1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="text"
                label="Address Line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                type="text"
                label="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Sign Up
              </Button>
              <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                <Link href="/login">Already have an account? Sign In</Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
