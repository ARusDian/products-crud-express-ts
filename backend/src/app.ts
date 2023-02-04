import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {productRouter, userRouter} from "./routes";
import { requestLogger, unknownEndpoint, errorHandler } from "./middleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
