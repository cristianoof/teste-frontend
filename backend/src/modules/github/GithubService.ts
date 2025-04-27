import { API } from "../../config/api";
import { HttpStatusEnum } from "../../shared/enums/HttpStatusEnum";
import { HttpError } from "../../shared/errors/HttpError";
import { IGithubUserModel } from "./GithubModel";
import { IGithubService } from "./IGithubService";

class _GithubService implements IGithubService {
  constructor() {}

  async findByGithubUser(githubUser: string): Promise<IGithubUserModel> {
    try {
      const response = await fetch(
        `${API.githubApiBaseUrl}/users/${githubUser}`
      );

      if (response.status === 404) {
        throw new HttpError(
          "Usuário do GitHub não encontrado.",
          HttpStatusEnum.NOT_FOUND
        );
      }

      if (response.status !== 200) {
        throw new HttpError(
          "Erro ao buscar usuário do GitHub.",
          HttpStatusEnum.INTERNAL_SERVER_ERROR
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError(
        "Erro ao buscar usuário do GitHub.",
        HttpStatusEnum.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}

export const GithubService = new _GithubService();
