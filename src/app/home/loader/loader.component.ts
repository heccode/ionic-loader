import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent  implements OnInit {
  @Input() loading: boolean = false
  @Input() images: Image[] = []

  randomIndex = 0
  interval: number | undefined

  constructor() {
    this.generateRandomIndex()
  }

  ngOnInit() {}

  generateRandomIndex() {
    this.interval = window.setInterval(() => {
      this.randomIndex = Math.floor(Math.random() * this.images.length);
    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }
}
