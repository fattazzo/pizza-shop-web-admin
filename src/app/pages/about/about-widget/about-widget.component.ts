import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-widget',
  templateUrl: './about-widget.component.html',
  styleUrls: ['./about-widget.component.scss']
})
export class AboutWidgetComponent implements OnInit {

  @Input() i18nKey: string;

  @Input() imageSrc: string = 'assets/images/pizza.png';

  @Input() link: string = null

  constructor() { }

  ngOnInit(): void {
  }

}
