import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { API } from '../constants/api';
import { IDeveloperResponseContract } from '../contracts/developer-response-contract';
import { DeveloperModel } from '../model/developer.model';
import { DeveloperService } from './developer.service';

describe('DeveloperService', () => {
  let service: DeveloperService;
  let httpMock: HttpTestingController;

  const mockDeveloper = {
    _id: '123',
    name: 'João Silva',
    email: 'joao@teste.com',
    city: 'Marigá - PR',
    academicBackground: 'Sistemas de Informação',
    technologies: 'Angular, TypeScript',
    githubUser: 'joaosilvateste',
    avatarUrl: 'avatar-url',
    githubUserProfileUrl: 'github-url',
    createdAt: '2025-04-26T12:00:00.000Z',
    updatedAt: '2025-04-26T12:00:00.000Z',
  };

  const mockNewDeveloper: DeveloperModel = {
    name: 'Maria Silva',
    email: 'maria@teste.com',
    city: 'Maringá - PR',
    academicBackground: 'Engenharia de Software',
    technologies: 'Angular, React',
    githubUser: 'mariasilvateste',
    avatarUrl: 'avatar-url',
    githubUserProfileUrl: 'github-url',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeveloperService],
    });
    service = TestBed.inject(DeveloperService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch developers and update BehaviorSubject', () => {
    const mockDevelopers: IDeveloperResponseContract[] = [mockDeveloper];

    service.getDevelopers();

    const req = httpMock.expectOne(`${API.developer}`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockDevelopers });

    service.developers$.subscribe((developers) => {
      expect(developers.length).toBe(1);
      expect(developers[0].name).toBe('João Silva');
    });
  });

  it('should fetch a developer by ID', () => {
    const developer: IDeveloperResponseContract = mockDeveloper;

    service.getDeveloperById('1').subscribe((developer) => {
      expect(developer.name).toBe('João Silva');
    });

    const req = httpMock.expectOne(`${API.developer}/1`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: developer });
  });

  it('should create a developer and refresh the list', () => {
    service.createDeveloper(mockNewDeveloper).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${API.developer}`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    const refreshReq = httpMock.expectOne(`${API.developer}`);
    expect(refreshReq.request.method).toBe('GET');
    refreshReq.flush({ data: [] });
  });

  it('should update a developer and refresh the list', () => {
    const updatedDeveloper = {
      ...mockNewDeveloper,
      name: mockDeveloper.name + ' Updated',
    };

    service.updateDeveloper('1', updatedDeveloper).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${API.developer}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({});

    const refreshReq = httpMock.expectOne(`${API.developer}`);
    expect(refreshReq.request.method).toBe('GET');
    refreshReq.flush({ data: [] });
  });

  it('should delete a developer and refresh the list', () => {
    service.deleteDeveloper('1').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${API.developer}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    const refreshReq = httpMock.expectOne(`${API.developer}`);
    expect(refreshReq.request.method).toBe('GET');
    refreshReq.flush({ data: [] });
  });

  it('should filter developers based on search term', fakeAsync(() => {
    const mockDevelopers: IDeveloperResponseContract[] = [
      mockDeveloper,
      {
        ...mockNewDeveloper,
        _id: '2',
        createdAt: '2025-04-26T12:00:00.000Z',
        updatedAt: '2025-04-26T12:00:00.000Z',
      },
    ];

    service.getDevelopers();
    const req = httpMock.expectOne(`${API.developer}`);
    req.flush({ data: mockDevelopers });

    let developers: DeveloperModel[] = [];
    service.developers$.subscribe((devs) => (developers = devs));
    expect(developers.length).toBe(2);

    service.filterDeveloperList('João');
    tick();
    expect(developers.length).toBe(1);
    expect(developers[0].name).toBe('João Silva');

    service.getDevelopers();
    const reqAgain = httpMock.expectOne(`${API.developer}`);
    reqAgain.flush({ data: mockDevelopers });
    tick();
  }));

  it('should update the selected developer for editing', () => {
    const developer = new DeveloperModel(
      mockNewDeveloper.academicBackground,
      mockNewDeveloper.avatarUrl,
      mockNewDeveloper.city,
      mockNewDeveloper.email,
      mockNewDeveloper.githubUser,
      mockNewDeveloper.githubUserProfileUrl,
      mockNewDeveloper.name,
      mockNewDeveloper.technologies,
      '2',
      '2025-04-26T12:00:00.000Z',
      '2025-04-26T12:00:00.000Z'
    );
    service.onEditDeveloper(developer);

    service.developer$.subscribe((selectedDeveloper) => {
      expect(selectedDeveloper).toEqual(developer);
    });
  });
});
