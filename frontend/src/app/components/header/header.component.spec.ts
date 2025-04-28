import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Certifique-se de importar ReactiveFormsModule
import { MatIconModule } from '@angular/material/icon'; // Certifique-se de importar MatIconModule
import { DeveloperService } from '../../services/developer.service'; // Importe o DeveloperService

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let developerService: jasmine.SpyObj<DeveloperService>;

  beforeEach(async () => {
    const developerServiceSpy = jasmine.createSpyObj('DeveloperService', [
      'filterDeveloperList',
    ]);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, ReactiveFormsModule, MatIconModule],
      providers: [{ provide: DeveloperService, useValue: developerServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    developerService = TestBed.inject(
      DeveloperService
    ) as jasmine.SpyObj<DeveloperService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('searchTerm')).toBeDefined();
  });

  it('should call developerService.filterDeveloperList on searchTerm value changes', () => {
    const searchTerm = 'test';
    component.form.get('searchTerm')?.setValue(searchTerm);
    expect(developerService.filterDeveloperList).toHaveBeenCalledWith(
      searchTerm
    );
  });

  it('should clear the search term when onClearSearch is called', () => {
    component.form.get('searchTerm')?.setValue('some text');
    component.onClearSearch();
    expect(component.form.get('searchTerm')?.value).toBe('');
  });

  it('should return true if searchTerm has a value', () => {
    component.form.get('searchTerm')?.setValue('test');
    expect(component.hasSearchTerm).toBeTrue();
  });

  it('should return false if searchTerm is empty', () => {
    component.form.get('searchTerm')?.setValue('');
    expect(component.hasSearchTerm).toBeFalse();
  });
});
