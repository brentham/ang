import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, catchError, map, of, startWith } from 'rxjs';

interface LoadingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-available-apis',
  standalone: false,
  templateUrl: './available-apis.component.html',
  styleUrl: './available-apis.component.scss'
})
export class AvailableApisComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email'];
  state$!: Observable<LoadingState<any[]>>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.state$ = this.apiService.getOperatingSystems().pipe(
      map(data => ({
        data,
        loading: false,
        error: null
      })),
      catchError(error => of({
        data: null,
        loading: false,
        error: 'Failed to load operating systems. Please try again later.'
      })),
      startWith({
        data: null,
        loading: true,
        error: null
      })
    );
  }
}