import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {AuthRouter, productRouter, userRouter} from "./routes";
import { requestLogger, unknownEndpoint, errorHandler, verifyUser } from "./middleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use("/api", AuthRouter);

app.use(verifyUser);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(unknownEndpoint);

app.use(errorHandler);

export default app;
