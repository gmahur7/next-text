import express from 'express'
import ChatsController from '../controllers/ChatsControllers.js';

const router = express.Router()

router.route('/:groupId').get(ChatsController.index)

export default router;