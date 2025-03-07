// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiService } from '../../../services/api.service';
// import { ApiEndpoint } from '../../../interfaces/api';
// import { Observable, catchError, map, of, startWith } from 'rxjs';
// import { MatTableModule } from '@angular/material/table';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';

// interface LoadingState<T> {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
// }

// @Component({
//   selector: 'app-api-list',
//   standalone: false,
//   templateUrl: './api-list.component.html',
//   styleUrl: './api-list.component.scss'
// })
// export class ApiListComponent implements OnInit {
//   state$!: Observable<LoadingState<ApiEndpoint[]>>;

//   constructor(
//     private apiService: ApiService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.loadEndpoints();
//   }

//   loadEndpoints() {
//     this.state$ = this.apiService.getApiEndpoints().pipe(
//       map(data => ({
//         data,
//         loading: false,
//         error: null
//       })),
//       catchError(error => of({
//         data: null,
//         loading: false,
//         error: 'Failed to load API endpoints. Please try again later.'
//       })),
//       startWith({
//         data: null,
//         loading: true,
//         error: null
//       })
//     );
//   }

//   // showEndpointDetails(endpoint: ApiEndpoint) {
//   //   // Encode the path to handle special characters
//   //   const encodedPath = encodeURIComponent(endpoint.path);
//   //   this.router.navigate(['/api-details', encodedPath], {
//   //     state: { endpoint }
//   //   });
//   // }

//   // showEndpointDetails(endpoint: ApiEndpoint) {
//   //   // Clean the path
//   //   let path = endpoint.path;
    
//   //   // Remove leading slash if present
//   //   if (path.startsWith('/')) {
//   //     path = path.slice(1);
//   //   }

//   //   // Navigate using route segments
//   //   const segments = ['api-details', ...path.split('/')];
    
//   //   this.router.navigate(segments, {
//   //     state: { endpoint },
//   //     // Preserve the query params and fragment if any
//   //     preserveFragment: true,
//   //     queryParamsHandling: 'preserve'
//   //   });
//   // }


//   showEndpointDetails(endpoint: ApiEndpoint) {
//     // Remove leading slash if present
//     const path = endpoint.path.startsWith('/') ? endpoint.path.slice(1) : endpoint.path;
    
//     // Create the route segments array
//     const segments = ['api-details', ...path.split('/')];
    
//     this.router.navigate(segments, {
//       state: { endpoint },
//       relativeTo: this.route // Add this if you want relative navigation
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ApiEndpoint } from '../../../interfaces/api';
import { Observable, catchError, map, of, startWith } from 'rxjs';

interface LoadingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-api-list',
  standalone: false,
  templateUrl: './api-list.component.html',
  styleUrl: './api-list.component.scss'
})
export class ApiListComponent implements OnInit {
  state$!: Observable<LoadingState<ApiEndpoint[]>>;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadEndpoints();
  }

  loadEndpoints() {
    this.state$ = this.apiService.getApiEndpoints().pipe(
      map(data => ({
        data,
        loading: false,
        error: null
      })),
      catchError(error => of({
        data: null,
        loading: false,
        error: 'Failed to load API endpoints. Please try again later.'
      })),
      startWith({
        data: null,
        loading: true,
        error: null
      })
    );
  }

  showEndpointDetails(endpoint: ApiEndpoint) {
    // Remove leading slash if present to avoid double slashes
    const path = endpoint.path.startsWith('/') ? endpoint.path.slice(1) : endpoint.path;
    
    // Create the route segments array
    const segments = ['api-details', ...path.split('/')];
    
    // Use the router to navigate to the detail page,
    // also passing the endpoint object through the router state
    this.router.navigate(segments, {
      state: { endpoint },
      // Navigate relative to the parent route (available-apis)
      relativeTo: this.route.parent
    });
  }
}