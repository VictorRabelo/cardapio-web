import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "../../model/rest/response/response.model";
import { HttpService } from "../http.service";
import { ServiceBase } from "../service.base";

@Injectable({
    providedIn: 'root'
})
export class CardapioService extends ServiceBase {

    constructor(public httpService: HttpService) {
        super('cardapios', httpService);
    }

    findByUuid(uuid: string): Observable<ResponseModel> {
        return this.httpService.get('cardapios/' + uuid);
    }

}