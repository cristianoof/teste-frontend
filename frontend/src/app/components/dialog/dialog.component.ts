import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogData, DialogTypeEnum } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, NgClass],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  private dialogRef = inject(MatDialogRef<DialogComponent>);

  data = inject(MAT_DIALOG_DATA) as DialogData;

  get icon(): string {
    switch (this.data.type) {
      case DialogTypeEnum.ERROR:
        return 'error';
      case DialogTypeEnum.INFO:
        return 'info';
      case DialogTypeEnum.SUCCESS:
        return 'check_circle';
      case DialogTypeEnum.WARNING:
        return 'warning';
      case DialogTypeEnum.CONFIRM:
        return 'help';
      default:
        return 'info';
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
