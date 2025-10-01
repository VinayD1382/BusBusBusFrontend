import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userdb.html',
  styleUrls: ['./userdb.css']
})
export class UserdbComponent implements OnInit {
  user: any = null;
  bookings: any[] = [];
  message: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.getUserDetails(email);
        this.getBookings(email);
      } else {
        this.message = 'No user logged in.';
      }
    });
  }

  getUserDetails(email: string) {
    this.http.get(`http://localhost:8081/api/users/user-details?email=${email}`)
      .subscribe({
        next: res => this.user = res,
        error: err => this.message = 'Error fetching user details'
      });
  }

  getBookings(email: string) {
    this.http.get(`http://localhost:8080/api/bookings/by-email?email=${email}`)
      .subscribe({
        next: (res: any) => {
          console.log('Bookings API response:', res);
          if (Array.isArray(res)) {
            this.bookings = res;
          } else if (res && Array.isArray(res.data)) {
            this.bookings = res.data;
          } else {
            console.warn('Bookings API did not return an array:', res);
            this.bookings = [];
          }
        },
        error: err => {
          console.error('Error fetching bookings:', err);
          this.message = 'Error fetching booking details';
        }
      });
  }
}
