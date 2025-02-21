import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'api', loadChildren: () => import('./pages/available-apis/available-apis.module').then(m => m.AvailableApisModule),
  },
  { 
    path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
