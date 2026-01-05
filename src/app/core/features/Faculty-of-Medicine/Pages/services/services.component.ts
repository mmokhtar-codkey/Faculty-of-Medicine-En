import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDetail } from '../../model/service.model';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  service?: ServiceDetail;
  services: ServiceDetail[] = [];
  isListView: boolean = false;
  activeTab: string = 'departments';
  activeAboutSection: string = 'overview';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const serviceId = params['id'];
      if (serviceId) {
        this.isListView = false;
        this.loadServiceData(serviceId);
      } else {
        this.isListView = true;
        this.loadServices();
      }
    });
  }

 private loadServiceData(serviceId: string): void {
 this.serviceService.getById(serviceId).subscribe({
   next: (serviceDetail) => {
     this.service = serviceDetail;
   },
   error: (error) => {
     console.error('Error loading service:', error);
     this.service = undefined;
   }
 });
 }

 private loadServices(): void {
   this.serviceService.getAll().subscribe({
     next: (services) => {
       this.services = services.filter(s => s.isActive);
     },
     error: (error) => {
       console.error('Error loading services:', error);
       this.services = [];
     }
   });
}

 switchTab(tab: string): void {
   this.activeTab = tab;
 }

 trackByFn(index: number, item: ServiceDetail): any {
   return item.id;
 }

 onServiceClick(service: ServiceDetail): void {
   if (service && service.id) {
     this.router.navigate(['/services', service.id]);
   }
 }

}
