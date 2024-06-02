import { Router } from 'express';
import { addRating, getUserRatings, getUserAverageRating } from '../controllers/ratingController';
import authenticateUser from '../middleware/authenticateUser'; // Assuming you have an authentication middleware

const router = Router();

router.post('/add', authenticateUser, addRating);
router.get('/:userId', getUserRatings);
router.get('/:userId/average', getUserAverageRating);

export default router;
