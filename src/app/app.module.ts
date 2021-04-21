import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Locale PT-BR
import localePtBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePtBR);

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Agillity
import { HomeComponent } from './pages/home/home.component';
import { AlertComponent } from './pages/components/modal/alert/alert.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetalhesProdutoComponent } from './pages/detalhes-produto/detalhes-produto.component';

// SlickCarousel
import { SlickCarouselModule } from 'ngx-slick-carousel';

// NgxSpinner
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    NotFoundComponent,
    DetalhesProdutoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    // PrimeNG
    DialogModule,
    ButtonModule,
    ToastModule,
    // SlickCarousel
    SlickCarouselModule,
    // NgxSpinner
    NgxSpinnerModule
  ],
  providers: [
    // Para resolver problemas ao atualizar o navegador e gerar o erro 404
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // Locale
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    // PrimeNG
    MessageService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
