import express from 'express';
import mongoose from 'mongoose';
import Chat from '../models/chats.js';

const router = express.Router();

// Start a new chat session
// router.post('/chat/start', async (req, res) => {
//   try {
//     const { user } = req.body;
//     if (!user) {
//       return res.status(400).json({ error: 'User is required' });
//     }
//     const session = new Chat({ user, queries: [] });
//     await session.save();
//     res.status(201).json({ sessionId: session._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create a new session' });
//   }
// });

// // Save a query to an existing session
// router.post('/chat/query', async (req, res) => {
//   try {
//     const { sessionId, query, response } = req.body;
//     if (!sessionId || !mongoose.Types.ObjectId.isValid(sessionId)) {
//       return res.status(400).json({ error: 'Invalid session ID' });
//     }
//     if (!query || !response) {
//       return res.status(400).json({ error: 'Query and response are required' });
//     }
//     const session = await Chat.findById(sessionId);
//     if (!session) {
//       return res.status(404).json({ error: 'Session not found' });
//     }
//     session.queries.push({ query, response });
//     await session.save();
//     res.status(200).json({ message: 'Query saved', session });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to save query' });
//   }
// });

// // Fetch session data by sessionId
// router.get('/chat/:sessionId', async (req, res) => {
//   try {
//     const { sessionId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(sessionId)) {
//       return res.status(400).json({ error: 'Invalid session ID' });
//     }
//     const session = await Chat.findById(sessionId);
//     if (!session) {
//       return res.status(404).json({ error: 'Session not found' });
//     }
//     res.status(200).json({ session });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch session data' });
//   }
// });
export default router;
