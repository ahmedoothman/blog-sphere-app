// pages/api/posts.js
import { getDb } from '../../../lib/mongodb';
// import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const db = await getDb();

  // const session = await getSession({ req });
  // if (!session) return res.status(400).json({ msg: 'invalid' });

  // console.log('##', session);
  if (req.method === 'POST') {
    const { title, content, author } = req.body;
    const result = await db
      .collection('posts')
      .insertOne({ title, content, author });

    res.status(201).json(result);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
