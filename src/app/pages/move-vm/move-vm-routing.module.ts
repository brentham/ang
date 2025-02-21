import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoveVmComponent } from './move-vm.component';

const routes: Routes = [{ path: '', component: MoveVmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoveVmRoutingModule { }
