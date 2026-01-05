import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Sector, SectorDetail, SectorMember, SectorPost, SectorProgram, SectorService } from '../model/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // جلب كل القطاعات
  getAllSectors(): Observable<Sector[]> {
    return this.http.get<{data: Sector[]}>(`${this.apiUrl}sectors/getall`).pipe(
      map(response => response.data)
    );
  }

  // جلب تفاصيل القطاعات
  getAllSectorDetails(): Observable<SectorDetail[]> {
    return this.http.get<{data: SectorDetail[]}>(`${this.apiUrl}sectordetails/getall`).pipe(
      map(response => response.data)
    );
  }

  // جلب أعضاء القطاعات
  getAllSectorMembers(): Observable<SectorMember[]> {
    return this.http.get<{data: SectorMember[]}>(`${this.apiUrl}sectormember/getall`).pipe(
      map(response => response.data)
    );
  }

  // جلب منشورات القطاعات
  getAllSectorPosts(): Observable<SectorPost[]> {
    return this.http.get<{data: SectorPost[]}>(`${this.apiUrl}sectorposts/getall`).pipe(
      map(response => response.data)
    );
  }

  // جلب برامج القطاعات
  getAllSectorPrograms(): Observable<SectorProgram[]> {
    return this.http.get<{data: SectorProgram[]}>(`${this.apiUrl}sectorprograms/getall`).pipe(
      map(response => response.data)
    );
  }

  // جلب خدمات القطاعات
  getAllSectorServices(): Observable<SectorService[]> {
    return this.http.get<{data: SectorService[]}>(`${this.apiUrl}sectorservices/getall`).pipe(
      map(response => response.data)
    );
  }

  // جلب قطاع واحد بالـ id
  getSectorById(id: string): Observable<Sector | undefined> {
    return this.getAllSectors().pipe(
      map(sectors => sectors.find(s => s.id === id))
    );
  }

  // جلب تفاصيل قطاع واحد بالـ sectorId
  getSectorDetailsById(sectorId: string): Observable<SectorDetail | undefined> {
    return this.getAllSectorDetails().pipe(
      map(details => details.find(d => d.sectorId === sectorId))
    );
  }

  // جلب أعضاء قطاع واحد بالـ sectorId
  getSectorMembersById(sectorId: string): Observable<SectorMember[]> {
    return this.getAllSectorMembers().pipe(
      map(members => members.filter(m => m.sectorId === sectorId))
    );
  }

  // جلب منشورات قطاع واحد بالـ sectorId
  getSectorPostsById(sectorId: string): Observable<SectorPost[]> {
    return this.getAllSectorPosts().pipe(
      map(posts => posts.filter(p => p.sectorId === sectorId))
    );
  }

  // جلب برامج قطاع واحد بالـ sectorId
  getSectorProgramsById(sectorId: string): Observable<SectorProgram[]> {
    return this.getAllSectorPrograms().pipe(
      map(programs => programs.filter(p => p.sectorId === sectorId))
    );
  }

  // جلب خدمات قطاع واحد بالـ sectorId
  getSectorServicesById(sectorId: string): Observable<SectorService[]> {
    return this.getAllSectorServices().pipe(
      map(services => services.filter(s => s.sectorId === sectorId))
    );
  }
}
