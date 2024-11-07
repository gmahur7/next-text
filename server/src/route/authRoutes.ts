import { Router } from "express";
import AuthControllers from "../controllers/AuthControllers.js";

const router = Router();

router.route('/').post(AuthControllers.login)
router.post('/login',AuthControllers.login)

export default router;