import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-booking-admin',
  standalone: true,
  templateUrl: './booking-admin.html',
  styleUrls: ['./booking-admin.css'],
  imports: [CommonModule, HttpClientModule]
})
export class BookingAdminComponent implements OnInit {

  bookings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.http.get<any[]>('http://localhost:8080/api/bookings')
      .subscribe({
        next: data => {
          this.bookings = data;
        },
        error: error => {
          console.error('Error loading bookings', error);
        }
      });
  }
}
