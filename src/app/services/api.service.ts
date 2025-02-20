// // src/app/services/api.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, catchError, map, throwError } from 'rxjs';
// import { ApiEndpoint } from '../interfaces/api';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private baseUrl = 'http://localhost:8000';

//   constructor(private http: HttpClient) { }

//   getApiEndpoints(): Observable<ApiEndpoint[]> {
//     // Assuming your FastAPI provides an endpoint that returns available endpoints
//     return this.http.get<ApiEndpoint[]>(`${this.baseUrl}/openapi.json`).pipe(
//       map(response => this.transformOpenApiToEndpoints(response)),
//       catchError(error => {
//         console.error('Error fetching API endpoints:', error);
//         return throwError(() => new Error('Failed to load API endpoints'));
//       })
//     );
//   }

//   private transformOpenApiToEndpoints(openApiDoc: any): ApiEndpoint[] {
//     const endpoints: ApiEndpoint[] = [];
//     const paths = openApiDoc.paths || {};

//     for (const [path, methods] of Object.entries(paths)) {
//       for (const [method, details] of Object.entries(methods as any)) {
//         endpoints.push({
//           path,
//           method: method.toUpperCase() as any,
//           name: details.summary || path,
//           description: details.description,
//           parameters: details.parameters,
//           responses: Object.entries(details.responses).map(([status, res]: [string, any]) => ({
//             status: parseInt(status),
//             description: res.description,
//             schema: res.content?.['application/json']?.schema
//           }))
//         });
//       }
//     }

//     return endpoints;
//   }
// }
















// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ApiEndpoint, OpenAPISpec, OperationObject } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getApiEndpoints(): Observable<ApiEndpoint[]> {
    return this.http.get<OpenAPISpec>(`${this.baseUrl}/openapi.json`).pipe(
      map(response => this.transformOpenApiToEndpoints(response)),
      catchError(error => {
        console.error('Error fetching API endpoints:', error);
        return throwError(() => new Error('Failed to load API endpoints'));
      })
    );
  }

  private transformOpenApiToEndpoints(openApiDoc: OpenAPISpec): ApiEndpoint[] {
    const endpoints: ApiEndpoint[] = [];
    const paths = openApiDoc.paths || {};

    for (const [path, pathItem] of Object.entries(paths)) {
      for (const [method, operation] of Object.entries(pathItem)) {
        const operationDetails = operation as OperationObject;
        
        endpoints.push({
          path,
          method: method.toUpperCase() as ApiEndpoint['method'],
          name: operationDetails.summary || path,
          description: operationDetails.description,
          parameters: operationDetails.parameters?.map(param => ({
            name: param.name,
            type: param.schema?.type || 'string',
            required: param.required || false,
            description: param.description
          })),
          responses: operationDetails.responses ? 
            Object.entries(operationDetails.responses).map(([status, response]) => ({
              status: parseInt(status),
              description: response.description,
              schema: response.content?.['application/json']?.schema
            })) : []
        });
      }
    }

    return endpoints;
  }
}