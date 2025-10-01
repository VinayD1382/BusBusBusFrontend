import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

interface Admin {
  id?: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminViewComponent implements OnInit {

  admin: Admin = { name: '', email: '', password: '' }; 
  admins: Admin[] = []; 
  message: string = ''; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getAdmins();
  }

  login() {
    const matchedAdmin = this.admins.find(
      a => a.email === this.admin.email && a.password === this.admin.password
    );

    if (matchedAdmin) {
      this.message = 'Admin Login Successfull';
      this.router.navigate(['/admindb'], { queryParams: { email: matchedAdmin.email } });
    } else {
      this.message = 'Invalid Admin email or password!';
    }
  }

  getAdmins() {
    this.http.get<Admin[]>('http://localhost:8081/admins')   
      .subscribe({
        next: (res) => this.admins = res,
        error: (err) => console.error(err)
      });
  }
}
