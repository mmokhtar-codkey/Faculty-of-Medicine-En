import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../Services/service.service';
import { ServiceDetail } from '../../../model/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  @Input() sectionTitle = 'Faculty Services';
  @Input() showTitle = true;
  @Input() showAllServicesButton = true;
  @Input() allServicesText = 'All Services';
  @Input() allServicesUrl = '/services';
  
  @Output() serviceClicked = new EventEmitter<ServiceDetail>();
  @Output() allServicesClicked = new EventEmitter<void>();

  services: ServiceDetail[] = [];

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.serviceService.getById(id).subscribe(service => {
          if (service) {
            this.services = [service];
          }
        });
      } else {
        this.loadServices();
      }
    });
  }

  trackByFn(index: number, item: ServiceDetail): any {
    return item.id;
  }

  private loadServices(): void {
    this.serviceService.getAll().subscribe(services => {
      // Display only active services
      this.services = services.filter(s => s.isActive);
      // Set allServicesUrl to first service if available
      if (this.services.length > 0) {
        this.allServicesUrl = '/services/' + this.services[0].id;
      }
    });
  }

  onServiceClick(service: ServiceDetail): void {
    this.serviceClicked.emit(service);
    // Navigate using the id from the backend
    if (service && service.id != null && service.id !== '') {
      this.router.navigate(['/services', String(service.id)]);
    }
  }

  onAllServicesClick(): void {
    this.allServicesClicked.emit();
  }
}
