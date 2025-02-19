// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User, UsersResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/v1/auth';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(`${this.baseUrl}/users`).pipe(
      map(response => response.users),
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to load users'));
      })
    );
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
  //     catchError(error => {
  //       console.error('Error fetching users:', error);
  //       return throwError(() => new Error('Failed to load users'));
  //     })
  //   );
  // }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Failed to load user'));
      })
    );
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user).pipe(
      catchError(error => {
        console.error('Error creating user:', error);
        return throwError(() => new Error('Failed to create user'));
      })
    );
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Failed to update user'));
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }
}