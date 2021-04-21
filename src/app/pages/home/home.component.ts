import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ControllerBase } from 'src/app/controller/controller.base';
import { ResponseModel } from 'src/app/model/rest/response/response.model';
import { CardapioService } from 'src/app/service/cardapio/cardapio.service';
import { AccessToken, OauthAuthenticationService } from 'src/app/service/security/oauth.authentication.service';
import { PUBLIC_PASSWORD, PUBLIC_USERNAME } from 'src/app/utils/constants';
import { Messages } from 'src/app/utils/messages';
import { Session } from 'src/app/utils/session';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends ControllerBase {

  cardapio: any = {};
  pathLogo: any = {};
  loading: Boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: OauthAuthenticationService,
              private service: CardapioService,
              private sanitize: DomSanitizer,
              private messages: Messages,
              private spinner: NgxSpinnerService) {
    super();
  }

  ngOnInit(): void {
    this.loading = true; 
    this.spinner.show();
    //super.showLoading();
    
    const uuid: any = this.route.snapshot.paramMap.get('uuid');
    const tenant: any = this.route.snapshot.paramMap.get('tenant');
    Session.getInstance().tenant = tenant;


    this.authService.getAccessToken(PUBLIC_USERNAME, PUBLIC_PASSWORD).subscribe((token: AccessToken) => {
      this.spinner.hide();
      this.loading = false;

      localStorage.setItem('66514a26_access_token', token.access_token);

      // Busca o Objeto do showcase
      this.service.findByUuid(uuid).subscribe((response: ResponseModel) => {
        if(response && response.entity) {
          this.cardapio = response.entity;
          if(this.cardapio.logomarca) {
            this.pathLogo = this.sanitize.bypassSecurityTrustResourceUrl(
              'data:image/jpg;base64,' + this.cardapio.logomarca.contentBase64
            );
          }
        } else {
          super.showAlertErrorPN('Nenhum cardápio foi encontrado');
        }
        //super.closeLoading();
      }, error => {
        this.tratarException(error);
      });
    }, error => {
      this.tratarException(error);
    });
  }

  visulizarProduto(produto: any) {
    super.setProdutosDetalhe(produto);
    this.router.navigate(['/detalhes-produto']);
  }

  private tratarException(error: any) {
    console.error(error);
    //super.closeLoading();
    let msg: string = error && error.error && error.error.detail ? error.error.detail : error.message;
    super.showAlertErrorPN('Erro ao tentar buscar o cardápio. ' + msg);
  }

}
