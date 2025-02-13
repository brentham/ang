

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private baseUrl = 'http://your-fastapi-url/';  // Replace with your FastAPI URL

//   constructor(private http: HttpClient) {}

//   // Get list of all available endpoints
//   getEndpoints(): Observable<any> {
//     return this.http.get(`${this.baseUrl}openapi.json`);
//   }

//   // Generic method to call any endpoint
//   fetchEndpointData(endpoint: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}${endpoint}`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private apiUrl = 'http://localhost:8000/api/v1/auth/users';
  private apiUrl = 'http://localhost:8000';
  // private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // getEndpoints(): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.apiUrl}/`);
  // }

  getApiData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`);
    
  }
}