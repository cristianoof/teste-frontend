import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
import { HttpError } from "./HttpError";

export const handleError: ErrorRequestHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Error:", error);

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      error: error.error,
    });
    return;
  }

  if (error.name === "ValidationError") {
    res.status(HttpStatusEnum.BAD_REQUEST).json({
      status: "error",
      message: error.message,
      error: error,
    });
    return;
  }

  if (error.name === "CastError") {
    res.status(HttpStatusEnum.BAD_REQUEST).json({
      status: "error",
      message: "Formato inválido do ID.",
      error: error,
    });
    return;
  }

  if (error.name === "MongoServerError" && (error as any).code === 11000) {
    res.status(HttpStatusEnum.CONFLICT).json({
      status: "error",
      message: "Conflito de chave única.",
      error: error,
    });
    return;
  }

  res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "Erro interno do servidor.",
    error: error,
  });
};
