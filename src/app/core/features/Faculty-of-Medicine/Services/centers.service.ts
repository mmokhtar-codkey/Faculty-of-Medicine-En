import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Center, CenterDetail, CenterMember } from '../model/center.model';

@Injectable({
  providedIn: 'root'
})
export class CentersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCenters(): Observable<Center[]> {
    return this.http.get<{data: Center[]}>(`${this.apiUrl}center/getall`).pipe(
      map(res => res.data)
    );
  }

  getCenterDetails(): Observable<CenterDetail[]> {
    return this.http.get<{data: CenterDetail[]}>(`${this.apiUrl}centerdetail/getall`).pipe(
      map(res => res.data)
    );
  }

  getCenterMembers(): Observable<CenterMember[]> {
    return this.http.get<{data: CenterMember[]}>(`${this.apiUrl}centermember/getall`).pipe(
      map(res => res.data)
    );
  }

  getById(id: string): Observable<Center | undefined> {
    return this.getAllCenters().pipe(
      map(centers => centers.find(c => c.id === id))
    );
  }

  getDetailsByCenterId(centerId: string): Observable<CenterDetail | undefined> {
    return this.getCenterDetails().pipe(
      map(details => details.find(d => d.centerId === centerId))
    );
  }

  getMembersByCenterId(centerId: string): Observable<CenterMember[]> {
    return this.getCenterMembers().pipe(
      map(members => members.filter(m => m.centerId === centerId))
    );
  }
}
