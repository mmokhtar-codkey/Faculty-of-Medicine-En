import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DepartmentsService } from '../../../../Faculty-of-Medicine/Services/departments.service';
import { Department } from '../../../model/department.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  @Input() sectionTitle = 'Academic Departments';
  @Input() showAllServicesButton = true;
  @Input() allServicesText = 'All Departments';
  @Input() allServicesUrl = '/departments';
  
  @Output() departmentClicked = new EventEmitter<Department>();

  departments: Department[] = [];

  constructor(
    private departmentService: DepartmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  trackByFn(index: number, item: Department): any {
    return item.id;
  }

  private loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments = departments.slice(0, 6);
    });
  }

  onDepartmentClick(department: Department): void {
    this.departmentClicked.emit(department);
    this.router.navigate(['/departments', department.id]);
  }
}
