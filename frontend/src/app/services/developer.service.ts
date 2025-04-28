import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { API } from '../constants/api';
import { IApiResponseContract } from '../contracts/api-response.contract';
import { IDeveloperResponseContract } from '../contracts/developer-response-contract';
import { DeveloperModel } from '../model/developer.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  private developersBS = new BehaviorSubject<DeveloperModel[]>([]);
  private developerBS = new BehaviorSubject<DeveloperModel | null>(null);

  private allDevelopers: DeveloperModel[] = [];

  developers$ = this.developersBS.asObservable();
  developer$ = this.developerBS.asObservable();

  constructor(private http: HttpClient) {}

  onEditDeveloper(developer: DeveloperModel | null): void {
    this.developerBS.next(developer);
  }

  filterDeveloperList(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.developersBS.next([...this.allDevelopers]);
      return;
    }

    const filteredDevelopers = this.allDevelopers.filter((developer) => {
      const term = searchTerm.toLowerCase();
      return (
        developer.name.toLowerCase().includes(term) ||
        developer.technologies.toLowerCase().includes(term) ||
        developer.academicBackground.toLowerCase().includes(term) ||
        developer.city.toLowerCase().includes(term)
      );
    });

    this.developersBS.next(filteredDevelopers);
  }

  getDevelopers(): void {
    this.http
      .get<IApiResponseContract<IDeveloperResponseContract[]>>(
        `${API.developer}`
      )
      .pipe(
        map((response) =>
          response.data!.map((item) => DeveloperModel.fromJson(item))
        ),
        tap((developers) => {
          this.allDevelopers = developers;
          this.developersBS.next([...developers]);
        })
      )
      .subscribe();
  }

  getDeveloperById(id: string): Observable<DeveloperModel> {
    return this.http
      .get<IApiResponseContract<IDeveloperResponseContract>>(
        `${API.developer}/${id}`
      )
      .pipe(map((response) => DeveloperModel.fromJson(response.data!)));
  }

  createDeveloper(
    developer: Partial<DeveloperModel>
  ): Observable<IApiResponseContract<null>> {
    return this.http
      .post<IApiResponseContract<null>>(`${API.developer}`, developer)
      .pipe(tap(() => this.getDevelopers()));
  }

  updateDeveloper(
    id: string,
    developer: Partial<DeveloperModel>
  ): Observable<IApiResponseContract<null>> {
    return this.http
      .put<IApiResponseContract<null>>(`${API.developer}/${id}`, developer)
      .pipe(tap(() => this.getDevelopers()));
  }

  deleteDeveloper(id: string): Observable<IApiResponseContract<null>> {
    return this.http
      .delete<IApiResponseContract<null>>(`${API.developer}/${id}`)
      .pipe(tap(() => this.getDevelopers()));
  }
}
