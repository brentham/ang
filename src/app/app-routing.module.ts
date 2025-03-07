import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'api', loadChildren: () => import('./pages/available-apis/available-apis.module').then(m => m.AvailableApisModule),
  },
  { 
    path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) 
  },
  { path: 'move-vm', loadChildren: () => import('./pages/move-vm/move-vm.module').then(m => m.MoveVmModule) },
  { path: 'api-explorer', loadChildren: () => import('./pages/api-explorer/api-explorer.module').then(m => m.ApiExplorerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
