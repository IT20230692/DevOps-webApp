import express from 'express';
import {
  createAdd,
  deleteAdd,
  getAdd,
  getAdds,
  updateAdds,
} from '../controllers/add.controller.js';
import { verifyToken } from '../middleware/jwt.js';
const router = express.Router();

router.post('/', verifyToken, createAdd);
router.delete('/:id', verifyToken, deleteAdd);
router.get('/single/:id', getAdd);
router.get('/', getAdds);
router.put('/:id',verifyToken , updateAdds);

export default router;
