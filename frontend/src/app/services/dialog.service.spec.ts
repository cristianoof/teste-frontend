import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogService, DialogTypeEnum } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpyObj: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(() => {
    dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(true));

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    TestBed.configureTestingModule({
      providers: [DialogService, { provide: MatDialog, useValue: dialogSpy }],
    });
    service = TestBed.inject(DialogService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should open error dialog', () => {
    service.openError('Error', 'Error message');

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
      width: '480px',
      data: {
        type: DialogTypeEnum.ERROR,
        title: 'Error',
        message: 'Error message',
        confirmText: 'OK',
      },
      autoFocus: true,
      restoreFocus: true,
    });
  });

  it('should open info dialog', () => {
    service.openInfo('Info', 'Info message');

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
      width: '480px',
      data: {
        type: DialogTypeEnum.INFO,
        title: 'Info',
        message: 'Info message',
        confirmText: 'OK',
      },
      autoFocus: true,
      restoreFocus: true,
    });
  });

  it('should open success dialog', () => {
    service.openSuccess('Success', 'Success message');

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
      width: '480px',
      data: {
        type: DialogTypeEnum.SUCCESS,
        title: 'Success',
        message: 'Success message',
        confirmText: 'OK',
      },
      autoFocus: true,
      restoreFocus: true,
    });
  });

  it('should open warning dialog', () => {
    service.openWarning('Warning', 'Warning message');

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
      width: '480px',
      data: {
        type: DialogTypeEnum.WARNING,
        title: 'Warning',
        message: 'Warning message',
        confirmText: 'OK',
      },
      autoFocus: true,
      restoreFocus: true,
    });
  });

  it('should open confirm dialog with default button texts', () => {
    service.openConfirm('Confirm', 'Confirm message');

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
      width: '480px',
      data: {
        type: DialogTypeEnum.CONFIRM,
        title: 'Confirm',
        message: 'Confirm message',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
      },
      autoFocus: true,
      restoreFocus: true,
    });
  });

  it('should open confirm dialog with custom button texts', () => {
    service.openConfirm('Confirm', 'Confirm message', 'Yes', 'No');

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogComponent, {
      width: '480px',
      data: {
        type: DialogTypeEnum.CONFIRM,
        title: 'Confirm',
        message: 'Confirm message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
      autoFocus: true,
      restoreFocus: true,
    });
  });

  it('should return observable from confirm dialog', () => {
    const result = service.openConfirm('Confirm', 'Confirm message');

    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(result).toBeDefined();
    result.subscribe((res) => {
      expect(res).toBe(true);
    });
  });
});
