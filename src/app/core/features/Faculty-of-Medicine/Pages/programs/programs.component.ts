import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProgramsService } from '../../Services/programs.service';
import { Program, ProgramDetail, ProgramMember } from '../../model/program.model';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  program?: Program;
  programDetail?: ProgramDetail;
  programMembers: ProgramMember[] = [];

  activeTab = 'about';
  activeAboutSection = 'overview';

  constructor(
    private route: ActivatedRoute,
    private programsService: ProgramsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const programId = params['id']; // الـ id من الـ route بيكون string
      if (programId) {
        this.loadProgramData(programId);
      }
    });
  }

  private loadProgramData(programId: string): void {
    // بيانات البرنامج الأساسية
    this.programsService.getProgramById(programId).subscribe(program => {
      this.program = program;
    });

    // تفاصيل البرنامج
    this.programsService.getProgramDetailsByProgramId(programId).subscribe(detail => {
      this.programDetail = detail;
    });

    // أعضاء البرنامج
    this.programsService.getProgramMembersByProgramId(programId).subscribe(members => {
      this.programMembers = members;
    });
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
  }

  switchAboutSection(sectionName: string): void {
    this.activeAboutSection = sectionName;
  }
}
