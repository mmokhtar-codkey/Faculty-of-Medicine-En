import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../../../Services/menu.service';
import { MenuTab } from '../../../../model/menu.model';

@Component({
  selector: 'app-medicine-menu-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
 templateUrl: './medicine-menu-bar.component.html',
  styleUrls: ['./medicine-menu-bar.component.css']
})
export class MedicineMenuBarComponent implements OnInit {
  menuTabs: MenuTab[] = [];
  activeDropdown: number | null = null;
  isCollapsed = true;
  isMobile = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadMenuTabs();
    this.checkMobileView();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkMobileView();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.medicine-menu-bar')) {
      this.activeDropdown = null;
    }
  }

  trackByFn(index: number, item: MenuTab): any {
    return item.id;
  }

  private loadMenuTabs(): void {
    this.menuService.getMenuTabs().subscribe(tabs => {
      this.menuTabs = tabs;
    });
  }

  private checkMobileView(): void {
    this.isMobile = window.innerWidth <= 991;
    if (!this.isMobile) {
      this.isCollapsed = true;
    }
  }

  toggleMobileMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onTabClick(tab: MenuTab, event: Event): void {
    event.preventDefault();
    
    if (tab.childs && tab.childs.length > 0) {
      // Toggle dropdown
      this.activeDropdown = this.activeDropdown === tab.id ? null : tab.id;
    } else {
      // Navigate to page
      this.menuService.updateActiveTab(tab.id).subscribe(updatedTabs => {
        this.menuTabs = updatedTabs;
      });
      this.isCollapsed = true;
      this.activeDropdown = null;
    }
  }

  onSubTabClick(subTab: MenuTab, parentTab: MenuTab, event: Event): void {
    event.preventDefault();

    this.menuService.updateActiveTab(subTab.id).subscribe(updatedTabs => {
      this.menuTabs = updatedTabs;
    });

    this.isCollapsed = true;
    this.activeDropdown = null;
  }
}