import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailableApisRoutingModule } from './available-apis-routing.module';
import { AvailableApisComponent } from './available-apis.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiListComponent } from './api-list/api-list.component';
import { ApiDetailComponent } from './api-detail/api-detail.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AvailableApisComponent,
    ApiListComponent,
    ApiDetailComponent
  ],
  imports: [
    CommonModule,
    AvailableApisRoutingModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    // MatExpansionModule,
  ]
})
export class AvailableApisModule { }
