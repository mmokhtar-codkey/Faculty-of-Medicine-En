import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ServiceDetail } from '../model/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl + 'services';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceDetail[]> {
    return this.http.get<{data: ServiceDetail[]}>(`${this.apiUrl}/getall`).pipe(
      map(response => response.data)
    );
  }

 getById(id: string): Observable<ServiceDetail | undefined> {
  return this.getAll().pipe(
    map(services => services.find(s => s.id == id))
  );
}

}
