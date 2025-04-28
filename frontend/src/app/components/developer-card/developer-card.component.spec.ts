import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { DeveloperModel } from '../../model/developer.model';
import { DeveloperService } from '../../services/developer.service';
import { DialogService } from '../../services/dialog.service';
import { stringUtils } from '../../utils/string-utils';
import { DeveloperCardComponent } from './developer-card.component';

describe('DeveloperCardComponent', () => {
  let component: DeveloperCardComponent;
  let fixture: ComponentFixture<DeveloperCardComponent>;
  let developerServiceSpy: jasmine.SpyObj<DeveloperService>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;

  const mockDeveloper: DeveloperModel = {
    id: '1',
    academicBackground: 'Sistemas de Informação',
    avatarUrl: 'avatar-url',
    city: 'Marigá - PR',
    email: 'joao@teste.com',
    githubUser: 'joaosilvateste',
    githubUserProfileUrl: 'github-url',
    name: 'João Silva',
    technologies: 'Angular, React, Typescript',
  };

  beforeEach(async () => {
    developerServiceSpy = jasmine.createSpyObj('DeveloperService', [
      'onEditDeveloper',
      'deleteDeveloper',
    ]);

    dialogServiceSpy = jasmine.createSpyObj('DialogService', [
      'openConfirm',
      'openSuccess',
      'openError',
    ]);

    await TestBed.configureTestingModule({
      imports: [DeveloperCardComponent],
      providers: [
        { provide: DeveloperService, useValue: developerServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeveloperCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return name initials', () => {
    component.developerData = mockDeveloper;
    spyOn(stringUtils, 'getNameInitials').and.returnValue('JS');
    expect(component.nameInitials).toBe('JS');
    expect(stringUtils.getNameInitials).toHaveBeenCalledWith(
      mockDeveloper.name
    );
  });

  it('should set imageHasError to true on image error', () => {
    component.onImageError();
    expect(component.imageHasError).toBeTrue();
  });

  it('should call onEditDeveloper when onEdit is triggered', () => {
    component.developerData = mockDeveloper;
    component.onEdit();
    expect(developerServiceSpy.onEditDeveloper).toHaveBeenCalledWith(
      mockDeveloper
    );
  });

  it('should open confirmation dialog and delete developer on confirmation', () => {
    component.developerData = mockDeveloper;
    dialogServiceSpy.openConfirm.and.returnValue(of(true));
    developerServiceSpy.deleteDeveloper.and.returnValue(
      of({ status: 'success', message: 'Desenvolvedor deletado com sucesso.' })
    );

    component.onDelete();

    expect(dialogServiceSpy.openConfirm).toHaveBeenCalledWith(
      'Atenção',
      `Você tem certeza que deseja excluir o desenvolvedor ${mockDeveloper.name}?`
    );

    expect(developerServiceSpy.deleteDeveloper).toHaveBeenCalledWith(
      mockDeveloper.id!
    );

    expect(dialogServiceSpy.openSuccess).toHaveBeenCalledWith(
      'Sucesso',
      'Desenvolvedor deletado com sucesso.'
    );
  });

  it('should handle error when deleteDeveloper fails', () => {
    component.developerData = mockDeveloper;
    dialogServiceSpy.openConfirm.and.returnValue(of(true));
    developerServiceSpy.deleteDeveloper.and.returnValue(
      throwError(() => ({
        statusText: 'Error',
        error: { message: 'Falha ao deletar o desenvolvedor.' },
      }))
    );

    component.onDelete();

    expect(dialogServiceSpy.openError).toHaveBeenCalledWith(
      'Erro ao deletar desenvolvedor',
      'Error. Falha ao deletar o desenvolvedor.'
    );
  });

  it('should not proceed with deletion if confirmation is declined', () => {
    component.developerData = mockDeveloper;
    dialogServiceSpy.openConfirm.and.returnValue(of(false));

    component.onDelete();

    expect(developerServiceSpy.deleteDeveloper).not.toHaveBeenCalled();
  });
});
