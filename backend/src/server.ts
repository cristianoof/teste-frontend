import { Request, Response } from "express";
import { app } from "./app";
import { connectToDatabase } from "./config/database";
import { HttpStatusEnum } from "./shared/enums/HttpStatusEnum";

const PORT = process.env.PORT || 3000;

async function startServer(): Promise<void> {
  await connectToDatabase();

  app.get("/status", (req: Request, res: Response) => {
    res
      .status(HttpStatusEnum.OK)
      .json({ status: "success", message: "Server is running." });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
