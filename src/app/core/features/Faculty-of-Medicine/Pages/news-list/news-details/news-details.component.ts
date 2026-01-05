import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { News } from '../../../model/news.model';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  news?: News;
  relatedNews: News[] = [];
  previousNews?: News;
  nextNews?: News;
  newsNotFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const newsId = params['id']; // id from the route will be string
      if (newsId) {
        this.loadNewsDetails(newsId);
      }
    });
  }

  private loadNewsDetails(newsId: string): void {
    this.newsService.getNewsById(newsId).subscribe(news => {
      if (news) {
        this.news = news;
        this.newsNotFound = false;
        this.loadRelatedData(newsId);
      } else {
        this.newsNotFound = true;
      }
    });
  }

  private loadRelatedData(newsId: string): void {
    this.newsService.getAllNews().subscribe(allNews => {
      // Related news with the same category
      if (this.news?.postCategories?.length) {
        const category = this.news.postCategories[0].categoryName;
        this.relatedNews = allNews.filter(n =>
          n.id !== newsId &&
          n.postCategories.some(c => c.categoryName === category)
        ).slice(0, 5);
      }

      // Sort news by date
      const sorted = [...allNews].sort((a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );
      const index = sorted.findIndex(n => n.id === newsId);

      this.previousNews = index > 0 ? sorted[index - 1] : undefined;
      this.nextNews = index < sorted.length - 1 ? sorted[index + 1] : undefined;
    });
  }

  getCategoryBadgeClass(categoryName: string): string {
    if (categoryName === 'News') return 'badge-primary';
    if (categoryName.includes('Conferences')) return 'badge-success';
    if (categoryName.includes('Events')) return 'badge-warning';
    return 'badge-secondary';
  }

  goToNewsDetails(newsId: string): void {
    this.router.navigate(['/news', newsId]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  goToNewsList(): void {
    this.router.navigate(['/news']);
  }
}
