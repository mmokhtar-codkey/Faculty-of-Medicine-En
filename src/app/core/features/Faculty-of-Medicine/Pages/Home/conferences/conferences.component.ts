import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { News } from '../../../model/news.model';

@Component({
  selector: 'app-conference-upcoming',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferenceUpcomingComponent implements OnInit {
  @Input() sectionTitle = 'Upcoming Conferences';

  conferences: News[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadUpcomingConferences();
  }

  private loadUpcomingConferences(): void {
    this.newsService.getAllNews().subscribe(allNews => {
      // Filter news by category "Conferences & Events"
      const conferencesOnly = allNews.filter(n =>
        n.postCategories.some(c => c.categoryName.includes('Conferences'))
      );

      // Sort by date and select the latest 3
      this.conferences = [...conferencesOnly].sort((a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      ).slice(0, 3);
    });
  }
}
