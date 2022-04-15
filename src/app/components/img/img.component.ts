import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnChanges {

  img: string = '';
  counter: number = 0;
  imageDefault: string = 'https://i.ytimg.com/vi/lK6fkkBoRws/maxresdefault.jpg';

  @Input() alt: string = '';
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') set changeImg(newImg: String) {
    this.img = newImg.toString();
    // console.log('Custom Change img');
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("Changes: ", changes);
  }

  imgError(): void {
    this.img = this.imageDefault;
  }

  imgLoader(): void {
    this.loaded.emit("Un dato random");
  }
}
