import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiExplorerRoutingModule } from './api-explorer-routing.module';
import { ApiExplorerComponent } from './api-explorer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';


@NgModule({
  declarations: [
    ApiExplorerComponent
  ],
  imports: [
    CommonModule,
    ApiExplorerRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    MatChipsModule,
    MatFormFieldModule,
    MatLabel,
    MatTabsModule,
    ReactiveFormsModule
  ]
})
export class ApiExplorerModule { }
