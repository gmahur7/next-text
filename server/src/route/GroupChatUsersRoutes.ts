import express from 'express'
import authMiddleware from '../middleware/AuthMiddleware.js'
import ChatGroupUserControllers from '../controllers/GroupChatUsersController.js';

const router = express.Router()

router.route('/').post(ChatGroupUserControllers.store).get(ChatGroupUserControllers.index)

export default router;