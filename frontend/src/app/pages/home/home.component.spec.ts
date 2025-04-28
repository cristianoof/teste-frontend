import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DeveloperService } from '../../services/developer.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let developerServiceSpy: jasmine.SpyObj<DeveloperService>;

  beforeEach(async () => {
    const developerSpy = jasmine.createSpyObj(
      'DeveloperService',
      ['getDevelopers'],
      {
        developers$: of([]),
      }
    );

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: DeveloperService, useValue: developerSpy },
        provideHttpClient(),
      ],
    }).compileComponents();

    developerServiceSpy = TestBed.inject(
      DeveloperService
    ) as jasmine.SpyObj<DeveloperService>;

    const fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllDevelopers on ngOnInit', () => {
    const getAllDevelopersSpy = spyOn<any>(component, 'getAllDevelopers');
    component.ngOnInit();
    expect(getAllDevelopersSpy).toHaveBeenCalled();
  });

  it('should call developerService.getDevelopers in getAllDevelopers', () => {
    component['getAllDevelopers']();
    expect(developerServiceSpy.getDevelopers).toHaveBeenCalled();
  });

  it('should have developers$ observable from developerService', (done) => {
    component.developers$.subscribe((developers) => {
      expect(developers).toEqual([]);
      done();
    });
  });
});
