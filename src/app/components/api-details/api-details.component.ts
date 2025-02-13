import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-api-details',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.css']
})
export class ApiDetailsComponent implements OnInit {
  // data: any[] = []; // Ensure this is an array
  // endpoint: string = '';
  // displayedColumns: string[] = [];

  // constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.endpoint = this.route.snapshot.paramMap.get('endpoint') || '';
  //   this.apiService.getApiData(this.endpoint).subscribe(response => {
  //     // Convert the response to an array if it's an object
  //     this.data = Array.isArray(response) ? response : [response];
  //     this.displayedColumns = this.getColumns(this.data);
  //   });
  // }

  // getColumns(data: any[]): string[] {
  //   if (data.length > 0) {
  //     return Object.keys(data[0]);
  //   }
  //   return [];
  // }

  data: any[] = [];
  endpoint: string = '';
  displayedColumns: string[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.endpoint = params['endpoint']; // Get the endpoint from query params
      this.apiService.getApiData(this.endpoint).subscribe(response => {
        this.data = Array.isArray(response) ? response : [response];
        this.displayedColumns = this.getColumns(this.data);
      });
    });
  }

  getColumns(data: any[]): string[] {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }  


}