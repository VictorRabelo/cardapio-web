import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerBase } from 'src/app/controller/controller.base';
import { Messages } from 'src/app/utils/messages';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent extends ControllerBase {

  codigoPagina: string;

  constructor(private route: Router,
              private messages: Messages) {
    super();
  }

  ngOnInit(): void {
  }

  pesquisar() {
    if(this.codigoPagina) {
      this.route.navigate(['/home/' + this.codigoPagina]);
    } else {
      this.messages.showMessageError('Informe o código da página para pesquisar.');
    }
  }

}
