import { Router } from "express";
import { DeveloperController } from "./DeveloperController";

export const developerRouter = Router();

developerRouter.get("/", DeveloperController.getAllDevelopers);
developerRouter.get("/:id", DeveloperController.getDeveloperById);
developerRouter.post("/", DeveloperController.createDeveloper);
developerRouter.put("/:id", DeveloperController.updateDeveloper);
developerRouter.delete("/:id", DeveloperController.deleteDeveloper);
