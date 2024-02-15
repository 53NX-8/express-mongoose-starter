import { Router } from "express";
import { index, store } from "../controllers/post.controller";

const router = Router()

router.route('/').get(index).post(store) // GET / POST /posts  - Returns all posts and creates a new

export default router;