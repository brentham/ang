// // src/app/services/api.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private baseUrl = 'http://localhost:8000';

//   constructor(private http: HttpClient) { }

//   getOperatingSystems(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/api/v1/auth/users`);
//   }
// }



// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

// Interface for the API response
interface OperatingSystem {
  name: string;
  version: string;
  // Add other properties based on your actual API response
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getOperatingSystems(): Observable<OperatingSystem[]> {
    return this.http.get<OperatingSystem[]>(`${this.baseUrl}/api/v1/auth/users`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching OS data:', error);
        return throwError(() => new Error('Failed to load operating systems'));
      })
    );
  }
}