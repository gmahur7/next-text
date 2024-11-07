import express from 'express'
import ChatGroupControllers from '../controllers/ChatGroupControllers.js'
import authMiddleware from '../middleware/AuthMiddleware.js'

const router = express.Router()

router.route('/').post(authMiddleware,ChatGroupControllers.createGroup).get(authMiddleware,ChatGroupControllers.index)
router.route('/group/:id').get(ChatGroupControllers.show).delete(authMiddleware,ChatGroupControllers.destroy).put(authMiddleware,ChatGroupControllers.update)

export default router;