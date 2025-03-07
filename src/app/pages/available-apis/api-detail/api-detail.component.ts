// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { ApiEndpoint } from '../../../interfaces/api';

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndpoint, ApiParameter } from '../../../interfaces/api';
// import { Location } from '@angular/common';

// // import { Location } from '@angular/common';
// @Component({
//   selector: 'app-api-detail',
//   standalone: false,
//   templateUrl: './api-detail.component.html',
//   styleUrl: './api-detail.component.scss'
// })

// // export class ApiDetailComponent implements OnInit {
// //   endpoint: ApiEndpoint | null = null;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private router: Router,
// //     private location: Location
// //   ) {
// //     const navigation = this.router.getCurrentNavigation();
// //     if (navigation?.extras.state) {
// //       this.endpoint = navigation.extras.state['endpoint'];
// //     }
// //   }

// //   ngOnInit() {
// //     if (!this.endpoint) {
// //       // If we don't have the endpoint data, redirect back to the list
// //       this.router.navigate(['/api-list']);
// //     }
// //   }

// //   goBack() {
// //     this.location.back();
// //   }
// // }



// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { ApiEndpoint, ApiParameter } from '../../../interfaces/api';
// // import { Location } from '@angular/common';


// export class ApiDetailComponent implements OnInit {
//   endpoint: ApiEndpoint | null = null;
//   loading = true;
//   error: string | null = null;
  
//   // Add a getter for parameters to ensure we always return an array
//   get parameters(): ApiParameter[] {
//     return this.endpoint?.parameters || [];
//   }

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private location: Location
//   ) {
//     this.initializeEndpoint();
//   }

//   // private initializeEndpoint() {
//   //   try {
//   //     const navigation = this.router.getCurrentNavigation();
//   //     if (navigation?.extras.state) {
//   //       this.endpoint = navigation.extras.state['endpoint'];
//   //       this.loading = false;
//   //     } else {
//   //       // Try getting from route params as fallback
//   //       const path = this.route.snapshot.paramMap.get('path');
//   //       const method = this.route.snapshot.paramMap.get('method');
        
//   //       if (path && method) {
//   //         // Could add service call here to fetch endpoint details
//   //         this.loading = false;
//   //       } else {
//   //         throw new Error('No endpoint data available');
//   //       }
//   //     }
//   //   } catch (err) {
//   //     this.error = 'Failed to load endpoint details';
//   //     this.loading = false;
//   //   }
//   // }

//   private initializeEndpoint() {
//     try {
//       const navigation = this.router.getCurrentNavigation();
//       if (navigation?.extras.state) {
//         this.endpoint = navigation.extras.state['endpoint'];
//         this.loading = false;
//       } else {
//         // Get the full path from route params
//         const fullPath = this.route.snapshot.paramMap.get('fullPath');
//         if (fullPath) {
//           // Use the full path to fetch endpoint details
//           // Add your service call here if needed
//           this.loading = false;
//         } else {
//           throw new Error('No endpoint data available');
//         }
//       }
//     } catch (err) {
//       this.error = 'Failed to load endpoint details';
//       this.loading = false;
//     }
//   }

//   ngOnInit() {
//     if (!this.endpoint && !this.error) {
//       this.router.navigate(['/api-list']);
//     }
//   }

//   goBack() {
//     this.location.back();
//   }

//   getMethodClass(method: string): string {
//     return method.toLowerCase();
//   }

//   isJsonString(str: string): boolean {
//     try {
//       JSON.parse(str);
//       return true;
//     } catch (e) {
//       return false;
//     }
//   }

//   formatJson(data: any): string {
//     return JSON.stringify(data, null, 2);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiEndpoint, ApiParameter } from '../../../interfaces/api';
import { Location } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-api-detail',
  standalone: false,
  templateUrl: './api-detail.component.html',
  styleUrl: './api-detail.component.scss'
})
export class ApiDetailComponent implements OnInit {
  endpoint: ApiEndpoint | null = null;
  loading = true;
  error: string | null = null;
  
  get parameters(): ApiParameter[] {
    return this.endpoint?.parameters || [];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {
    // Try to get endpoint from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.endpoint = navigation.extras.state['endpoint'];
      this.loading = false;
    }
  }

  ngOnInit() {
    // If endpoint wasn't passed via state, try to get it from route params
    if (!this.endpoint) {
      // Get the full path from route params
      const fullPath = this.route.snapshot.paramMap.get('fullPath');
      
      if (fullPath) {
        // Construct the full path with leading slash
        const path = fullPath.startsWith('/') ? fullPath : '/' + fullPath;
        
        this.apiService.getEndpointByPath(path).pipe(
          catchError(err => {
            this.error = 'Failed to load endpoint details';
            this.loading = false;
            return of(null);
          })
        ).subscribe(endpoint => {
          if (endpoint) {
            this.endpoint = endpoint;
            this.loading = false;
          } else {
            this.error = 'Endpoint not found';
            this.loading = false;
          }
        });
      } else {
        this.error = 'No endpoint information available';
        this.loading = false;
        // Navigate back to the list after a short delay
        setTimeout(() => this.router.navigate(['/api-list']), 2000);
      }
    }
  }

  goBack() {
    this.location.back();
  }

  getMethodClass(method: string): string {
    return method.toLowerCase();
  }

  isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  formatJson(data: any): string {
    return JSON.stringify(data, null, 2);
  }
}