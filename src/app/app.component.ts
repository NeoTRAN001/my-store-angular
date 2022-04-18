import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent: string = '';
  showImg: boolean = true;
  token: string = '';

  constructor(
    private userService: UsersService
  ){}

  onLoaded(img: string): void {
    console.log("Data: " + img);
  }

  toggleImg(): void {
    this.showImg = !this.showImg;
  }

  createUser(): void {
    this.userService.create({
      name: 'Neo',
      email: 'email@gmail.com',
      password: '123456'
    }).subscribe(rta => {
      console.log(rta);
    });
  }
}
