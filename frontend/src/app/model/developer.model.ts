import { IDeveloperResponseContract } from '../contracts/developer-response-contract';

export class DeveloperModel {
  id?: string;
  academicBackground: string;
  avatarUrl: string;
  city: string;
  email: string;
  githubUser: string;
  githubUserProfileUrl: string;
  name: string;
  technologies: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    academicBackground: string,
    avatarUrl: string,
    city: string,
    email: string,
    githubUser: string,
    githubUserProfileUrl: string,
    name: string,
    technologies: string,
    id?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.academicBackground = academicBackground;
    this.avatarUrl = avatarUrl;
    this.city = city;
    this.email = email;
    this.githubUser = githubUser;
    this.githubUserProfileUrl = githubUserProfileUrl;
    this.name = name;
    this.technologies = technologies;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: IDeveloperResponseContract): DeveloperModel {
    return new DeveloperModel(
      json.academicBackground,
      json.avatarUrl,
      json.city,
      json.email,
      json.githubUser,
      json.githubUserProfileUrl,
      json.name,
      json.technologies,
      json._id,
      json.createdAt,
      json.updatedAt
    );
  }
}
