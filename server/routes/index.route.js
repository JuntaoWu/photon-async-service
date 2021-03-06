import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import postRoutes from './post.route';
import gameRoutes from './game.route';
import snapshotRoutes from './snapshot.route';
import roomRoutes from './room.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

router.use('/posts', postRoutes);

router.use('/games/:appId', gameRoutes);

router.use('/snapshots', snapshotRoutes);

router.use('/rooms/:appId', roomRoutes);

export default router;
