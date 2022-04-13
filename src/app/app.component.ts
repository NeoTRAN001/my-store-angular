import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent: string = '';
  showImg: boolean = true;

  onLoaded(img: string): void {
    console.log("Data: " + img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
