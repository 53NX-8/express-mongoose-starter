import {
    NextFunction,
    Request,
    Router,
} from "express";
import AppError from "../utils/app_error";
import healthRoutes from "./health.routes";
import postRoutes from "./post.routes";

const router = Router();

router.use("/healthChecker", healthRoutes);
router.use("/posts", postRoutes);
router.all("*", (req: Request, _, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
});

export default router;