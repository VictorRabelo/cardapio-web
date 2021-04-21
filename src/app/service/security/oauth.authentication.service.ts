import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_BASE_API } from 'src/app/utils/constants';

@Injectable({
    providedIn: 'root'
})
export class OauthAuthenticationService {

    readonly URL_API: string = URL_BASE_API;

    constructor(private http: HttpClient,
                private router: Router) {}

    public getAccessToken(username: string, password: string): Observable<AccessToken> {
        const endpint = this.URL_API + '/oauth/token?grant_type=password';
        const options = {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": 'Basic ' + btoa('2d8aa0e8d580a04e05950569128da23d:66d1dbff64bb2bc7cecba30aad1752a2')
            },
            params: {
                "username": username,
                "password": encodeURIComponent(password)
            }
        }

        return this.http.post<AccessToken>(endpint, {}, options);
    }

    public refreshToken(refreshToken: string): Observable<AccessToken> {
        const endpint = this.URL_API + '/oauth/token?grant_type=refresh_token&refresh_token=' + refreshToken;
        const options = {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": 'Basic ' + btoa('2d8aa0e8d580a04e05950569128da23d:66d1dbff64bb2bc7cecba30aad1752a2')
            }
        }

        return this.http.post<AccessToken>(endpint, {}, options);
    }

    public logout(): void {
        localStorage.removeItem('66514a26_access_token')
        this.router.navigate(['/home']);
    }

}

export interface AccessToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}