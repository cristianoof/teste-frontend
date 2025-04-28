import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let mockLoaderService: jasmine.SpyObj<LoaderService>;
  let loadingCounter$: BehaviorSubject<number>;

  beforeEach(async () => {
    loadingCounter$ = new BehaviorSubject<number>(0);
    mockLoaderService = jasmine.createSpyObj('LoaderService', [], {
      loadingCounter$,
    });

    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [{ provide: LoaderService, useValue: mockLoaderService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have loadingCounter$ from LoaderService', () => {
    expect(component.loadingCounter$).toBe(loadingCounter$);
  });

  it('should have message set to "Carregando..."', () => {
    expect(component.message).toBe('Carregando...');
  });

  it('should update when LoaderService counter changes', () => {
    let emittedValue: number | undefined;

    const subscription = component.loadingCounter$.subscribe((value) => {
      emittedValue = value;
    });

    loadingCounter$.next(1);
    fixture.detectChanges();
    expect(emittedValue).toBe(1);

    loadingCounter$.next(2);
    fixture.detectChanges();
    expect(emittedValue).toBe(2);

    subscription.unsubscribe();
  });
});
