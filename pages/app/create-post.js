// pages/new-post.js
import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, author }),
    });
    setTitle('');
    setContent('');
    setAuthor('');
    router.push('/app');
  };

  return (
    <Container
      sx={{
        padding: '20px',
      }}
    >
      <Typography variant='h5' gutterBottom>
        Create a New Post
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          label='Title'
          variant='outlined'
          fullWidth
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label='Content'
          variant='outlined'
          fullWidth
          margin='normal'
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <TextField
          label='Author'
          variant='outlined'
          fullWidth
          margin='normal'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <Button type='submit' variant='contained' color='primary'>
          Add Post
        </Button>
      </Box>
    </Container>
  );
};

export default NewPost;
