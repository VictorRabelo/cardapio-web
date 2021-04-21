import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/utils/session';
import { ControllerBase } from 'src/app/controller/controller.base';
import { DomSanitizer } from '@angular/platform-browser';
import { KEY_DETALHE_PRODUTO } from 'src/app/utils/constants';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent extends ControllerBase {

  slideConfig = {
    "dots": false,
    "arrows": false,
    "slidesToShow": 1,
    "infinite": true,
    "speed": 300,
    "centerMode": true,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "fade": true,
    "responsive": [
      {
        "breakpoint": 768,
        "settings": {
          "dots": false,
          "arrows": false,
          "slidesToShow": 1,
          "infinite": true,
          "speed": 300,
          "centerMode": true,
          "autoplay": true,
          "autoplaySpeed": 2000,
          "fade": true
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "dots": false,
          "arrows": false,
          "slidesToShow": 1,
          "infinite": true,
          "speed": 300,
          "centerMode": true,
          "autoplay": true,
          "autoplaySpeed": 2000,
          "fade": true
        }
      }
    ]
  };

  imagens: any[] = [];

  produto: any;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {

    let produto = super.getProdutosDetalhe();
    console.log(produto)
    console.log(produto.descricao)
    if(produto) {

      this.produto = produto;
      
      if(produto.imagens && produto.imagens.lenght > 0) {
        
        this.imagens = [];
        
        produto.imagens.forEach((file: any) => {
            let urlImg = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + file.contentBase64
          ); 
          this.imagens.push(urlImg);
        })

      } else {
        this.imagens = [];
        this.imagens.push('assets/img/sem_foto.jpg');
      }
      
    } else {
      this.router.navigate(['**']);
    }

  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
