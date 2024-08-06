// components/Navbar.js
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Blog Sphere
          </Typography>

          <Box>
            {session && (
              <>
                <Button color='inherit' onClick={() => router.push('/app')}>
                  Timeline
                </Button>
                <Button
                  color='inherit'
                  onClick={() => router.push('/app/create-post')}
                >
                  Add Post
                </Button>
                <Button
                  color='inherit'
                  onClick={() => router.push('/app/profile')}
                >
                  Profile
                </Button>
                <Button
                  color='inherit'
                  onClick={() => router.push('/api/auth/signout')}
                >
                  Sign Out
                </Button>
              </>
            )}
            {!session && (
              <Button
                color='inherit'
                onClick={() => router.push('/api/auth/signin')}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
