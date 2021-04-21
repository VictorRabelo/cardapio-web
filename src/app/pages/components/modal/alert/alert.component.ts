import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControllerBase } from 'src/app/controller/controller.base';
import { SeverityMessage } from 'src/app/enums/severity-message.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent extends ControllerBase {

  @Input() showMessage: boolean;
  @Input() message: string;
  @Input() severity: SeverityMessage;

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

  close() {
    this.showMessage = false;
    this.message = undefined;
    this.severity = undefined;
  }

}
