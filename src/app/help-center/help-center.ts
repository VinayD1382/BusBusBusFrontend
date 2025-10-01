import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './help-center.html',
  styleUrls: ['./help-center.css']
})
export class HelpCenterComponent {
  request = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  submitRequest() {
    if (!this.request.name || !this.request.email || !this.request.subject || !this.request.message) {
      alert('Please fill all required fields');
      return;
    }

    this.http.post('http://localhost:8082/api/help', this.request)
      .subscribe({
        next: (res) => {
          alert('Your request has been submitted successfully!');
          this.request = { name: '', email: '', phone: '', subject: '', message: '' };
        },
        error: (err) => alert('Error submitting request')
      });
  }
}
