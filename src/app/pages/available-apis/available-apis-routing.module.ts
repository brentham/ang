// available-apis-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { AvailableApisComponent } from './available-apis.component';
import { ApiListComponent } from './api-list/api-list.component';
import { ApiDetailComponent } from './api-detail/api-detail.component';

export function apiDetailsUrlMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  // Check if we have at least one segment and it starts with 'api-details'
  if (segments.length >= 1 && segments[0].path === 'api-details') {
    // Get all segments after 'api-details'
    const remainingPath = segments.slice(1);
    
    // Only match if we have additional segments after 'api-details'
    if (remainingPath.length > 0) {
      return {
        consumed: segments,
        posParams: {
          // Join the remaining segments with '/' to recreate the full API path
          fullPath: new UrlSegment(remainingPath.map(s => s.path).join('/'), {})
        }
      };
    }
  }
  return null;
}

const routes: Routes = [
  { 
    path: '', 
    component: AvailableApisComponent 
  },
  { 
    path: 'api-list', 
    component: ApiListComponent 
  },
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