import { Router } from "express";
import { developerRouter } from "../modules/developer/developer-routes";
import { githubRouter } from "../modules/github/github-routes";

export const router = Router();

router.use("/developer", developerRouter);
router.use("/github", githubRouter);
