import Head from 'next/head';
import Image from 'next/image';
import {
  Container,
  Typography,
  Button,
  Box,
  CssBaseline,
  Stack,
} from '@mui/material';
import { Inter } from 'next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

// Create a custom MUI theme
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#0070f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Blog Sphere</title>
        <meta
          name='description'
          content='Blog Sphere is a dynamic blog platform where you can read and share blog posts.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container maxWidth='lg' sx={{ textAlign: 'center', padding: '2rem' }}>
        <Box sx={{ marginBottom: '2rem' }}>
          <Typography variant='h2' component='h1' gutterBottom>
            Welcome to Blog Sphere
          </Typography>
          <Typography variant='h5' component='p' color='textSecondary'>
            Your go-to platform for insightful blog posts and discussions.
          </Typography>
        </Box>

        <Box sx={{ marginBottom: '2rem' }}>
          <Image
            src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Blog Sphere'
            width={700}
            height={400}
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>

        <Typography variant='body1' paragraph sx={{ marginBottom: '2rem' }}>
          At Blog Sphere, we bring together passionate writers and readers.
          Explore our latest posts, share your thoughts, and join a community of
          like-minded individuals.
        </Typography>

        <Stack
          direction='row'
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant='contained'
            color='primary'
            sx={{
              color: '#fff',
              textTransform: 'none',
              textDecoration: 'none',
            }}
          >
            <Link
              href='/app'
              sx={{
                textDecoration: 'none',
                color: '#fff',
              }}
            >
              <Typography
                variant='p'
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                Explore Posts
              </Typography>
            </Link>
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{
              color: '#fff',
              textTransform: 'none',
            }}
          >
            <Link
              href='api/auth/signin'
              sx={{
                textDecoration: 'none',
                color: '#fff',
              }}
            >
              <Typography
                variant='p'
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                Login
              </Typography>
            </Link>
          </Button>
        </Stack>

        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant='body2' color='textSecondary'>
            © 2024 Blog Sphere. Designed by Ahmed Othman.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
