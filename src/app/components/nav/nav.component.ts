import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Nav } from 'src/app/models/nav.dto';
import { User } from '../../models/user.dto';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() account: string = '';

  activeMenu = false;
  counter: number = 0;
  profile: User | null = null;
  navsList: Nav[] = [
    { url: '', text: 'All' },
    { url: '', text: 'Clothes' },
    { url: '', text: 'Electronics' },
  ];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  loginAndGetProfile(): void {
    this.authService.login('email@gmail.com', '123456')
      .pipe(
        switchMap(() => this.authService.getProfile())
      )
      .subscribe(profile => {
        this.profile = profile;
      })
  }

  login(): void {
    this.authService.loginAndGet('email@gmail.com', '123456')
    .subscribe(user => {
      this.profile = user;
    });
  }
}
