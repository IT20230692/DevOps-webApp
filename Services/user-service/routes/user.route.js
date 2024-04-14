import express from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

//user delete route
router.delete('/:id', verifyToken, deleteUser);

//user retrive route
router.get('/:id', getUser);

//user update route
router.put('/:id', verifyToken, updateUser);

export default router;
