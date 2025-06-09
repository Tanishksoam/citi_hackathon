import express from 'express';
import { createUser, getUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Add a new user
router.post('/create', createUser);
// User login
router.post('/login', loginUser);
// Get user details (protected)
router.get('/:id', auth, getUser);
// Update user details (protected)
router.put('/update/:id', auth, updateUser);
// Delete a user (protected)
router.delete('/delete/:id', auth, deleteUser);

export default router;
