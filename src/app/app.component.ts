import { Component } from '@angular/core';
import { ControllerBase } from './controller/controller.base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ControllerBase {

  constructor() {
    super();
  }

}
