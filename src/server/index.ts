require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import config from "config";
import cors from "cors";
import morgan from "morgan";
import connect from "../config/connect";
import router from "../routes";
import AppError from "../utils/app_error";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import validateEnv from "../utils/validate_env";

validateEnv();

const app = express();

async function bootstrap() {

    // Mongo Database Connection
    connect()

    // Body Parser
    app.use(express.json({ limit: "10kb" }));

    // Cookie Parser
    app.use(cookieParser());

    // Cors
    app.use(
        cors({
            origin: [config.get<string>("origin")],
            credentials: false,
        })
    );

    // Logger 
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

    // ROUTES
    app.use("/api/v1", router);

    // Global Error Handler
    app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
        err.status = err.status || "error";
        err.statusCode = err.statusCode || 500;

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    });

    const port = config.get<number>("port");
    app.listen(port, () => {
        console.log(`🚀Server running on http://localhost:${port}`);
    });
}

bootstrap()
    .catch((err) => {
        throw err;
    })
    .finally(async () => {
        await mongoose.disconnect()
    });