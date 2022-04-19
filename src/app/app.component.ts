import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent: string = '';
  showImg: boolean = true;
  token: string = '';
  imgRta: string = '';

  constructor(
    private userService: UsersService,
    private fileService: FilesService
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

  downloadPdf(): void {
    this.fileService.getFile('my.pdf', 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file) {
      this.fileService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }
  }
}
