import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoveVmRoutingModule } from './move-vm-routing.module';
import { MoveVmComponent } from './move-vm.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MoveVmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MoveVmRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class MoveVmModule { }
