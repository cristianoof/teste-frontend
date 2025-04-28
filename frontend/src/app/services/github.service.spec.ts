import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API } from '../constants/api';
import { IApiResponseContract } from '../contracts/api-response.contract';
import { IGithubUserResponseContract } from '../contracts/github-user-response.contract';
import { GithubUserModel } from '../model/github-user.model';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data and map it to GithubUserModel', () => {
    const mockGithubUser = 'testuser';
    const mockResponse: IApiResponseContract<IGithubUserResponseContract> = {
      message: 'Success',
      status: 'success',
      data: {
        login: 'joaosilvateste',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://example.com/avatar.png',
        gravatar_id: '',
        url: 'https://api.github.com/users/joaosilvateste',
        html_url: 'https://github.com/joaosilvateste',
        followers_url: 'https://api.github.com/users/joaosilvateste/followers',
        following_url:
          'https://api.github.com/users/joaosilvateste/following{/other_user}',
        gists_url:
          'https://api.github.com/users/joaosilvateste/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/joaosilvateste/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/joaosilvateste/subscriptions',
        organizations_url: 'https://api.github.com/users/joaosilvateste/orgs',
        repos_url: 'https://api.github.com/users/joaosilvateste/repos',
        events_url:
          'https://api.github.com/users/joaosilvateste/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/joaosilvateste/received_events',
        type: 'User',
        user_view_type: 'USER',
        site_admin: false,
        name: 'João Silva',
        company: 'Company',
        blog: 'https://joaosilva.dev',
        location: 'Maringá - PR',
        email: null,
        hireable: null,
        bio: 'bio',
        twitter_username: null,
        public_repos: 10,
        public_gists: 5,
        followers: 100,
        following: 50,
        created_at: '2025-04-26T00:00:00Z',
        updated_at: '2025-04-26T00:00:00Z',
      },
    };

    const expectedModel = GithubUserModel.fromJson(mockResponse.data!);

    service.getUserData(mockGithubUser).subscribe((result) => {
      expect(result).toEqual(expectedModel);
    });

    const req = httpMock.expectOne(`${API.github}/users/${mockGithubUser}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
