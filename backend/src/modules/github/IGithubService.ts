import { IGithubUserModel } from "./GithubModel";

export interface IGithubService {
  findByGithubUser(githubUser: string): Promise<IGithubUserModel>;
}
