import { Component, inject, Input } from '@angular/core';
import { DeveloperModel } from '../../model/developer.model';
import { DeveloperService } from '../../services/developer.service';
import { DialogService } from '../../services/dialog.service';
import { stringUtils } from '../../utils/string-utils';

@Component({
  selector: 'app-developer-card',
  standalone: true,
  imports: [],
  templateUrl: './developer-card.component.html',
  styleUrl: './developer-card.component.scss',
})
export class DeveloperCardComponent {
  @Input() developerData: DeveloperModel | null = null;

  private readonly developerService = inject(DeveloperService);
  private readonly dialogService = inject(DialogService);

  imageHasError: boolean = false;

  get nameInitials(): string {
    if (!this.developerData) return '';
    return stringUtils.getNameInitials(this.developerData.name);
  }

  onImageError(): void {
    this.imageHasError = true;
  }

  onEdit(): void {
    this.developerService.onEditDeveloper(this.developerData);
  }

  onDelete(): void {
    if (!this.developerData) return;

    this.dialogService
      .openConfirm(
        'Atenção',
        `Você tem certeza que deseja excluir o desenvolvedor ${this.developerData?.name}?`
      )
      .subscribe((result) => {
        if (result) this.deleteDeveloper(this.developerData?.id!);
      });
  }

  private deleteDeveloper(id: string): void {
    this.developerService.deleteDeveloper(id).subscribe({
      next: (response) => {
        this.dialogService.openSuccess('Sucesso', response.message);
      },
      error: (error) => {
        console.error(error);
        const errorMessage = `${error.statusText}. ${error.error.message}`;
        this.dialogService.openError(
          'Erro ao deletar desenvolvedor',
          errorMessage
        );
      },
    });
  }
}
