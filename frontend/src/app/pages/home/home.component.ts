import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DeveloperCardComponent } from '../../components/developer-card/developer-card.component';
import { DeveloperFormComponent } from '../../components/developer-form/developer-form.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DeveloperService } from '../../services/developer.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    DeveloperCardComponent,
    DeveloperFormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly developerService = inject(DeveloperService);

  readonly developers$ = this.developerService.developers$;

  ngOnInit(): void {
    this.getAllDevelopers();
  }

  private getAllDevelopers(): void {
    this.developerService.getDevelopers();
  }
}
