import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableApisComponent } from './available-apis.component';

const routes: Routes = [{ path: '', component: AvailableApisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailableApisRoutingModule { }
