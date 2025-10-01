import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  user: User = { name: '', email: '', password: '' }; 
  users: User[] = []; 
  message: string = ''; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

 login() {
  const matchedUser = this.users.find(
    u => u.email === this.user.email && u.password === this.user.password
  );

  if (matchedUser) {
this.router.navigate(['/userdb'], { queryParams: { email: matchedUser.email } });
  } else {
    this.message = 'Invalid email or password!';
  }
}
  getUsers() {
    this.http.get<User[]>('http://localhost:8081/api/users')
      .subscribe({
        next: (res) => this.users = res,
        error: (err) => console.error(err)
      });
  }
}
