import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API } from '../constants/api';
import { IApiResponseContract } from '../contracts/api-response.contract';
import { IGithubUserResponseContract } from '../contracts/github-user-response.contract';
import { GithubUserModel } from '../model/github-user.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUserData(githubUser: string): Observable<GithubUserModel> {
    return this.http
      .get<IApiResponseContract<IGithubUserResponseContract>>(
        `${API.github}/users/${githubUser}`
      )
      .pipe(map((response) => GithubUserModel.fromJson(response.data!)));
  }
}
