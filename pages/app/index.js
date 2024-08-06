import { useEffect, useState } from 'react';

import { getDb } from '../../lib/mongodb';
import {
  Container,
  Typography,
  List,
  ListItem,
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
const Home = ({ dummyPosts, user }) => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setPosts(dummyPosts);
  }, []);

  const handleEdit = (id) => {
    // Implement edit logic here
    console.log(`Edit post ${id}`);
    router.push(`/app/edit-post/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mt={3}
        mb={3}
      >
        <Typography variant='h6'>Timeline</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => router.push('/app/create-post')}
        >
          Add Post
        </Button>
      </Box>

      <Box display='flex' justifyContent='flex-start' mb={3}>
        {/* Profile Section */}
        <Card style={{ maxWidth: 345, flex: '0 0 auto' }}>
          <CardContent>
            <Box display='flex' alignItems='center' mb={2}>
              <Avatar
                sx={{ width: 56, height: 56, marginRight: 2 }}
                src={user.image}
              />
              <Typography variant='h6'>{user.name}</Typography>
            </Box>
            <Typography variant='body2' color='textSecondary'>
              {user.email}
            </Typography>
            <Box mt={2}>
              <Button
                variant='contained'
                color='primary'
                style={{ marginRight: '8px' }}
              >
                <Link
                  href='/app/profile'
                  style={{
                    textDecoration: 'none',
                    color: '#fff',
                  }}
                >
                  Edit Profile
                </Link>
              </Button>
              <Button variant='contained' color='secondary'>
                <Link
                  href='/'
                  style={{
                    textDecoration: 'none',
                    color: '#fff',
                  }}
                >
                  Log Out
                </Link>
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Blog Posts */}
        <Box
          display='flex'
          flexDirection='column'
          alignItems={'center'}
          flexWrap='wrap'
          width='100%'
        >
          {posts.map((post) => (
            <Box key={post._id} style={{ width: '600px', margin: '16px' }}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant='h5'>{post.title}</Typography>
                <Typography variant='body1'>{post.content}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  By {post.author}
                </Typography>
                <Box mt={2} display='flex' justifyContent='space-between'>
                  <IconButton
                    color='primary'
                    onClick={() => handleEdit(post._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='secondary'
                    onClick={() => handleDelete(post._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/app',
      },
    };
  }
  const db = await getDb();
  const posts = await db.collection('posts').find({}).toArray();
  return {
    props: {
      dummyPosts: JSON.parse(JSON.stringify(posts)),
      user: session.user || {},
    },
  };
}
