import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Booking {
  id: number;
  userId: number;
  busId: number;
  customerName: string;
  email: string;
  busName: string;
  fromLocation: string;
  toLocation: string;
  travelDate: string | null; 
  seatNumber: string;
  totalSeats: number;
  totalPrice: number;
  ticketSent?: boolean;
}

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './admindb.html',
  styleUrls: ['./admindb.css']
})
export class Admindb implements OnInit {
  bookings: Booking[] = [];
  groupedBookings: { date: string, bookings: Booking[] }[] = [];
  filteredGroupedBookings: { date: string, bookings: Booking[] }[] = [];

  buses: string[] = [
    'Southern Star', 'Coastal Cruiser', 'Malabar Express',
    'Deccan Rider', 'Coromandel Flyer', 'Kaveri Express',
    'Dakshin Deluxe', 'Godavari Express'
  ];

  selectedDate: string = '';
  selectedBus: string = '';
  searchTerm: string = '';  

  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    this.http.get<Booking[]>('http://localhost:8080/api/bookings')
      .subscribe({
        next: (data) => {
          this.bookings = data;
          this.groupBookingsByDate();
          this.applyFilters(); 
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load bookings';
          console.error(err);
          this.loading = false;
        }
      });
  }

  sendTicket(booking: Booking): void {
    const payload = {
      email: booking.email,
      customerName: booking.customerName,
      busName: booking.busName,
      fromLocation: booking.fromLocation,
      toLocation: booking.toLocation,
      seatNumber: booking.seatNumber,
      totalPrice: booking.totalPrice
    };

    console.log("Payload being sent:", JSON.stringify(payload));

    this.http.post<{ status: string, message: string }>(
      "http://localhost:8080/api/bookings/send-ticket",
      payload,
      { headers: { "Content-Type": "application/json" } }
    ).subscribe({
      next: (res) => {
        console.log("Response from backend:", res);
        if (res.status === "success") {
          booking.ticketSent = true;
          alert(res.message);  
        } else {
          alert("Failed: " + res.message);
        }
      },
      error: err => {
        console.error("Error sending ticket:", err);
        alert("Failed to send ticket. Please try again.");
      }
    });
  }

  groupBookingsByDate() {
    const map = new Map<string, Booking[]>();
    this.bookings.forEach(booking => {
      const date = booking.travelDate || 'Unknown Date';
      if (!map.has(date)) map.set(date, []);
      map.get(date)?.push(booking);
    });

    this.groupedBookings = Array.from(map, ([date, bookings]) => ({ date, bookings }))
      .sort((a, b) => {
        if (a.date === 'Unknown Date') return 1;
        if (b.date === 'Unknown Date') return -1;
        return a.date.localeCompare(b.date);
      });
  }

  applyFilters() {
    let filtered = this.bookings;

    if (this.selectedDate) {
      filtered = filtered.filter(b => b.travelDate === this.selectedDate);
    }

    if (this.selectedBus) {
      filtered = filtered.filter(b => b.busName === this.selectedBus);
    }

    if (this.searchTerm.trim()) {
      const lower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(b =>
        b.customerName.toLowerCase().includes(lower) ||
        b.email.toLowerCase().includes(lower)
      );
    }

    const map = new Map<string, Booking[]>();
    filtered.forEach(booking => {
      const date = booking.travelDate || 'Unknown Date';
      if (!map.has(date)) map.set(date, []);
      map.get(date)?.push(booking);
    });

    this.filteredGroupedBookings = Array.from(map, ([date, bookings]) => ({ date, bookings }))
      .sort((a, b) => {
        if (a.date === 'Unknown Date') return 1;
        if (b.date === 'Unknown Date') return -1;
        return a.date.localeCompare(b.date);
      });
  }

  resetFilters() {
    this.selectedDate = '';
    this.selectedBus = '';
    this.searchTerm = ''; 
    this.applyFilters();
  }

  get uniqueDates(): string[] {
    const dates = [...new Set(this.bookings.map(b => b.travelDate || 'Unknown Date'))];
    return dates.sort((a, b) => {
      if (a === 'Unknown Date') return 1;
      if (b === 'Unknown Date') return -1;
      return a.localeCompare(b);
    });
  }
}
