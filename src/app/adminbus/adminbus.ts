import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Bus {
  id?: number;
  busName: string;
  fromLocation: string;
  toLocation: string;
  totalSeats: number;
  departureTime: string;
  busType?: string;     
  ticketPrice?: number; 
}

@Component({
  selector: 'app-adminbus',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './adminbus.html',
  styleUrls: ['./adminbus.css']
})
export class AdminBusComponent implements OnInit {
  buses: Bus[] = [];
  newBus: Bus = { busName: '', fromLocation: '', toLocation: '', totalSeats: 0, departureTime: '', busType: '', ticketPrice: 0 };
  selectedBus: Bus | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBuses();
  }

  getBuses() {
    this.http.get<Bus[]>('http://localhost:8080/api/buses')
      .subscribe(data => this.buses = data);
  }

  addBus() {
    this.http.post<Bus>('http://localhost:8080/api/buses', this.newBus)
      .subscribe(bus => {
        this.buses.push(bus);
        this.newBus = { busName: '', fromLocation: '', toLocation: '', totalSeats: 0, departureTime: '', busType: '', ticketPrice: 0 };
      });
  }

  editBus(bus: Bus) {
    this.selectedBus = { ...bus };
  }

  updateBus() {
    if (!this.selectedBus?.id) return;
    this.http.put<Bus>(`http://localhost:8080/api/buses/${this.selectedBus.id}`, this.selectedBus)
      .subscribe(updated => {
        const index = this.buses.findIndex(b => b.id === updated.id);
        if (index !== -1) this.buses[index] = updated;
        this.selectedBus = null;
      });
  }

  deleteBus(busId: number) {
    if (!confirm('Are you sure you want to delete this bus?')) return;
    this.http.delete(`http://localhost:8080/api/buses/${busId}`)
      .subscribe(() => {
        this.buses = this.buses.filter(b => b.id !== busId);
      });
  }
}
