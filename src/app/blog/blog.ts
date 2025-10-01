import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../safe-url-pipe';


@Component({
  selector: 'app-blog',
  standalone: true,
 imports: [CommonModule, SafeUrlPipe],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class BlogComponent {
  videos = [
    {
      title: 'Bengaluru - Mysore',
      url: 'https://www.youtube.com/embed/4rBwNS0N-58'
    },
    {
      title: 'Bengaluru - Mangalore',
      url: 'https://www.youtube.com/embed/f6-nijIQstk'
    },
    {
      title: 'Bengaluru - Murudeshwara',
      url: 'https://www.youtube.com/embed/ZrQeRHWL9vk'
    },
    {
      title: 'Bengaluru - Hydrabad',
        url: 'https://www.youtube.com/embed/tJDjCYMCeeo'    },
    
    {
      title: 'Bengaluru - Chennai',
      url: 'https://www.youtube.com/embed/komHNl4A3Wk'
    },
    {
      title: 'Bengaluru - Calicut',
      url: 'https://www.youtube.com/embed/EPlSd6n2LmI'
    },
    {
      title: 'Bengaluru - Goa',
      url: 'https://www.youtube.com/embed//H_tBc1vajnY'
    },
    {
      title: 'Bengaluru - Coimbator',
      url: 'https://www.youtube.com/embed/ZHZmNCVhpZM'
    },
    {
      title: 'Bengaluru - Jaipur',
      url: 'https://www.youtube.com/embed/60JwGjSf3yM'
    },
    
    {
      title: 'Bengaluru - Pune',
      url: 'https://www.youtube.com/embed/G0PHUiVWJBs'
    },
    {
      title: 'Bengaluru - Madhurai',
      url: 'https://www.youtube.com/embed/dIiv6dZ5n-c'
    },
    {
      title: 'Bengaluru - Ooty',
      url: 'https://www.youtube.com/embed/2wXUcGeAHsg'
    },
  ];
}
