import { getDb } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
// import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  // const session = await getSession({ req });
  // console.log(session);
  // if (!session) return res.status(400).json({ msg: 'invalid' });

  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      const db = await getDb();
      const result = await db
        .collection('posts')
        .deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else if (req.method === 'GET') {
    try {
      const db = await getDb();

      const post = await db
        .collection('posts')
        .findOne({ _id: new ObjectId(id) });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  } else if (req.method === 'PUT') {
    const { title, content, author } = req.body;

    try {
      const db = await getDb();
      const result = await db
        .collection('posts')
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { title, content, author } }
        );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
