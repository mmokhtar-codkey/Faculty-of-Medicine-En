export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
  position?: 'left' | 'center' | 'right';
}