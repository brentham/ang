import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { ApiEndpoint, OpenAPISpec, OperationObject } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';
  private cachedOpenApiSpec: OpenAPISpec | null = null;

  constructor(private http: HttpClient) { }

  getApiEndpoints(): Observable<ApiEndpoint[]> {
    return this.http.get<OpenAPISpec>(`${this.baseUrl}/openapi.json`).pipe(
      map(response => {
        // Cache the OpenAPI spec for future use
        this.cachedOpenApiSpec = response;
        return this.transformOpenApiToEndpoints(response);
      }),
      catchError(error => {
        console.error('Error fetching API endpoints:', error);
        return throwError(() => new Error('Failed to load API endpoints'));
      })
    );
  }

  // New method to get a specific endpoint by path and method
  getEndpointByPath(path: string, method?: string): Observable<ApiEndpoint | null> {
    // If we have a cached spec, use it
    if (this.cachedOpenApiSpec) {
      const endpoint = this.findEndpointInSpec(this.cachedOpenApiSpec, path, method);
      return of(endpoint);
    }
    
    // Otherwise fetch the spec first
    return this.http.get<OpenAPISpec>(`${this.baseUrl}/openapi.json`).pipe(
      map(response => {
        this.cachedOpenApiSpec = response;
        return this.findEndpointInSpec(response, path, method);
      }),
      catchError(error => {
        console.error('Error fetching API endpoint details:', error);
        return throwError(() => new Error('Failed to load API endpoint details'));
      })
    );
  }

  private findEndpointInSpec(spec: OpenAPISpec, path: string, method?: string): ApiEndpoint | null {
    // Ensure path starts with '/'
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    // Get the path item from the spec
    const pathItem = spec.paths[path];
    if (!pathItem) return null;
    
    // If method is specified, return only that method's endpoint
    if (method) {
      const operation = pathItem[method.toLowerCase()];
      if (!operation) return null;
      
      return this.createEndpointFromOperation(path, method.toUpperCase() as ApiEndpoint['method'], operation);
    }
    
    // If no method specified, return the first one found
    for (const [methodKey, operation] of Object.entries(pathItem)) {
      return this.createEndpointFromOperation(
        path, 
        methodKey.toUpperCase() as ApiEndpoint['method'], 
        operation as OperationObject
      );
    }
    
    return null;
  }

  // private createEndpointFromOperation(path: string, method: ApiEndpoint['method'], operation: OperationObject): ApiEndpoint {
  //   return {
  //     path,
  //     method,
  //     name: operation.summary || path,
  //     description: operation.description,
  //     parameters: operation.parameters?.map(param => ({
  //       name: param.name,
  //       type: param.schema?.type || 'string',
  //       required: param.required || false,
  //       description: param.description
  //     })),
  //     responses: operation.responses ? 
  //       Object.entries(operation.responses).map(([status, response]) => ({
  //         status: parseInt(status),
  //         description: response.description,
  //         schema: response.content?.['application/json']?.schema
  //       })) : []
  //   };
  // }

  private createEndpointFromOperation(path: string, method: ApiEndpoint['method'], operation: OperationObject): ApiEndpoint {
    return {
      path,
      method,
      name: operation.summary || path,
      description: operation.description,
      parameters: operation.parameters?.map(param => ({
        name: param.name,
        type: param.schema?.type || 'string',
        required: param.required || false,
        description: param.description
      })),
      responses: operation.responses ? 
        Object.entries(operation.responses).map(([status, response]) => ({
          status: parseInt(status),
          description: response.description,
          schema: response.content?.['application/json']?.schema
        })) : [],
      // Add this to extract request body information
      requestBody: operation.requestBody ? {
        required: operation.requestBody.required,
        content: operation.requestBody.content ? 
          Object.entries(operation.requestBody.content).reduce((acc, [contentType, content]) => {
            acc[contentType] = content.schema;
            return acc;
          }, {} as Record<string, any>) : null
      } : undefined
    };
  }

  private transformOpenApiToEndpoints(openApiDoc: OpenAPISpec): ApiEndpoint[] {
    const endpoints: ApiEndpoint[] = [];
    const paths = openApiDoc.paths || {};

    for (const [path, pathItem] of Object.entries(paths)) {
      for (const [method, operation] of Object.entries(pathItem)) {
        endpoints.push(
          this.createEndpointFromOperation(
            path, 
            method.toUpperCase() as ApiEndpoint['method'], 
            operation as OperationObject
          )
        );
      }
    }

    return endpoints;
  }

  // Add this to api.service.ts
executeApiCall(endpoint: ApiEndpoint, params: any = {}, body: any = null): Observable<any> {
  const url = `${this.baseUrl}${endpoint.path}`;
  
  // Handle URL parameters
  let processedUrl = url;
  if (endpoint.parameters) {
    endpoint.parameters.forEach(param => {
      if (param.name in params) {
        processedUrl = processedUrl.replace(`{${param.name}}`, params[param.name]);
      }
    });
  }
  
  // Make the appropriate HTTP request based on the method
  switch (endpoint.method) {
    case 'GET':
      return this.http.get(processedUrl);
    case 'POST':
      return this.http.post(processedUrl, body);
    case 'PUT':
      return this.http.put(processedUrl, body);
    case 'DELETE':
      return this.http.delete(processedUrl);
    case 'PATCH':
      return this.http.patch(processedUrl, body);
    default:
      return throwError(() => new Error(`Unsupported method: ${endpoint.method}`));
  }
}
}