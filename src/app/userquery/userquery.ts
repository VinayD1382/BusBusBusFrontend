import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-userquery',
 standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
    templateUrl: './userquery.html',
  styleUrls: ['./userquery.css']
})
export class UserQueryComponent implements OnInit {
  queries: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getQueries();
  }

  getQueries() {
    this.http.get<any[]>('http://localhost:8082/api/help').subscribe({
      next: (data) => {
        this.queries = data;
      },
      error: (err) => {
        console.error('Error fetching help requests:', err);
      }
    });
  }

reply(userEmail: string, subject: string): void {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(userEmail)}&su=${encodeURIComponent(subject)}&body=Hello,`;
    window.open(gmailUrl, '_blank'); // Opens Gmail compose in new tab
  }
}
