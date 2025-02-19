// src/app/interfaces/user.interface.ts
export interface User {
    id?: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
  }

export interface UsersResponse {
  users: User[];
}