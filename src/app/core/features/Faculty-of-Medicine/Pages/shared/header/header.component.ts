import { Component, OnInit } from '@angular/core';
import { MedicineLogoComponent } from "./medicine-logo/medicine-logo.component";
import { MedicineMenuBarComponent } from "./medicine-menu-bar/medicine-menu-bar.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MedicineLogoComponent, MedicineMenuBarComponent]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
