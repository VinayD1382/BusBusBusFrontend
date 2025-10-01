import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,   
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule] 
})
export class HomeComponent {
  fromLocation = '';
  toLocation = '';
  buses: any[] = [];
  showResults = false;   

  locations: string[] = [
  'Bangalore',
  'Mysore',
  'Hyderabad',
  'Chennai',
  'Coimbatore',
  'Goa',
  'Pune',
  'Mumbai',
  'Mangalore',
  'Vijayawada',
  'Madurai',
  'Delhi',
  'Jaipur',
  'Ahmedabad',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Kolkata',
  'Durgapur',
  'Visakhapatnam',
  'Trivandrum'

  ];

  fromSuggestions: string[] = [];
  toSuggestions: string[] = [];

  constructor(private http: HttpClient) {}

  searchBuses() {
    if (this.fromLocation && this.toLocation) {
      const url = `http://localhost:8080/api/buses?from=${this.fromLocation}&to=${this.toLocation}`;
      this.http.get<any[]>(url).subscribe({
        next: data => {
          this.buses = data;
          this.showResults = true;  
        },
        error: error => console.error('Error fetching buses', error)
      });
    } else {
      alert('Please enter both From and To locations.');
    }
  }

  onFromChange() {
    this.fromSuggestions = this.locations.filter(loc =>
      loc.toLowerCase().includes(this.fromLocation.toLowerCase())
    );
  }

  onToChange() {
    this.toSuggestions = this.locations.filter(loc =>
      loc.toLowerCase().includes(this.toLocation.toLowerCase())
    );
  }

  selectFrom(location: string) {
    this.fromLocation = location;
    this.fromSuggestions = [];
  }

  selectTo(location: string) {
    this.toLocation = location;
    this.toSuggestions = [];
  }
}
