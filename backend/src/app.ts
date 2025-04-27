import cors from "cors";
import express from "express";
import { router } from "./routes";
import { handleError } from "./shared/errors/handle-error";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);
app.use(handleError);
