import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccessToken, OauthAuthenticationService } from './security/oauth.authentication.service';
import { ResponseModel } from '../model/rest/response/response.model';
import { PUBLIC_USERNAME, URL_BASE_API, PUBLIC_PASSWORD } from '../utils/constants';
import { Session } from '../utils/session';
import { Messages } from '../utils/messages';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    readonly URL_API: string = URL_BASE_API;
    
    constructor(private http: HttpClient,
                private authService: OauthAuthenticationService,
                private messages: Messages) {
    }

    public get(uri: string): Observable<any> {
        return new Observable(subscriber => {
            this.http.get<ResponseModel>(this.URL_API + '/' + uri, {headers: this.createHeaders()})
                .subscribe((response: ResponseModel) => {
                    subscriber.next(response);
                    subscriber.complete();
                }, error => {
                    console.error(error);
                    this.verifyException(error);
                    subscriber.error(error);
                })
        });
    }

    public post(uri: string, entity: any): Observable<any> {
        return new Observable(subscriber => {
            this.http.post<ResponseModel>(this.URL_API + '/' + uri, entity, {headers: this.createHeaders()})
                .subscribe((response: ResponseModel) => {
                    subscriber.next(response);
                    subscriber.complete();
                }, error => {
                    console.error(error);
                    this.verifyException(error);
                    subscriber.error(error);
                });
        });
    }

    public put(uri: string, entity: any): Observable<any> {
        return new Observable(subscriber => {
            this.http.put<ResponseModel>(this.URL_API + '/' + uri, entity, {headers: this.createHeaders()})
                .subscribe((response: ResponseModel) => {
                    subscriber.next(response);
                    subscriber.complete();
                }, error => {
                    console.error(error);
                    this.verifyException(error);
                    subscriber.error(error);
                });
        });
    }

    public delete(uri: string, entity: any): Observable<any> {
        return new Observable(subscriber => {
            // Cria os options
            let options = {
                "X-TenantID": Session.getInstance().tenant,
                "Authorization": 'Bearer ' + localStorage.getItem('66514a26_access_token'),
                body: entity
            }

            this.http.delete<ResponseModel>(this.URL_API + '/' + uri, {headers: options})
                .subscribe((response: ResponseModel) => {
                    subscriber.next(response);
                    subscriber.complete();
                }, error => {
                    console.error(error);
                    this.verifyException(error);
                    subscriber.error(error);
                });
        });
    }

    public createHeaders(): any {
        let session: Session = Session.getInstance();
        return {
            "Authorization": 'Bearer ' + localStorage.getItem('66514a26_access_token'),
            "X-TenantID": session.tenant
        }
    }

    // Metodos Utilitarios

    private verifyException(exception: any): void {
        // Verifica se teve um Error ocurrido
        if(exception.error) {
            // 401 - "invalid_token" - "Invalid access token: 788c3db9-533f-4868-bfc9-2ca1da9cf9b5"
            if(exception.status === 401 && exception.error.error === 'invalid_token') {
                this.authService.getAccessToken(PUBLIC_USERNAME, PUBLIC_PASSWORD).subscribe((token: AccessToken) => {
                    localStorage.setItem('66514a26_access_token', token.access_token);
                }, error => {
                    console.error(error);
                    if(error.error.detail) {
                        this.messages.showMessageError(error.error.detail);
                    } else {
                        this.messages.showMessageError(error.error.message);
                    }
                });
            } else {
                if(exception.error.detail) {
                    this.messages.showMessageError(exception.error.detail);
                } else {
                    this.messages.showMessageError(exception.error.message);
                }
            }
        } else {
            this.messages.showMessageError(exception.message);
        }
    }


}