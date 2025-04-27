import { Request, Response } from "express";
import { HttpStatusEnum } from "../../shared/enums/HttpStatusEnum";
import { HttpError } from "../../shared/errors/HttpError";
import { asyncHandler } from "../../shared/utils/async-handler";
import { GithubService } from "./GithubService";
import { IGithubService } from "./IGithubService";

class _GithubController {
  constructor(readonly githubService: IGithubService) {}

  findByGithubUser = asyncHandler(async (req: Request, res: Response) => {
    const { githubUser } = req.params;

    if (!githubUser) {
      throw new HttpError(
        "Usuário do GitHub não informado.",
        HttpStatusEnum.BAD_REQUEST
      );
    }

    const githubUserData = await this.githubService.findByGithubUser(
      githubUser
    );

    res
      .status(200)
      .json({ status: "success", message: "Success", data: githubUserData });
  });
}

export const GithubController = new _GithubController(GithubService);
