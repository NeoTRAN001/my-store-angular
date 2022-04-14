import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Nav } from 'src/app/models/nav.dto';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter: number = 0;
  navsList: Nav[] = [
    { url: '', text: 'All' },
    { url: '', text: 'Clothes' },
    { url: '', text: 'Electronics' },
  ];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
