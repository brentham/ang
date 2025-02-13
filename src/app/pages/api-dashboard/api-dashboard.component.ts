import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-api-dashboard',
  imports: [CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatOptionModule],
  templateUrl: './api-dashboard.component.html',
  styleUrl: './api-dashboard.component.scss'
})
export class ApiDashboardComponent {
  // endpoints: any[] = [];
  // selectedEndpoint: any;
  // displayedColumns: string[] = [];
  // dataSource: MatTableDataSource<any>;
  
  // // @ViewChild(MatPaginator) paginator: MatPaginator;
  // // @ViewChild(MatSort) sort: MatSort;

  // constructor(private apiService: ApiService) {
  //   this.dataSource = new MatTableDataSource();
  // }

  // ngOnInit() {
  //   this.loadEndpoints();
  // }

  // loadEndpoints() {
  //   this.apiService.getEndpoints().subscribe(data => {
  //     // Transform OpenAPI spec into endpoint list
  //     this.endpoints = Object.entries(data.paths).map(([path, methods]: [string, any]) => {
  //       const method = Object.keys(methods)[0];
  //       return {
  //         path,
  //         method: method.toUpperCase(),
  //         description: methods[method].description
  //       };
  //     });
  //   });
  // }

  // loadEndpointData(endpoint: any) {
  //   this.selectedEndpoint = endpoint;
  //   this.apiService.fetchEndpointData(endpoint.path).subscribe(data => {
  //     if (Array.isArray(data)) {
  //       // Get columns from first item if data is an array
  //       this.displayedColumns = Object.keys(data[0] || {});
  //       this.dataSource = new MatTableDataSource(data);
  //       // this.dataSource.paginator = this.paginator;
  //       // this.dataSource.sort = this.sort;
  //     } else {
  //       // Handle non-array responses
  //       this.displayedColumns = Object.keys(data || {});
  //       this.dataSource = new MatTableDataSource([data]);
  //     }
  //   });
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // getMethodIcon(method: string): string {
  //   switch (method.toUpperCase()) {
  //     case 'GET': return 'download';
  //     case 'POST': return 'add_circle';
  //     case 'PUT': return 'edit';
  //     case 'DELETE': return 'delete';
  //     default: return 'api';
  //   }
  // }

  // getMethodColor(method: string): string {
  //   return `${method.toLowerCase()}-method`;
  // }
}
