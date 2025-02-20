import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { AvailableApisComponent } from './available-apis.component';
import { ApiListComponent } from './api-list/api-list.component';
import { ApiDetailComponent } from './api-detail/api-detail.component';


// Custom matcher for API details route
export function apiDetailsUrlMatcher(url: UrlSegment[]): UrlMatchResult | null {
  if (url[0]?.path === 'api-details') {
    // Combine all remaining segments to form the API path
    const apiPath = url.slice(1).map(segment => segment.path).join('/');
    return {
      consumed: url,
      posParams: {
        path: new UrlSegment(apiPath, {})
      }
    };
  }
  return null;
}

const routes: Routes = [
  { path: '', component: AvailableApisComponent },
  { path: 'api-list', component: ApiListComponent },
  // { path: 'api-details/:path', component: ApiDetailComponent },
  { 
    matcher: apiDetailsUrlMatcher,
    component: ApiDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailableApisRoutingModule { }
