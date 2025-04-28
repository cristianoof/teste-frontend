import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  private readonly loaderService = inject(LoaderService);

  readonly loadingCounter$ = this.loaderService.loadingCounter$;
  readonly message: string = 'Carregando...';
}
