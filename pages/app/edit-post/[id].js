import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      };

      fetchPost();
    }
  }, [id]);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    router.push('/app');
  };

  return (
    <Container>
      <Box mt={3}>
        <Typography variant='h4'>Edit Post</Typography>
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
          <TextField
            label='Title'
            name='title'
            variant='outlined'
            fullWidth
            margin='normal'
            value={post.title}
            onChange={handleChange}
          />
          <TextField
            label='Content'
            name='content'
            variant='outlined'
            fullWidth
            margin='normal'
            multiline
            rows={4}
            value={post.content}
            onChange={handleChange}
          />
          <TextField
            label='Author'
            name='author'
            variant='outlined'
            fullWidth
            margin='normal'
            value={post.author}
            onChange={handleChange}
          />
          <Box mt={2}>
            <Button variant='contained' color='primary' onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditPost;
