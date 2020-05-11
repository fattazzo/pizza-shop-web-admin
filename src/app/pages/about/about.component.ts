import { Component, OnInit } from '@angular/core';
import { Configuration } from 'src/app/open-api';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  baseUrl: string;

  constructor(
    configuration: Configuration,
  ) {
    this.baseUrl = configuration.basePath;
  }

  ngOnInit(): void {
  }

}
