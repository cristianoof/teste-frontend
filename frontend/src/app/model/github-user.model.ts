import { IGithubUserResponseContract } from '../contracts/github-user-response.contract';

export class GithubUserModel {
  avatarUrl: string;
  email: string | null;
  githubUserProfileUrl: string;
  id: number;
  location: string;
  name: string;

  public constructor({
    avatarUrl,
    email,
    githubUserProfileUrl,
    id,
    location,
    name,
  }: {
    avatarUrl: string;
    email: string | null;
    githubUserProfileUrl: string;
    id: number;
    location: string;
    name: string;
  }) {
    this.avatarUrl = avatarUrl;
    this.email = email;
    this.githubUserProfileUrl = githubUserProfileUrl;
    this.id = id;
    this.location = location;
    this.name = name;
  }

  public static fromJson(json: IGithubUserResponseContract): GithubUserModel {
    return new GithubUserModel({
      avatarUrl: json.avatar_url,
      email: json.email,
      githubUserProfileUrl: json.html_url,
      id: json.id,
      location: json.location,
      name: json.name,
    });
  }
}
