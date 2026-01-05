import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UnitsService } from '../../Services/units.service';
import { Unit, UnitDetail, UnitMember } from '../../model/unit.model';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  unit?: Unit;
  unitDetail?: UnitDetail;
  unitMembers: UnitMember[] = [];

  activeTab = 'about';
  activeAboutSection = 'overview';

  constructor(
    private route: ActivatedRoute,
    private unitsService: UnitsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const unitId = params['id'];
      if (unitId) {
        this.loadUnitData(unitId);
      }
    });
  }

  private loadUnitData(unitId: string): void {
    // بيانات الوحدة الأساسية
    this.unitsService.getUnitById(unitId).subscribe(unit => {
      this.unit = unit;
    });

    // تفاصيل الوحدة
    this.unitsService.getUnitDetailsByUnitId(unitId).subscribe(detail => {
      this.unitDetail = detail;
    });

    // أعضاء الوحدة
    this.unitsService.getUnitMembersByUnitId(unitId).subscribe(members => {
      this.unitMembers = members;
    });
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
  }

  switchAboutSection(sectionName: string): void {
    this.activeAboutSection = sectionName;
  }
}
