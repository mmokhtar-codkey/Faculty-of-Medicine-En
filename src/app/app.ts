import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected title = 'Faculty of Medicine';
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
