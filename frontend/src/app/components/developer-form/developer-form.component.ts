import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeveloperModel } from '../../model/developer.model';
import { DeveloperService } from '../../services/developer.service';
import { DialogService } from '../../services/dialog.service';
import { GithubService } from '../../services/github.service';
import { getInputErrorMessage } from '../../utils/get-input-error-message';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-developer-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './developer-form.component.html',
  styleUrl: './developer-form.component.scss',
})
export class DeveloperFormComponent implements OnInit, OnDestroy {
  private readonly BREAKPOINT_TABLET = 768;
  private readonly fb = inject(FormBuilder);
  private readonly dialogService = inject(DialogService);
  private readonly githubService = inject(GithubService);
  private readonly developerService = inject(DeveloperService);

  private developerSubscription: Subscription | null = null;

  readonly developer$ = this.developerService.developer$;
  readonly getErrorMessage = getInputErrorMessage;

  showForm: boolean = true;
  screenIsSmall: boolean = false;
  isEditing: boolean = false;
  form!: FormGroup;

  get toggleFormButtonLabel(): string {
    return this.showForm ? 'Esconder formulário' : 'Exibir formulário';
  }

  get submitButtonLabel(): string {
    return this.isEditing ? 'Atualizar' : 'Cadastrar';
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.buildForm();

    this.developerSubscription = this.developer$.subscribe((developer) => {
      if (developer) {
        this.isEditing = true;
        this.form.patchValue(developer);
      }
    });
  }

  ngOnDestroy(): void {
    this.developerSubscription?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  onToggleForm(): void {
    this.showForm = !this.showForm;
  }

  onRegisterWithGithub(): void {
    this.form.get('githubUser')?.enable();
  }

  onGetGithubUserData(): void {
    const githubUser = this.form.get('githubUser')?.value;
    if (!githubUser) return;

    this.githubService.getUserData(githubUser).subscribe({
      next: (userData) => {
        this.form.patchValue({
          avatarUrl: userData.avatarUrl,
          name: userData.name,
          email: userData.email,
          city: userData.location,
          githubUserProfileUrl: userData.githubUserProfileUrl,
        });
      },
      error: (error) => {
        console.error(error);
        this.onClearForm();

        const errorMessage = `${error.statusText}. ${error.error.message}`;
        this.dialogService.openError(
          'Erro ao buscar usuário do Github',
          errorMessage
        );
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = {
      ...this.form.value,
    };

    const { id, ...developerData } = formValue;

    if (this.isEditing && id) {
      this.updateDeveloper(id, developerData as DeveloperModel);
    } else {
      this.createDeveloper(developerData as DeveloperModel);
    }
  }

  onClearForm(): void {
    this.form.reset();
    this.isEditing = false;
    this.developerService.onEditDeveloper(null);
  }

  private checkScreenSize(): void {
    const width = window.innerWidth;
    this.screenIsSmall = width <= this.BREAKPOINT_TABLET;

    if (this.screenIsSmall) this.showForm = false;
    else this.showForm = true;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      githubUser: ['', [Validators.required, Validators.minLength(3)]],
      avatarUrl: ['', [Validators.minLength(10)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      academicBackground: ['', [Validators.required, Validators.minLength(3)]],
      technologies: ['', [Validators.required, Validators.minLength(3)]],
      id: [''],
      githubUserProfileUrl: [''],
    });

    this.form.get('githubUser')?.disable();

    this.formChanges();
  }

  private formChanges(): void {
    const githubUserControl = this.form.get('githubUser');
    const avatarUrlControl = this.form.get('avatarUrl');

    if (!githubUserControl || !avatarUrlControl) return;

    githubUserControl.statusChanges.subscribe(() => {
      if (githubUserControl.enabled) {
        avatarUrlControl.addValidators(Validators.required);
      } else {
        avatarUrlControl.removeValidators(Validators.required);
      }

      avatarUrlControl.updateValueAndValidity();
    });
  }

  private createDeveloper(developer: DeveloperModel): void {
    this.developerService.createDeveloper(developer).subscribe({
      next: (response) => {
        this.onClearForm();
        this.dialogService.openSuccess('Sucesso', response.message);
      },
      error: (error) => {
        console.error(error);
        const errorMessage = `${error.statusText}. ${error.error.message}`;
        this.dialogService.openError(
          'Erro ao cadastrar desenvolvedor',
          errorMessage
        );
      },
    });
  }

  private updateDeveloper(id: string, developer: DeveloperModel): void {
    this.developerService.updateDeveloper(id, developer).subscribe({
      next: (response) => {
        this.isEditing = false;
        this.onClearForm();
        this.dialogService.openSuccess('Sucesso', response.message);
      },
      error: (error) => {
        console.error(error);
        const errorMessage = `${error.statusText}. ${error.error.message}`;
        this.dialogService.openError(
          'Erro ao atualizar desenvolvedor',
          errorMessage
        );
      },
    });
  }
}
