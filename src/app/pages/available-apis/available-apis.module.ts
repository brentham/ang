import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailableApisRoutingModule } from './available-apis-routing.module';
import { AvailableApisComponent } from './available-apis.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AvailableApisComponent
  ],
  imports: [
    CommonModule,
    AvailableApisRoutingModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class AvailableApisModule { }
