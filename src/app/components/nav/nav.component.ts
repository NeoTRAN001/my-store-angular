import { Component, OnInit } from '@angular/core';
import { Nav } from 'src/app/models/nav.dto';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  navsList: Nav[] = [
    { url: '', text: 'All' },
    { url: '', text: 'Clothes' },
    { url: '', text: 'Electronics' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
