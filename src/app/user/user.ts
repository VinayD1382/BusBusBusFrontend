import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class UserComponent implements OnInit {

  user: User = { name: '', email: '', password: '' }; 
  users: User[] = []; 
  message: string = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  registerUser() {
    this.http.post<User>('http://localhost:8081/api/users/register', this.user)
      .subscribe({
        next: (res) => {
          this.message = 'User registered successfully!';
          this.user = { name: '', email: '', password: '' }; 
          this.getUsers(); 
        },
        error: (err) => {
          console.error(err);
          this.message = 'Error registering user!';
        }
      });
  }

  getUsers() {
    this.http.get<User[]>('http://localhost:8081/api/users')
      .subscribe({
        next: (res) => this.users = res,
        error: (err) => console.error(err)
      });
  }
}
