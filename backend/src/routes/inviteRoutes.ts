import { Router } from 'express';
import { createInvite, acceptInvite } from '../controllers/inviteController';

const router = Router();

router.post('/create', createInvite);
router.post('/accept', acceptInvite);

export default router;
