import { Component, forwardRef, Input } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { DeveloperModel } from '../../model/developer.model';
import { DeveloperService } from '../../services/developer.service';
import { DialogService } from '../../services/dialog.service';
import { GithubService } from '../../services/github.service';
import { DeveloperFormComponent } from './developer-form.component';

@Component({
  selector: 'app-input',
  template: '',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockInputComponent),
      multi: true,
    },
  ],
})
class MockInputComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;

  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

describe('DeveloperFormComponent', () => {
  let component: DeveloperFormComponent;
  let fixture: ComponentFixture<DeveloperFormComponent>;
  let developerServiceMock: jasmine.SpyObj<DeveloperService>;
  let dialogServiceMock: jasmine.SpyObj<DialogService>;
  let githubServiceMock: jasmine.SpyObj<GithubService>;
  let developerSubject: BehaviorSubject<DeveloperModel | null>;

  const BREAKPOINT_DESKTOP = 1024;
  const BREAKPOINT_TABLET = 768;

  const mockDeveloper: DeveloperModel = {
    id: '123',
    name: 'João Silva',
    email: 'joao@teste.com',
    city: 'Marigá - PR',
    academicBackground: 'Sistemas de Informação',
    technologies: 'Angular, TypeScript',
    githubUser: 'joaosilvateste',
    avatarUrl: 'avatar-url',
    githubUserProfileUrl: 'github-url',
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

  beforeEach(async () => {
    developerSubject = new BehaviorSubject<DeveloperModel | null>(null);

    developerServiceMock = jasmine.createSpyObj(
      'DeveloperService',
      ['createDeveloper', 'updateDeveloper', 'onEditDeveloper'],
      {
        developer$: developerSubject.asObservable(),
      }
    );

    dialogServiceMock = jasmine.createSpyObj('DialogService', [
      'openSuccess',
      'openError',
    ]);
    githubServiceMock = jasmine.createSpyObj('GithubService', ['getUserData']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MockInputComponent],
      providers: [
        { provide: DeveloperService, useValue: developerServiceMock },
        { provide: DialogService, useValue: dialogServiceMock },
        { provide: GithubService, useValue: githubServiceMock },
      ],
    })
      .overrideComponent(DeveloperFormComponent, {
        set: {
          providers: [
            { provide: DeveloperService, useValue: developerServiceMock },
            { provide: DialogService, useValue: dialogServiceMock },
            { provide: GithubService, useValue: githubServiceMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DeveloperFormComponent);
    component = fixture.componentInstance;

    Object.defineProperty(window, 'innerWidth', {
      value: BREAKPOINT_DESKTOP,
      writable: true,
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct fields', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('name')).toBeDefined();
    expect(component.form.get('email')).toBeDefined();
    expect(component.form.get('githubUser')).toBeDefined();
    expect(component.form.get('city')).toBeDefined();
    expect(component.form.get('academicBackground')).toBeDefined();
    expect(component.form.get('technologies')).toBeDefined();
    expect(component.form.get('avatarUrl')).toBeDefined();
    expect(component.form.get('id')).toBeDefined();
    expect(component.form.get('githubUserProfileUrl')).toBeDefined();
  });

  it('should initialize githubUser control as disabled', () => {
    expect(component.form.get('githubUser')?.disabled).toBeTrue();
  });

  it('should toggle form visibility', () => {
    const initialState = component.showForm;
    component.onToggleForm();
    expect(component.showForm).toBe(!initialState);
  });

  it('should handle GitHub API calls successfully', () => {
    component.onRegisterWithGithub();
    expect(component.form.get('githubUser')?.enabled).toBeTrue();

    component.form.get('githubUser')?.setValue('testuser');

    const userData = {
      id: 123,
      avatarUrl: 'avatar-url',
      name: 'João Silva',
      email: 'joao@teste.com',
      location: 'Marigá - PR',
      githubUserProfileUrl: 'github-url',
    };

    githubServiceMock.getUserData.and.returnValue(of(userData));
    component.onGetGithubUserData();

    expect(githubServiceMock.getUserData).toHaveBeenCalledWith('testuser');
    expect(component.form.get('avatarUrl')?.value).toBe(userData.avatarUrl);
    expect(component.form.get('name')?.value).toBe(userData.name);
    expect(component.form.get('email')?.value).toBe(userData.email);
    expect(component.form.get('city')?.value).toBe(userData.location);
    expect(component.form.get('githubUserProfileUrl')?.value).toBe(
      userData.githubUserProfileUrl
    );
  });

  it('should handle GitHub API error', () => {
    component.onRegisterWithGithub();
    component.form.get('githubUser')?.setValue('nonexistentuser');

    const errorResponse = {
      status: 404,
      statusText: 'Not Found',
      error: { message: 'Usuário do GitHub não encontrado.' },
    };

    githubServiceMock.getUserData.and.returnValue(
      throwError(() => errorResponse)
    );
    spyOn(console, 'error');
    spyOn(component, 'onClearForm').and.callThrough();

    component.onGetGithubUserData();

    expect(githubServiceMock.getUserData).toHaveBeenCalledWith(
      'nonexistentuser'
    );
    expect(console.error).toHaveBeenCalled();
    expect(component.onClearForm).toHaveBeenCalled();
    expect(dialogServiceMock.openError).toHaveBeenCalledWith(
      'Erro ao buscar usuário do Github',
      'Not Found. Usuário do GitHub não encontrado.'
    );
  });

  it('should not call GitHub API when githubUser is empty', () => {
    component.onRegisterWithGithub();
    component.form.get('githubUser')?.setValue('');

    component.onGetGithubUserData();

    expect(githubServiceMock.getUserData).not.toHaveBeenCalled();
  });

  it('should enter edit mode when developer data is received', () => {
    developerSubject.next(mockDeveloper);
    fixture.detectChanges();

    expect(component.isEditing).toBeTrue();
    expect(component.form.get('id')?.value).toBe(mockDeveloper.id);
    expect(component.form.get('name')?.value).toBe(mockDeveloper.name);
    expect(component.form.get('email')?.value).toBe(mockDeveloper.email);
    expect(component.form.get('city')?.value).toBe(mockDeveloper.city);
    expect(component.form.get('academicBackground')?.value).toBe(
      mockDeveloper.academicBackground
    );
    expect(component.form.get('technologies')?.value).toBe(
      mockDeveloper.technologies
    );
    expect(component.form.get('githubUser')?.value).toBe(
      mockDeveloper.githubUser
    );
    expect(component.form.get('avatarUrl')?.value).toBe(
      mockDeveloper.avatarUrl
    );
  });

  it('should display correct toggle form button label', () => {
    component.showForm = true;
    expect(component.toggleFormButtonLabel).toBe('Esconder formulário');

    component.showForm = false;
    expect(component.toggleFormButtonLabel).toBe('Exibir formulário');
  });

  it('should show correct submit button label based on edit mode', () => {
    component.isEditing = false;
    expect(component.submitButtonLabel).toBe('Cadastrar');

    component.isEditing = true;
    expect(component.submitButtonLabel).toBe('Atualizar');
  });

  it('should enable githubUser control on register with github', () => {
    expect(component.form.get('githubUser')?.disabled).toBeTrue();
    component.onRegisterWithGithub();
    expect(component.form.get('githubUser')?.enabled).toBeTrue();
  });

  it('should reset form and editing state on clear form', () => {
    component.isEditing = true;
    component.form.patchValue(mockDeveloper);

    component.onClearForm();

    expect(component.isEditing).toBeFalse();
    expect(component.form.pristine).toBeTrue();
    expect(developerServiceMock.onEditDeveloper).toHaveBeenCalledWith(null);
  });

  it('should validate required fields correctly', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalse();
    expect(nameControl?.hasError('required')).toBeTrue();

    nameControl?.setValue('Test');
    expect(nameControl?.valid).toBeTrue();
  });

  it('should validate email format', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.hasError('email')).toBeTrue();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate minimum length on fields', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('AB');
    expect(nameControl?.valid).toBeFalse();
    expect(nameControl?.hasError('minlength')).toBeTrue();

    nameControl?.setValue('ABC');
    expect(nameControl?.valid).toBeTrue();
  });

  it('should handle create developer success', () => {
    component.form.patchValue(mockNewDeveloper);

    const response = {
      status: 'success' as 'success',
      message: 'Desenvolvedor criado com sucesso.',
    };
    developerServiceMock.createDeveloper.and.returnValue(of(response));
    developerServiceMock.createDeveloper.and.returnValue(of(response));

    spyOn(component, 'onClearForm').and.callThrough();

    component.onSubmit();

    expect(developerServiceMock.createDeveloper).toHaveBeenCalled();
    expect(component.onClearForm).toHaveBeenCalled();
    expect(dialogServiceMock.openSuccess).toHaveBeenCalledWith(
      'Sucesso',
      response.message
    );
  });

  it('should handle update developer success', () => {
    component.isEditing = true;
    component.form.patchValue({
      ...mockDeveloper,
      name: mockDeveloper.name + ' Updated',
    });

    const response = {
      status: 'success' as 'success',
      message: 'Desenvolvedor atualizado com sucesso.',
    };
    developerServiceMock.updateDeveloper.and.returnValue(of(response));
    developerServiceMock.updateDeveloper.and.returnValue(of(response));

    spyOn(component, 'onClearForm').and.callThrough();

    component.onSubmit();

    expect(developerServiceMock.updateDeveloper).toHaveBeenCalledWith(
      '123',
      jasmine.any(Object)
    );
    expect(component.onClearForm).toHaveBeenCalled();
    expect(dialogServiceMock.openSuccess).toHaveBeenCalledWith(
      'Sucesso',
      response.message
    );
  });

  it('should handle create developer error', () => {
    component.form.patchValue(mockNewDeveloper);

    const errorResponse = {
      status: 500,
      statusText: 'Internal Server Error',
      error: { message: 'Server error' },
    };
    developerServiceMock.createDeveloper.and.returnValue(
      throwError(() => errorResponse)
    );

    spyOn(console, 'error');

    component.onSubmit();

    expect(developerServiceMock.createDeveloper).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
    expect(dialogServiceMock.openError).toHaveBeenCalledWith(
      'Erro ao cadastrar desenvolvedor',
      'Internal Server Error. Server error'
    );
  });

  it('should handle update developer error', () => {
    component.isEditing = true;
    component.form.patchValue({
      ...mockDeveloper,
      name: mockDeveloper.name + ' Updated',
    });

    const errorResponse = {
      status: 500,
      statusText: 'Internal Server Error',
      error: { message: 'Server error' },
    };
    developerServiceMock.updateDeveloper.and.returnValue(
      throwError(() => errorResponse)
    );

    spyOn(console, 'error');

    component.onSubmit();

    expect(developerServiceMock.updateDeveloper).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
    expect(dialogServiceMock.openError).toHaveBeenCalledWith(
      'Erro ao atualizar desenvolvedor',
      'Internal Server Error. Server error'
    );
  });

  it('should not submit invalid form', () => {
    component.form.get('name')?.setValue('');
    component.form.get('email')?.setValue('');

    spyOn(component.form, 'markAllAsTouched');

    component.onSubmit();

    expect(component.form.markAllAsTouched).toHaveBeenCalled();

    expect(developerServiceMock.createDeveloper).not.toHaveBeenCalled();
    expect(developerServiceMock.updateDeveloper).not.toHaveBeenCalled();
  });

  it('should show form on larger screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: BREAKPOINT_DESKTOP,
      writable: true,
    });
    component.onResize();

    expect(component.showForm).toBeTrue();
  });

  it('should hide form on smaller screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: BREAKPOINT_TABLET,
      writable: true,
    });
    component.onResize();

    expect(component.showForm).toBeFalse();
  });

  it('should add required validator to avatarUrl when githubUser is enabled', fakeAsync(() => {
    const avatarUrlControl = component.form.get('avatarUrl');

    expect(avatarUrlControl?.hasValidator(Validators.required)).toBeFalse();

    component.onRegisterWithGithub();
    tick();

    expect(avatarUrlControl?.hasValidator(Validators.required)).toBeTrue();
  }));
});
