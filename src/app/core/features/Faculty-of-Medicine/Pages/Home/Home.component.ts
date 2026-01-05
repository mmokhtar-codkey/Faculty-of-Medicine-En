import { Component, OnInit } from '@angular/core';
import { MedicineHeroComponent } from "./medicine-hero/medicine-hero.component";
import { DeanSpeechComponent } from "./dean-speech/dean-speech.component";
import { DepartmentsComponent } from "./departments/departments.component";
import { MedicineNewsComponent } from "./medicine-news/medicine-news.component";
import { ServicesComponent } from "./services/services.component";
import { ConferenceUpcomingComponent } from "./conferences/conferences.component";
import { StatisticsComponent } from "./statistics/statistics.component";

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [MedicineHeroComponent, DeanSpeechComponent, DepartmentsComponent, MedicineNewsComponent, ServicesComponent, ConferenceUpcomingComponent, StatisticsComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
