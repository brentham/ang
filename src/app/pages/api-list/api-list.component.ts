import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-api-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {
  // endpoints: string[] = [];

  endpoints: string[] = [
    'api/v1/auth/users',
    'products',
    'orders',
    'categories'
  ];


  // endpoints: any[] = [
  //   { name: 'api/v1/auth/users' },
  //   { name: 'products' },
  //   { name: 'orders' },
  //   { name: 'categories' }
  // ];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    // this.apiService.getEndpoints().subscribe(data => {
    //   this.endpoints = data;
    // });
  }

  // onEndpointClick(endpoint: string): void {
  //   console.log('Endpoint clicked:', endpoint); // Debugging: Check the value
  //   this.router.navigate(['/api', endpoint]);
  // }

  onEndpointClick(endpoint: string): void {
    this.router.navigate(['/api'], { queryParams: { endpoint } });
  }

  
}