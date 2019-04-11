import { Component } from '@angular/core';

import {HomeService} from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HomeAtuomation';
  temp:any=0;

  constructor(private homeservice : HomeService){}
  getData(){

  }
}
