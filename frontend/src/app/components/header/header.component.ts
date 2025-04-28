import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DeveloperService } from '../../services/developer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly developerService = inject(DeveloperService);

  form!: FormGroup;

  get hasSearchTerm(): boolean {
    return !!this.form.get('searchTerm')?.value;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onClearSearch(): void {
    this.form.get('searchTerm')?.setValue('');
  }

  private buildForm(): void {
    this.form = this.fb.group({
      searchTerm: [''],
    });

    this.formChanges();
  }

  private formChanges(): void {
    this.form.get('searchTerm')?.valueChanges.subscribe((value) => {
      this.developerService.filterDeveloperList(value);
    });
  }
}
