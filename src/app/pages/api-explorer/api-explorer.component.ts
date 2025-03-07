import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ApiEndpoint } from '../../interfaces/api';
import { Observable, catchError, map, of, startWith, finalize } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

interface LoadingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-api-explorer',
  standalone: false,
  templateUrl: './api-explorer.component.html',
  styleUrls: ['./api-explorer.component.scss']
})
export class ApiExplorerComponent implements OnInit {
  state$!: Observable<LoadingState<ApiEndpoint[]>>;
  selectedEndpoint: ApiEndpoint | null = null;
  endpointsByTag: Map<string, ApiEndpoint[]> = new Map();
  expandedTags: Set<string> = new Set();


  // Add these properties to your component class
  requestForm!: FormGroup;
  apiResponse: any = null;
  isLoading = false;
  showResponse = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadEndpoints();
    this.requestForm = this.fb.group({});

  }

  loadEndpoints() {
    this.state$ = this.apiService.getApiEndpoints().pipe(
      map(data => {
        this.organizeEndpointsByTag(data);
        return { data, loading: false, error: null };
      }),
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

  private organizeEndpointsByTag(endpoints: ApiEndpoint[]) {
    this.endpointsByTag.clear();
    
    // Group endpoints by first path segment or 'default' if none
    endpoints.forEach(endpoint => {
      const pathSegments = endpoint.path.split('/').filter(segment => segment);
      const tag = pathSegments.length > 0 ? pathSegments[0] : 'default';
      
      if (!this.endpointsByTag.has(tag)) {
        this.endpointsByTag.set(tag, []);
      }
      
      this.endpointsByTag.get(tag)?.push(endpoint);
    });
  }

  toggleTag(tag: string) {
    if (this.expandedTags.has(tag)) {
      this.expandedTags.delete(tag);
    } else {
      this.expandedTags.add(tag);
    }
  }

  isTagExpanded(tag: string): boolean {
    return this.expandedTags.has(tag);
  }

  // selectEndpoint(endpoint: ApiEndpoint) {
  //   this.selectedEndpoint = endpoint;
  // }

  getMethodClass(method: string): string {
    return method.toLowerCase();
  }

  formatJson(data: any): string {
    return JSON.stringify(data, null, 2);
  }







// Method to prepare the form when an endpoint is selected
prepareRequestForm(endpoint: ApiEndpoint) {
  // Create a form with controls for each parameter
  const formGroup: any = {};
  
  if (endpoint.parameters) {
    endpoint.parameters.forEach(param => {
      formGroup[param.name] = [''];
    });
  }
  
  // Add a control for request body if needed
  if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
    formGroup['requestBody'] = ['{}'];
  }
  
  this.requestForm = this.fb.group(formGroup);
}

// Method to select an endpoint
selectEndpoint(endpoint: ApiEndpoint) {
  this.selectedEndpoint = endpoint;
  this.apiResponse = null;
  this.showResponse = false;
  this.prepareRequestForm(endpoint);
}

// Method to execute the API call
executeRequest() {
  if (!this.selectedEndpoint) return;
  
  this.isLoading = true;
  this.showResponse = false;
  
  const params = this.requestForm.value;
  let body = null;
  
  // Extract body from form if needed
  if (['POST', 'PUT', 'PATCH'].includes(this.selectedEndpoint.method)) {
    try {
      body = JSON.parse(params.requestBody);
      delete params.requestBody;
    } catch (e) {
      console.error('Invalid JSON in request body', e);
      this.apiResponse = { error: 'Invalid JSON in request body' };
      this.isLoading = false;
      this.showResponse = true;
      return;
    }
  }
  
  this.apiService.executeApiCall(this.selectedEndpoint, params, body)
    .pipe(
      catchError(error => {
        console.error('API request failed', error);
        return of({ error: error.message || 'Request failed' });
      }),
      finalize(() => {
        this.isLoading = false;
        this.showResponse = true;
      })
    )
    .subscribe(response => {
      this.apiResponse = response;
    });
}
  
}