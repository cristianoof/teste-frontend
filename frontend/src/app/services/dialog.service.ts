import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';

export enum DialogTypeEnum {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  CONFIRM = 'confirm',
}

export interface DialogData {
  type: DialogTypeEnum;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openError(title: string, message: string): void {
    this.openDialog({
      type: DialogTypeEnum.ERROR,
      title,
      message,
      confirmText: 'OK',
    });
  }

  openInfo(title: string, message: string): void {
    this.openDialog({
      type: DialogTypeEnum.INFO,
      title,
      message,
      confirmText: 'OK',
    });
  }

  openSuccess(title: string, message: string): void {
    this.openDialog({
      type: DialogTypeEnum.SUCCESS,
      title,
      message,
      confirmText: 'OK',
    });
  }

  openWarning(title: string, message: string): void {
    this.openDialog({
      type: DialogTypeEnum.WARNING,
      title,
      message,
      confirmText: 'OK',
    });
  }

  openConfirm(
    title: string,
    message: string,
    confirmText: string = 'Confirmar',
    cancelText: string = 'Cancelar'
  ): Observable<boolean> {
    const dialogRef = this.openDialog({
      type: DialogTypeEnum.CONFIRM,
      title,
      message,
      confirmText,
      cancelText,
    });

    return dialogRef.afterClosed();
  }

  private openDialog(data: DialogData): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      width: '480px',
      data,
      autoFocus: true,
      restoreFocus: true,
    });
  }
}
