import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
})
export class BookingComponent {
  bus: any = null;

  booking = {
    customerName: '',
    email: '',
    fromLocation: '',
    toLocation: '',
    travelDate: '',
    seatNumber: '',
    busId: 0
  };

  selectedSeats: number[] = [];

  lowerDeck = [
    { number: 1, price: 699, booked: false },
    { number: 2, price: 699, booked: true },
    { number: 3, price: 799, booked: false },
    { number: 4, price: 799, booked: false },
    { number: 5, price: 1199, booked: false },
    { number: 6, price: 1299, booked: true },
    { number: 7, price: 699, booked: false },
    { number: 8, price: 699, booked: false },
    { number: 9, price: 799, booked: true },
  ];

  upperDeck = [
    { number: 11, price: 699, booked: false },
    { number: 12, price: 699, booked: true },
    { number: 13, price: 799, booked: false },
    { number: 14, price: 799, booked: false },
    { number: 15, price: 1199, booked: false },
    { number: 16, price: 1299, booked: true },
    { number: 17, price: 699, booked: false },
    { number: 18, price: 699, booked: false },
    { number: 19, price: 799, booked: true },
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const busId = this.route.snapshot.params['busId'];
    if (!busId) return;

    this.booking.travelDate = this.getToday();

    this.http.get<any>(`http://localhost:8080/api/buses/${busId}`).subscribe({
      next: (data) => {
        this.bus = data;
        this.booking.busId = data.id;
        this.booking.fromLocation = data.fromLocation;
        this.booking.toLocation = data.toLocation;
      },
      error: (err) => console.error('Error fetching bus', err),
    });
  }

  toggleSeat(seat: any) {
    if (seat.booked) return;

    const index = this.selectedSeats.indexOf(seat.number);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat.number);
    }

    this.booking.seatNumber = this.selectedSeats.join(',');
  }

  isSelected(seat: any): boolean {
    return this.selectedSeats.includes(seat.number);
  }

  get totalPrice(): number {
    return [...this.lowerDeck, ...this.upperDeck]
      .filter((seat) => this.selectedSeats.includes(seat.number))
      .reduce((sum, seat) => sum + seat.price, 0);
  }

  getToday(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Book the ticket
  bookTicket() {
    if (
      this.booking.customerName &&
      this.booking.email &&
      this.booking.travelDate &&
      this.selectedSeats.length > 0
    ) {
      const bookingData = {
        userId: Number(localStorage.getItem('userId')) || 1,
        busId: this.bus.id,
        customerName: this.booking.customerName,
        fromLocation: this.booking.fromLocation,
        toLocation: this.booking.toLocation,
        travelDate: this.booking.travelDate,
        seatNumber: this.selectedSeats.join(','), 
        busName: this.bus.busName,
        totalSeats: this.selectedSeats.length,
        totalPrice: this.totalPrice,
        email: this.booking.email
      };

      this.http.post('http://localhost:8080/api/bookings', bookingData)
        .subscribe({
          next: () => {
            alert(
              `Booking successful!\nSeats: ${bookingData.seatNumber}\nTotal: ₹${bookingData.totalPrice}`
            );
            this.booking.customerName = '';
            this.booking.email = '';
            this.booking.travelDate = this.getToday();
            this.selectedSeats = [];
          },
          error: (err) => {
            console.error('Error booking ticket', err);
            alert('Error booking ticket! Check console.');
          }
        });
    } else {
      alert('Please fill all fields and select seats');
    }
  }
}
