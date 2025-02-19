import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface LoadingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  // displayedColumns: string[] = ['username', 'email', 'first_name', 'last_name', 'is_active', 'actions'];
  // state$!: Observable<LoadingState<any>>;

  // constructor(private userService: UserService) {}
  
  // ngOnInit() {
  //   this.loadUsers();
  // }

  // loadUsers() {
  //   this.state$ = this.userService.getUsers().pipe(
  //     map(data => ({
  //       data,
  //       loading: false,
  //       error: null
  //     })),
  //     catchError(error => of({
  //       data: null,
  //       loading: false,
  //       error: 'Failed to load users. Please try again later.'
  //     })),
  //     startWith({
  //       data: null,
  //       loading: true,
  //       error: null
  //     })
  //   );
  // }

  // openCreateDialog() {
  //   // TODO: Implement create user dialog
  //   console.log('Open create user dialog');
  // }

  // editUser(user: User) {
  //   // TODO: Implement edit user dialog
  //   console.log('Edit user:', user);
  // }

  // deleteUser(id: number | undefined) {
  //   if (!id) return;
    
  //   if (confirm('Are you sure you want to delete this user?')) {
  //     this.userService.deleteUser(id).subscribe({
  //       next: () => {
  //         this.loadUsers();
  //       },
  //       error: (error) => {
  //         console.error('Error deleting user:', error);
  //         // TODO: Add proper error handling/notification
  //       }
  //     });
  //   }
  // }

  displayedColumns: string[] = ['username', 'email', 'first_name', 'last_name', 'is_active', 'actions'];
  state$!: Observable<LoadingState<User[]>>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.state$ = this.userService.getUsers().pipe(
      map(data => ({
        data,
        loading: false,
        error: null
      })),
      catchError(error => of({
        data: null,
        loading: false,
        error: 'Failed to load users. Please try again later.'
      })),
      startWith({
        data: null,
        loading: true,
        error: null
      })
    );
  }

  openCreateDialog() {
    // TODO: Implement create user dialog
    console.log('Open create user dialog');
  }

  editUser(user: User) {
    // TODO: Implement edit user dialog
    console.log('Edit user:', user);
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      // TODO: Implement delete user
      console.log('Delete user:', id);
    }
  }

}
