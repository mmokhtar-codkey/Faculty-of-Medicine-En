import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroService } from '../../../Services/hero.service';
import { HeroSlide } from '../../../model/hero-slide.model';

@Component({
  selector: 'app-medicine-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medicine-hero.component.html',
  styleUrls: ['./medicine-hero.component.css']
})
export class MedicineHeroComponent implements OnInit, OnDestroy {
  @Input() autoPlay = true;
  @Input() autoPlayInterval = 5000;
  @Input() buttonText = 'Explore More';
  @Input() buttonRoute = '/about';

  slides: HeroSlide[] = [];
  currentSlideIndex = 0;
  isHovered = false;
  private autoPlayTimer: any;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.loadSlides();
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  private loadSlides(): void {
    this.heroService.getAll().subscribe(slides => {
      this.slides = slides;
    });
  }

  private startAutoPlay(): void {
    this.autoPlayTimer = setInterval(() => {
      if (!this.isHovered) {
        this.nextSlide();
      }
    }, this.autoPlayInterval);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlideIndex = this.currentSlideIndex === 0 
      ? this.slides.length - 1 
      : this.currentSlideIndex - 1;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
  }

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }
}