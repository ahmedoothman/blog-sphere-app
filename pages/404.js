import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
function ErrorPage() {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography>404 - Page Not Found</Typography>

      <Typography>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>

      <Link
        variant='contained'
        color='primary'
        href='/'
        style={{
          textDecoration: 'none',
          color: 'white',
          marginTop: '1rem',
          backgroundColor: '#0070f3',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
        }}
      >
        Go Back
      </Link>
    </Box>
  );
}

export default ErrorPage;
