import { Router } from "express";
import { GithubController } from "./GithubController";

export const githubRouter = Router();

githubRouter.get("/users/:githubUser", GithubController.findByGithubUser);
