import { NgClass } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogData, DialogTypeEnum } from '../../services/dialog.service';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  const mockDialogData: DialogData = {
    type: DialogTypeEnum.INFO,
    title: 'Test Title',
    message: 'Test Message',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent, MatIconModule, NgClass],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject data correctly', () => {
    expect(component.data).toEqual(mockDialogData);
  });

  it('should have the correct icon for INFO type', () => {
    component.data.type = DialogTypeEnum.INFO;
    fixture.detectChanges();
    expect(component.icon).toBe('info');
  });

  it('should have the correct icon for ERROR type', () => {
    component.data.type = DialogTypeEnum.ERROR;
    fixture.detectChanges();
    expect(component.icon).toBe('error');
  });

  it('should have the correct icon for SUCCESS type', () => {
    component.data.type = DialogTypeEnum.SUCCESS;
    fixture.detectChanges();
    expect(component.icon).toBe('check_circle');
  });

  it('should have the correct icon for WARNING type', () => {
    component.data.type = DialogTypeEnum.WARNING;
    fixture.detectChanges();
    expect(component.icon).toBe('warning');
  });

  it('should have the correct icon for CONFIRM type', () => {
    component.data.type = DialogTypeEnum.CONFIRM;
    fixture.detectChanges();
    expect(component.icon).toBe('help');
  });

  it('should close the dialog with true when onConfirm is called', () => {
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with false when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});
