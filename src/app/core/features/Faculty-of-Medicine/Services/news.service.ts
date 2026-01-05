import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { News } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // جلب كل الأخبار
  getAllNews(): Observable<News[]> {
    return this.http.get<{data: News[]}>(`${this.apiUrl}posts/getall`).pipe(
      map(response => response.data)
    );
  }

  // جلب خبر واحد بالـ id
  getNewsById(id: string): Observable<News | undefined> {
    return this.getAllNews().pipe(
      map(news => news.find(n => n.id === id))
    );
  }

  // فلترة الأخبار حسب التصنيف (categoryName)
  getNewsByCategory(categoryName: string): Observable<News[]> {
    return this.getAllNews().pipe(
      map(news => news.filter(n =>
        n.postCategories.some(c => c.categoryName === categoryName)
      ))
    );
  }
}
