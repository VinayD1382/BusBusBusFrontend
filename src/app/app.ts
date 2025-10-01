import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, /*RouterLink*/ CommonModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('Bus Booking App');
}
