// pages/profile.js
import { useState, useEffect, use } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Button,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
const Profile = ({ user: userData }) => {
  const [user, setUser] = useState({
    ...userData,
  });
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...user });
  const router = useRouter();

  useEffect(() => {
    // Fetch user data here if needed
    // Example:
    // const fetchUser = async () => {
    //   const response = await fetch('/api/user');
    //   const data = await response.json();
    //   setUser(data);
    //   setFormValues(data);
    // };
    // fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    // Save user data here
    // Example:
    // await fetch('/api/user', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formValues),
    // });
    setUser(formValues);
    setEditMode(false);
  };

  return (
    <Container style={{ marginTop: '64px' }}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }} src={user.image} />
        <Typography variant='h4' gutterBottom>
          {editMode ? 'Edit Profile' : 'Profile'}
        </Typography>
        <Card style={{ maxWidth: 500, width: '100%' }}>
          <CardContent>
            {editMode ? (
              <Box component='form' noValidate>
                <TextField
                  label='Name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  name='name'
                  value={formValues.name}
                  onChange={handleChange}
                />
                <TextField
                  label='Email'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  name='email'
                  value={formValues.email}
                  onChange={handleChange}
                />
                <TextField
                  label='Bio'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  name='bio'
                  multiline
                  rows={4}
                  value={formValues.bio}
                  onChange={handleChange}
                />
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSave}
                  style={{ marginTop: '16px' }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography variant='h6'>Name: {user.name}</Typography>
                <Typography variant='body1'>Email: {user.email}</Typography>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setEditMode(true)}
                  style={{ marginTop: '16px' }}
                >
                  Edit Profile
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/app/profile',
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
