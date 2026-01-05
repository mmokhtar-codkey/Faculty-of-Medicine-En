import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CentersService } from '../../Services/centers.service';
import { Center, CenterDetail, CenterMember,  } from '../../model/center.model';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {
  center?: Center;
  centerDetail?: CenterDetail;
  centerMembers: CenterMember[] = [];

  activeTab = 'about';
  activeAboutSection = 'overview';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private centersService: CentersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const centerId = params['id'];
      if (centerId) {
        this.loadCenterData(centerId);
      }
    });
  }

  private loadCenterData(centerId: string): void {
    this.centersService.getById(centerId).subscribe(center => {
      this.center = center;
    });

    this.centersService.getDetailsByCenterId(centerId).subscribe(detail => {
      this.centerDetail = detail;
    });

    this.centersService.getMembersByCenterId(centerId).subscribe(members => {
      this.centerMembers = members;
    });
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
  }

  switchAboutSection(sectionName: string): void {
    this.activeAboutSection = sectionName;
  }
}
