import { Router } from 'express';
import { sendMessage, getMessages, deleteMessage, markAsRead } from '../controllers/messageController';
import authenticateUser from '../middleware/authenticateUser';

const router = Router();

router.post('/send', authenticateUser, sendMessage);
router.get('/', authenticateUser, getMessages);
router.delete('/:messageId', authenticateUser, deleteMessage);
router.patch('/:messageId/read', authenticateUser, markAsRead);

export default router;
