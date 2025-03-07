export interface OpenAPISpec {
    paths: {
      [path: string]: PathItem;
    };
  }
  
  export interface PathItem {
    [method: string]: OperationObject;
  }
  
  // export interface OperationObject {
  //   summary?: string;
  //   description?: string;
  //   parameters?: ParameterObject[];
  //   responses?: {
  //     [statusCode: string]: ResponseObject;
  //   };
  // }
  
  export interface ParameterObject {
    name: string;
    in: string;
    description?: string;
    required?: boolean;
    schema?: SchemaObject;
  }
  
  export interface ResponseObject {
    description: string;
    content?: {
      [mediaType: string]: {
        schema?: SchemaObject;
      };
    };
  }
  
  export interface SchemaObject {
    type?: string;
    properties?: {
      [name: string]: SchemaObject;
    };
    items?: SchemaObject;
    required?: string[];
  }
export interface ApiEndpoint {
    path: string;
    name?: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    description?: string;
    parameters?: ApiParameter[];
    responses?: ApiResponse[];
    requestBody?: any; 
}

export interface ApiParameter {
    name: string;
    type: string;
    required: boolean;
    description?: string;
}

export interface ApiResponse {
    status: number;
    description: string;
    schema?: any;
}

export interface OperationObject {
  summary?: string;
  description?: string;
  parameters?: any[];
  responses?: Record<string, any>;
  requestBody?: {
    required?: boolean;
    content?: Record<string, any>;
  };
}