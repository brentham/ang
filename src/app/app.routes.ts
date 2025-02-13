import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Dashboard2Component } from './pages/dashboard2/dashboard2.component';
import { ApiDashboardComponent } from './pages/api-dashboard/api-dashboard.component';
import { ApiListComponent } from './pages/api-list/api-list.component';
import { ApiDetailsComponent } from './components/api-details/api-details.component';

export const routes: Routes = [
    // { path: '', component: DashboardComponent  },
    // { path: 'api', component: ApiDashboardComponent  },
    { path: '', component: ApiListComponent },
    { path: 'api', component: ApiDetailsComponent }
    // { path: 'api/:endpoint', component: ApiDetailsComponent }
    // { path: '', component: Dashboard2Component  }
];
